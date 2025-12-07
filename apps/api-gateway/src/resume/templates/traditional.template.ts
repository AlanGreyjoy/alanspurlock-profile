import {
  PersonalInfo,
  Experience,
  Education,
} from '@alanspurlock-profile/resume-data';

/**
 * Traditional Resume Template
 *
 * This template has a more visual, modern design:
 * - Color accents
 * - Better typography
 * - Visual hierarchy
 * - More spacing
 * - Professional yet modern look
 */
export function getTraditionalTemplate(
  personalInfo: PersonalInfo,
  experiences: Experience[],
  education: Education[],
  skills: string[]
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.name} - Resume</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.5;
      color: #2c3e50;
      background: #ffffff;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .header {
      background: linear-gradient(135deg, #00d1b2 0%, #0083b0 100%);
      color: white;
      padding: 30px;
      text-align: center;
      margin-bottom: 25px;
    }
    
    h1 {
      font-size: 32pt;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .subtitle {
      font-size: 12pt;
      font-weight: 300;
      margin-bottom: 12px;
      opacity: 0.95;
    }
    
    .contact-info {
      font-size: 10pt;
      margin-top: 8px;
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    .contact-item {
      display: inline-block;
    }
    
    h2 {
      font-size: 16pt;
      font-weight: 700;
      color: #00d1b2;
      margin: 20px 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 3px solid #00d1b2;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    h3 {
      font-size: 13pt;
      font-weight: 600;
      color: #2c3e50;
      margin: 10px 0 5px 0;
    }
    
    .section {
      margin-bottom: 22px;
    }
    
    .summary {
      background: #f8f9fa;
      padding: 15px;
      border-left: 4px solid #00d1b2;
      margin-bottom: 22px;
      font-size: 11pt;
      line-height: 1.6;
    }
    
    .job {
      margin-bottom: 18px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e1e8ed;
    }
    
    .job:last-child {
      border-bottom: none;
    }
    
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 6px;
      flex-wrap: wrap;
    }
    
    .job-title {
      font-weight: 700;
      font-size: 12pt;
      color: #2c3e50;
    }
    
    .company {
      font-weight: 600;
      color: #00d1b2;
      font-size: 11pt;
    }
    
    .period-location {
      font-size: 10pt;
      color: #7f8c8d;
      font-style: italic;
      text-align: right;
    }
    
    .description {
      margin: 8px 0;
      font-size: 10.5pt;
      color: #34495e;
    }
    
    ul {
      margin: 8px 0 8px 20px;
    }
    
    li {
      margin-bottom: 4px;
      color: #34495e;
    }
    
    li::marker {
      color: #00d1b2;
    }
    
    .technologies {
      margin-top: 8px;
      padding: 8px 12px;
      background: #f0f9ff;
      border-radius: 4px;
      font-size: 9.5pt;
    }
    
    .technologies strong {
      font-weight: 600;
      color: #0083b0;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-top: 10px;
    }
    
    .skill-item {
      background: #f8f9fa;
      padding: 8px 12px;
      border-radius: 4px;
      border-left: 3px solid #00d1b2;
      font-size: 10pt;
      font-weight: 500;
    }
    
    .education-item {
      margin-bottom: 12px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 4px;
    }
    
    .degree {
      font-weight: 600;
      font-size: 11pt;
      color: #2c3e50;
      margin-bottom: 4px;
    }
    
    .school {
      color: #00d1b2;
      font-weight: 500;
    }
    
    .edu-period {
      font-size: 9.5pt;
      color: #7f8c8d;
      font-style: italic;
      margin-top: 2px;
    }
    
    @media print {
      .header {
        break-inside: avoid;
      }
      .job {
        break-inside: avoid;
      }
      .education-item {
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <h1>${personalInfo.name}</h1>
      <div class="subtitle">${personalInfo.title}</div>
      <div class="contact-info">
        <span class="contact-item">${personalInfo.email}</span>
        <span class="contact-item">|</span>
        <span class="contact-item">${personalInfo.phone}</span>
        <span class="contact-item">|</span>
        <span class="contact-item">LinkedIn: ${personalInfo.social.linkedin.replace(
          'https://',
          ''
        )}</span>
        <span class="contact-item">|</span>
        <span class="contact-item">GitHub: ${personalInfo.social.github.replace(
          'https://',
          ''
        )}</span>
      </div>
    </div>

    <!-- PROFESSIONAL SUMMARY -->
    <div class="summary">
      ${personalInfo.subtitle}
    </div>

    <!-- SKILLS -->
    <div class="section">
      <h2>Technical Skills & Expertise</h2>
      <div class="skills-grid">
        ${skills
          .map((skill) => `<div class="skill-item">${skill}</div>`)
          .join('')}
      </div>
    </div>

    <!-- PROFESSIONAL EXPERIENCE -->
    <div class="section">
      <h2>Professional Experience</h2>
      ${experiences
        .map(
          (exp) => `
        <div class="job">
          <div class="job-header">
            <div>
              <div class="job-title">${exp.role}</div>
              <div class="company">${exp.company}</div>
            </div>
            <div class="period-location">
              <div>${exp.period}</div>
              ${exp.location ? `<div>${exp.location}</div>` : ''}
            </div>
          </div>
          ${
            exp.description
              ? `<div class="description">${exp.description}</div>`
              : ''
          }
          ${
            exp.highlights && exp.highlights.length > 0
              ? `
          <ul>
            ${exp.highlights
              .map((highlight) => `<li>${highlight}</li>`)
              .join('')}
          </ul>
          `
              : ''
          }
          ${
            exp.technologies && exp.technologies.length > 0
              ? `
          <div class="technologies">
            <strong>Technologies:</strong> ${exp.technologies.join(' • ')}
          </div>
          `
              : ''
          }
        </div>
      `
        )
        .join('')}
    </div>

    <!-- EDUCATION -->
    <div class="section">
      <h2>Education</h2>
      ${education
        .map(
          (edu) => `
        <div class="education-item">
          <div class="degree">${edu.degree}</div>
          <div class="school">${edu.school}</div>
          <div class="edu-period">${edu.period}</div>
        </div>
      `
        )
        .join('')}
    </div>
  </div>
</body>
</html>
  `.trim();
}
