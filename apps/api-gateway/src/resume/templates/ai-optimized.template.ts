import {
  PersonalInfo,
  Experience,
  Education,
} from '@alanspurlock-profile/resume-data';

/**
 * AI-Optimized Resume Template
 *
 * This template is designed to be ATS (Applicant Tracking System) friendly:
 * - Clean, simple formatting
 * - Clear section headers
 * - No complex layouts or tables
 * - Standard fonts
 * - Keyword-rich content
 * - No graphics or colors
 */
export function getAIOptimizedTemplate(
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
      font-family: 'Arial', 'Helvetica', sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #000000;
      background: #ffffff;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 24pt;
      font-weight: bold;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    
    h2 {
      font-size: 14pt;
      font-weight: bold;
      margin: 15px 0 8px 0;
      text-transform: uppercase;
      border-bottom: 2px solid #000000;
      padding-bottom: 3px;
    }
    
    h3 {
      font-size: 12pt;
      font-weight: bold;
      margin: 8px 0 4px 0;
    }
    
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .contact-info {
      text-align: center;
      font-size: 10pt;
      margin-bottom: 5px;
    }
    
    .section {
      margin-bottom: 18px;
    }
    
    .job {
      margin-bottom: 15px;
    }
    
    .job-header {
      margin-bottom: 5px;
    }
    
    .company-role {
      font-weight: bold;
    }
    
    .period {
      font-style: italic;
    }
    
    .location {
      font-style: italic;
    }
    
    .description {
      margin: 5px 0;
    }
    
    ul {
      margin: 5px 0 5px 20px;
    }
    
    li {
      margin-bottom: 3px;
    }
    
    .technologies {
      margin-top: 5px;
      font-size: 10pt;
    }
    
    .technologies strong {
      font-weight: bold;
    }
    
    .skills-list {
      margin: 5px 0;
      line-height: 1.6;
    }
    
    .education-item {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- HEADER -->
    <div class="header">
      <h1>${personalInfo.name}</h1>
      <div class="contact-info">
        ${personalInfo.email} | ${personalInfo.phone}
      </div>
      <div class="contact-info">
        LinkedIn: ${personalInfo.social.linkedin} | GitHub: ${
    personalInfo.social.github
  }
      </div>
    </div>

    <!-- PROFESSIONAL SUMMARY -->
    <div class="section">
      <h2>Professional Summary</h2>
      <p>${personalInfo.subtitle}</p>
    </div>

    <!-- SKILLS -->
    <div class="section">
      <h2>Technical Skills</h2>
      <div class="skills-list">
        ${skills.join(' • ')}
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
            <div class="company-role">${exp.role} - ${exp.company}</div>
            <div class="period">${exp.period}${
            exp.location ? ` | ${exp.location}` : ''
          }</div>
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
            <strong>Technologies:</strong> ${exp.technologies.join(', ')}
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
          <div class="company-role">${edu.degree}</div>
          <div class="period">${edu.school} | ${edu.period}</div>
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
