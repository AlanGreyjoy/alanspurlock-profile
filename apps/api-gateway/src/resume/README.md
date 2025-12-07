# Resume Generation Service

This module dynamically generates PDF resumes from the website's data using Puppeteer.

## Features

- **Dynamic Generation**: PDFs are generated on-demand from live data
- **Two Templates**:
  - AI-Optimized (ATS-friendly, clean formatting)
  - Traditional (modern design with colors and styling)
- **Data-Driven**: Uses shared resume data library
- **High Quality**: PDF generation via Puppeteer for accurate rendering

## API Endpoints

### Download Resume

```
GET /resume/download?type={ai-optimized|traditional}
```

**Parameters:**

- `type` (required): Either `ai-optimized` or `traditional`

**Response:**

- Content-Type: `application/pdf`
- File download with appropriate filename

**Example:**

```bash
curl "http://localhost:3000/resume/download?type=ai-optimized" -o resume.pdf
```

## Templates

### AI-Optimized Template

`templates/ai-optimized.template.ts`

- Simple, clean formatting for ATS systems
- No colors or complex layouts
- Clear section headers
- Standard fonts (Arial/Helvetica)
- Keyword-rich content
- Optimized for parsing by resume scanners

### Traditional Template

`templates/traditional.template.ts`

- Modern, professional design
- Color accents (#00d1b2 theme)
- Better typography and spacing
- Visual hierarchy
- Professional yet contemporary look
- Print-optimized with proper page breaks

## Architecture

```
resume/
├── resume.module.ts       # NestJS module
├── resume.controller.ts   # HTTP endpoints
├── resume.service.ts      # PDF generation logic
└── templates/
    ├── ai-optimized.template.ts
    └── traditional.template.ts
```

## How It Works

1. User clicks download button on frontend
2. Frontend calls `/resume/download?type=ai-optimized`
3. Backend:
   - Imports data from `@alanspurlock-profile/resume-data`
   - Generates HTML from template
   - Launches Puppeteer browser
   - Renders HTML to PDF
   - Returns PDF as download
4. User receives freshly generated PDF with latest data

## Updating Resume Content

No code changes needed! Just update `/libs/resume-data/src/index.ts` and the PDFs will automatically reflect the changes.

## Performance

- PDF generation takes ~2-3 seconds
- Puppeteer runs in headless mode
- Browser instance is created per request (stateless)
- Memory efficient with proper cleanup

## Future Enhancements

Potential improvements:

- PDF caching (generate once, cache for X minutes)
- Queue system for high traffic
- Custom branding/themes per template
- Additional template variants
- Analytics tracking (who downloads what)
