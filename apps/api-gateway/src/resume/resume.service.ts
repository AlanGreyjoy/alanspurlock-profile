import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import {
  PERSONAL_INFO,
  EXPERIENCES,
  EDUCATION,
  SKILLS,
} from '@alanspurlock-profile/resume-data';
import { getAIOptimizedTemplate } from './templates/ai-optimized.template';
import { getTraditionalTemplate } from './templates/traditional.template';

export type ResumeType = 'ai-optimized' | 'traditional';

@Injectable()
export class ResumeService {
  async generateResumePDF(type: ResumeType): Promise<Buffer> {
    const html =
      type === 'ai-optimized'
        ? getAIOptimizedTemplate(PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILLS)
        : getTraditionalTemplate(PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILLS);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm',
        },
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }
}
