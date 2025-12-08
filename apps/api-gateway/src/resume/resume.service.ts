import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import {
  ExperienceRepository,
  EducationRepository,
  SkillsRepository,
  PersonalInfoRepository,
} from '../database';

export type ResumeType = 'ai-optimized' | 'traditional';

@Injectable()
export class ResumeService {
  constructor(
    private readonly experienceRepo: ExperienceRepository,
    private readonly educationRepo: EducationRepository,
    private readonly skillsRepo: SkillsRepository,
    private readonly personalInfoRepo: PersonalInfoRepository
  ) {}

  async generateResumePDF(type: ResumeType): Promise<Buffer> {
    try {
      console.log('Generating resume PDF for type:', type);

      // Fetch data from database
      const personalInfo = await this.personalInfoRepo.find();
      const experiences = await this.experienceRepo.findAll();
      const education = await this.educationRepo.findAll();
      const skills = await this.skillsRepo.findAll();

      if (!personalInfo) {
        throw new Error('Personal information not found in database');
      }

      console.log('Data fetched from database successfully');

      // Generate PDF based on type
      if (type === 'ai-optimized') {
        return this.generateAIOptimizedPDF(
          personalInfo,
          experiences,
          education,
          skills
        );
      } else {
        return this.generateTraditionalPDF(
          personalInfo,
          experiences,
          education,
          skills
        );
      }
    } catch (error) {
      console.error('Error in generateResumePDF:', error);
      throw error;
    }
  }

  private async generateAIOptimizedPDF(
    personalInfo: any,
    experiences: any[],
    education: any[],
    skills: any[]
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Colors for AI-Optimized (simple black and white)
      const BLACK = '#000000';
      const GRAY = '#666666';

      // Header
      doc.fontSize(24).font('Helvetica-Bold').text(personalInfo.name, {
        align: 'center',
      });

      doc.moveDown(0.5);
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(`${personalInfo.email} | ${personalInfo.phone}`, {
          align: 'center',
        });

      doc
        .fontSize(10)
        .text(
          `LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}`,
          { align: 'center' }
        );

      doc.moveDown(1);

      // Professional Summary
      this.addSectionHeader(doc, 'PROFESSIONAL SUMMARY', BLACK);
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(personalInfo.subtitle, { align: 'justify' });

      doc.moveDown(1);

      // Technical Skills
      this.addSectionHeader(doc, 'TECHNICAL SKILLS', BLACK);
      const skillNames = skills.map((s) => s.name).join(' • ');
      doc.fontSize(10).font('Helvetica').text(skillNames);

      doc.moveDown(1);

      // Professional Experience
      this.addSectionHeader(doc, 'PROFESSIONAL EXPERIENCE', BLACK);

      experiences.forEach((exp, index) => {
        if (index > 0) doc.moveDown(0.8);

        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(`${exp.role} - ${exp.company}`);

        const locationText = exp.location ? ` | ${exp.location}` : '';
        doc
          .fontSize(10)
          .font('Helvetica-Oblique')
          .fillColor(GRAY)
          .text(`${exp.period}${locationText}`);

        doc.fillColor(BLACK);

        if (exp.description) {
          doc.moveDown(0.3);
          doc.fontSize(10).font('Helvetica').text(exp.description);
        }

        if (exp.highlights && exp.highlights.length > 0) {
          doc.moveDown(0.3);
          exp.highlights.forEach((highlight: string) => {
            doc
              .fontSize(10)
              .font('Helvetica')
              .text(`• ${highlight}`, { indent: 10 });
          });
        }

        if (exp.technologies && exp.technologies.length > 0) {
          doc.moveDown(0.3);
          doc
            .fontSize(9)
            .font('Helvetica-Bold')
            .text(`Technologies: `, { continued: true })
            .font('Helvetica')
            .text(exp.technologies.join(', '));
        }
      });

      doc.moveDown(1);

      // Education
      this.addSectionHeader(doc, 'EDUCATION', BLACK);

      education.forEach((edu, index) => {
        if (index > 0) doc.moveDown(0.5);

        doc.fontSize(11).font('Helvetica-Bold').text(edu.degree);

        doc
          .fontSize(10)
          .font('Helvetica-Oblique')
          .fillColor(GRAY)
          .text(`${edu.school} | ${edu.period}`);

        doc.fillColor(BLACK);
      });

      doc.end();
    });
  }

  private async generateTraditionalPDF(
    personalInfo: any,
    experiences: any[],
    education: any[],
    skills: any[]
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // Colors for Traditional (with accent colors)
      const PRIMARY = '#00d1b2';
      const SECONDARY = '#0083b0';
      const BLACK = '#2c3e50';
      const GRAY = '#7f8c8d';

      // Header with colored background
      doc.rect(0, 0, doc.page.width, 120).fill(PRIMARY).fillColor('white');

      doc.fontSize(32).font('Helvetica-Bold').text(personalInfo.name, 50, 30, {
        align: 'center',
      });

      doc.moveDown(0.5);
      doc
        .fontSize(12)
        .font('Helvetica')
        .text(personalInfo.title, { align: 'center' });

      doc.moveDown(0.5);
      doc
        .fontSize(10)
        .text(
          `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.linkedin} | ${personalInfo.github}`,
          { align: 'center' }
        );

      doc.fillColor(BLACK);
      doc.y = 140;

      // Professional Summary Box
      doc
        .rect(50, doc.y, doc.page.width - 100, 60)
        .fillAndStroke('#f8f9fa', '#e1e8ed');

      doc.fillColor(BLACK);
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(personalInfo.subtitle, 60, doc.y + 10, {
          width: doc.page.width - 120,
          align: 'justify',
        });

      doc.y += 70;
      doc.moveDown(1);

      // Technical Skills
      this.addSectionHeader(doc, 'TECHNICAL SKILLS & EXPERTISE', PRIMARY);

      // Display skills in a grid-like format
      const skillsPerRow = 3;
      const skillNames = skills.map((s) => s.name);
      for (let i = 0; i < skillNames.length; i += skillsPerRow) {
        const rowSkills = skillNames.slice(i, i + skillsPerRow);
        doc
          .fontSize(10)
          .font('Helvetica')
          .text(rowSkills.join('  •  '), { align: 'left' });
        if (i + skillsPerRow < skillNames.length) doc.moveDown(0.3);
      }

      doc.moveDown(1);

      // Professional Experience
      this.addSectionHeader(doc, 'PROFESSIONAL EXPERIENCE', PRIMARY);

      experiences.forEach((exp, index) => {
        if (index > 0) doc.moveDown(1);

        const leftMargin = 50; // Reset to page margin for each experience

        doc.x = leftMargin;
        doc.fontSize(12).font('Helvetica-Bold').fillColor(BLACK).text(exp.role);

        doc.x = leftMargin;
        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .fillColor(PRIMARY)
          .text(exp.company);

        doc.x = leftMargin;
        doc
          .fontSize(10)
          .font('Helvetica-Oblique')
          .fillColor(GRAY)
          .text(exp.period + (exp.location ? ` | ${exp.location}` : ''));

        doc.fillColor(BLACK);

        if (exp.description) {
          doc.moveDown(0.4);
          doc.x = leftMargin;
          doc
            .fontSize(10)
            .font('Helvetica')
            .text(exp.description, { align: 'justify' });
        }

        if (exp.highlights && exp.highlights.length > 0) {
          doc.moveDown(0.4);
          exp.highlights.forEach((highlight: string) => {
            doc.x = leftMargin;
            doc
              .fontSize(10)
              .font('Helvetica')
              .fillColor(PRIMARY)
              .text('•', leftMargin + 10, doc.y, { continued: true })
              .fillColor(BLACK)
              .text(` ${highlight}`);
          });
        }

        if (exp.technologies && exp.technologies.length > 0) {
          doc.moveDown(0.4);
          doc.x = leftMargin;
          doc
            .rect(leftMargin, doc.y, doc.page.width - 100, 25)
            .fillAndStroke('#f0f9ff', '#e1e8ed');

          doc
            .fontSize(9)
            .font('Helvetica-Bold')
            .fillColor(SECONDARY)
            .text('Technologies: ', leftMargin + 10, doc.y + 8, {
              continued: true,
            })
            .font('Helvetica')
            .fillColor(BLACK)
            .text(exp.technologies.join(' • '));

          doc.y += 25;
        }
      });

      doc.moveDown(1);

      // Education
      this.addSectionHeader(doc, 'EDUCATION', PRIMARY);

      education.forEach((edu, index) => {
        if (index > 0) doc.moveDown(0.7);

        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .fillColor(BLACK)
          .text(edu.degree);

        doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .fillColor(PRIMARY)
          .text(edu.school);

        doc
          .fontSize(9)
          .font('Helvetica-Oblique')
          .fillColor(GRAY)
          .text(edu.period);

        doc.fillColor(BLACK);
      });

      doc.end();
    });
  }

  private addSectionHeader(
    doc: PDFKit.PDFDocument,
    title: string,
    color: string
  ) {
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .fillColor(color)
      .text(title.toUpperCase());

    doc
      .moveTo(doc.x, doc.y + 5)
      .lineTo(doc.page.width - 50, doc.y + 5)
      .strokeColor(color)
      .lineWidth(2)
      .stroke();

    doc.fillColor('#2c3e50');
    doc.moveDown(0.5);
  }
}
