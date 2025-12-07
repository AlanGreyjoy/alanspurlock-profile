import {
  Controller,
  Get,
  Query,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResumeService, ResumeType } from './resume.service';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Get('download')
  async downloadResume(
    @Query('type') type: ResumeType,
    @Res() res: Response
  ): Promise<void> {
    if (!type || !['ai-optimized', 'traditional'].includes(type)) {
      throw new BadRequestException(
        'Invalid resume type. Must be "ai-optimized" or "traditional"'
      );
    }

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

      res.send(pdfBuffer);
    } catch (error) {
      throw new BadRequestException('Failed to generate resume PDF');
    }
  }
}
