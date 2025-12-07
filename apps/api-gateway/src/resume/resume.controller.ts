import {
  Controller,
  Get,
  Query,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';
import { ResumeService, ResumeType } from './resume.service';
import { ResumeDownloadsRepository } from '../database/resume-downloads/resume-downloads.repository';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly logger: Logger,
    private readonly resumeDownloadsRepo: ResumeDownloadsRepository
  ) {}

  @Get('download')
  async downloadResume(
    @Query('type') type: ResumeType,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    if (!type || !['ai-optimized', 'traditional'].includes(type)) {
      this.logger.warn({ type }, 'Invalid resume type requested');
      throw new BadRequestException(
        'Invalid resume type. Must be "ai-optimized" or "traditional"'
      );
    }

    this.logger.log({ resumeType: type }, 'Generating resume PDF');
    const startTime = Date.now();

    try {
      const pdfBuffer = await this.resumeService.generateResumePDF(type);

      const filename =
        type === 'ai-optimized'
          ? 'alan-spurlock-resume-ai-optimized.pdf'
          : 'alan-spurlock-resume-traditional.pdf';

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length,
      });

      const duration = Date.now() - startTime;

      // Record the download
      try {
        await this.resumeDownloadsRepo.create({
          resumeType: type,
          ipAddress: req.ip || req.socket.remoteAddress,
          userAgent: req.headers['user-agent'],
        });
      } catch (trackingError) {
        // Log but don't fail the download if tracking fails
        this.logger.warn(
          { error: trackingError.message },
          'Failed to record download tracking'
        );
      }

      this.logger.log(
        { resumeType: type, size: pdfBuffer.length, duration },
        'Resume PDF generated successfully'
      );

      res.send(pdfBuffer);
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(
        { resumeType: type, duration, error: error.message },
        'Resume generation failed',
        error.stack
      );
      throw new BadRequestException(
        `Failed to generate resume PDF: ${error.message || error}`
      );
    }
  }
}
