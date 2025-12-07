import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { ResumeDownload, Prisma } from '@prisma/client';

export interface DownloadStats {
  total: number;
  aiOptimized: number;
  traditional: number;
}

@Injectable()
export class ResumeDownloadsRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(
    data: Prisma.ResumeDownloadCreateInput
  ): Promise<ResumeDownload> {
    return this.db.resumeDownload.create({ data });
  }

  async getStats(): Promise<DownloadStats> {
    const [total, aiOptimized, traditional] = await Promise.all([
      this.db.resumeDownload.count(),
      this.db.resumeDownload.count({
        where: { resumeType: 'ai-optimized' },
      }),
      this.db.resumeDownload.count({
        where: { resumeType: 'traditional' },
      }),
    ]);

    return { total, aiOptimized, traditional };
  }

  async getRecentDownloads(limit = 10): Promise<ResumeDownload[]> {
    return this.db.resumeDownload.findMany({
      orderBy: { downloadedAt: 'desc' },
      take: limit,
    });
  }
}
