import { Controller, Get } from '@nestjs/common';
import { ResumeDownloadsRepository } from './resume-downloads.repository';

@Controller('resume-downloads')
export class ResumeDownloadsController {
  constructor(
    private readonly resumeDownloadsRepo: ResumeDownloadsRepository
  ) {}

  @Get('stats')
  async getStats() {
    return this.resumeDownloadsRepo.getStats();
  }

  @Get('recent')
  async getRecentDownloads() {
    return this.resumeDownloadsRepo.getRecentDownloads();
  }
}
