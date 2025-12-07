# Resume Data Library

This shared library contains all the resume data used throughout the alanspurlock-profile monorepo.

## Purpose

- **Single Source of Truth**: All resume data is maintained in one place
- **Shared Across Apps**: Both frontend and backend use the same data
- **Type Safety**: TypeScript interfaces ensure data consistency
- **Easy Updates**: Update your resume data once, and it reflects everywhere

## Data Structure

### Personal Info

- Name, title, contact information
- Social media links

### Experiences

- Company, role, period, location
- Description and highlights
- Technologies used

### Education

- School, degree, period

### Skills

- List of technical skills and expertise areas

### Stats

- Career highlights and statistics

## Usage

### Frontend (React)

```typescript
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILLS } from '@alanspurlock-profile/resume-data';

// Use in your components
<h1>{PERSONAL_INFO.name}</h1>;
```

### Backend (NestJS)

```typescript
import { EXPERIENCES, PERSONAL_INFO } from '@alanspurlock-profile/resume-data';

// Use in services
const resumeData = {
  personalInfo: PERSONAL_INFO,
  experiences: EXPERIENCES,
};
```

## Updating Resume Data

To update your resume:

1. Edit `/libs/resume-data/src/index.ts`
2. Update the relevant data structures
3. The changes will automatically reflect in:
   - Frontend pages (Home, About, Experience)
   - Generated PDF resumes (both AI-optimized and Traditional)

## Integration Points

This library is used by:

- `apps/frontend` - displays data on website pages
- `apps/api-gateway` - generates PDF resumes from this data
- Future apps can import and use the same data
