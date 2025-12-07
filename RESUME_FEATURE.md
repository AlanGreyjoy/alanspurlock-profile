# Dynamic Resume Generation Feature

## Overview

Your website now has a dynamic resume generation system! The Experience page includes a download button that generates PDF resumes on-the-fly from your website's data.

## What Was Built

### 1. Shared Data Library (`libs/resume-data`)

- Single source of truth for all resume data
- Used by both frontend pages AND PDF generation
- Update once, reflects everywhere

### 2. Resume Generation Service (`apps/api-gateway/src/resume`)

- NestJS service that generates PDFs using Puppeteer
- Two professionally designed templates:
  - **AI-Optimized**: Clean, ATS-friendly formatting for resume scanners
  - **Traditional**: Modern design with colors and visual hierarchy

### 3. Frontend Integration

- Select dropdown to choose resume version
- Download button with loading state
- API integration with error handling

## How to Use

### For Development

1. **Start the backend:**

   ```bash
   pnpm dev:api
   ```

   Backend runs on `http://localhost:3000`

2. **Start the frontend:**

   ```bash
   pnpm dev
   ```

   Frontend runs on `http://localhost:4200` (or Vite's default)

3. **Visit the Experience page** and test the download feature!

### Updating Your Resume

Simply edit `/libs/resume-data/src/index.ts`:

```typescript
export const EXPERIENCES: Experience[] = [
  {
    company: 'Your Company',
    role: 'Your Role',
    period: 'Start - End',
    location: 'Location',
    description: 'Brief description',
    highlights: ['Achievement 1', 'Achievement 2'],
    technologies: ['Tech1', 'Tech2'],
  },
  // ... more experiences
];
```

Changes automatically appear in:

- ✅ Home page
- ✅ About page
- ✅ Experience page
- ✅ Generated PDF resumes (both versions)

## Architecture

```
┌─────────────────┐
│   Frontend      │
│  (Experience    │
│    Page)        │
└────────┬────────┘
         │ HTTP GET /api/resume/download?type=ai-optimized
         ↓
┌─────────────────┐      ┌──────────────────┐
│   API Gateway   │─────→│   Resume Data    │
│  (NestJS)       │      │   (Shared Lib)   │
└────────┬────────┘      └──────────────────┘
         │
         ↓ Puppeteer
┌─────────────────┐
│  HTML Template  │
│   + Data        │
└────────┬────────┘
         │
         ↓ Render
┌─────────────────┐
│   PDF Output    │
└─────────────────┘
```

## Templates

### AI-Optimized Resume

Perfect for:

- ✅ Applicant Tracking Systems (ATS)
- ✅ AI resume scanners
- ✅ Automated parsing
- ✅ Corporate job applications

Features:

- Simple, clean layout
- No colors or complex formatting
- Standard fonts
- Clear section headers
- Optimized for text extraction

### Traditional Resume

Perfect for:

- ✅ Direct to hiring manager
- ✅ PDF portfolio sharing
- ✅ LinkedIn/personal website
- ✅ Networking events

Features:

- Modern, professional design
- Brand colors (#00d1b2)
- Visual hierarchy
- Better typography
- Print-optimized

## API Endpoint

```
GET /api/resume/download?type={ai-optimized|traditional}
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="alan-spurlock-resume-{type}.pdf"`

## Environment Variables

Add to your `.env` file:

```bash
# Frontend
VITE_API_URL=http://localhost:3000/api

# Backend (optional)
PORT=3000
FRONTEND_URL=http://localhost:4200
```

## Production Deployment

### Backend Requirements

- Node.js runtime
- Puppeteer dependencies (chromium)
- Sufficient memory for PDF generation (~200MB per generation)

### Docker Considerations

If deploying with Docker, ensure Puppeteer dependencies are installed:

```dockerfile
RUN apt-get update && apt-get install -y \
    chromium \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxtst6 \
    libnss3 \
    libcups2 \
    libxss1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgtk-3-0
```

### Environment Variables for Production

```bash
VITE_API_URL=https://api.yoursite.com/api
FRONTEND_URL=https://yoursite.com
```

## Performance

- PDF generation: ~2-3 seconds
- No caching (generates fresh each time)
- Puppeteer runs headless
- Memory efficient with proper cleanup

## Future Enhancements

Consider adding:

- [ ] PDF caching (generate once, cache for 1 hour)
- [ ] Download analytics (track which version is popular)
- [ ] More template variants
- [ ] Custom themes/branding options
- [ ] Email delivery option
- [ ] QR code with portfolio link

## Troubleshooting

### Frontend can't reach backend

- Ensure backend is running on port 3000
- Check CORS configuration in `apps/api-gateway/src/main.ts`
- Verify `VITE_API_URL` in `.env`

### PDF generation fails

- Check Puppeteer installation: `pnpm list puppeteer`
- Ensure sufficient memory
- Check console logs in backend

### Data not updating

- Clear browser cache
- Restart both frontend and backend
- Verify changes in `/libs/resume-data/src/index.ts`

## Benefits

✅ **Single Source of Truth**: Update data once, everywhere reflects it  
✅ **Always Fresh**: PDFs always have your latest information  
✅ **Professional**: Two high-quality templates  
✅ **Type Safe**: TypeScript ensures data consistency  
✅ **Maintainable**: Easy to update and extend  
✅ **Scalable**: Can add more templates or features easily

---

Built with ❤️ using NestJS, Puppeteer, and React
