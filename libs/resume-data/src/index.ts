export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
  highlights: string[];
  technologies?: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Alan Spurlock',
  title: 'Passionate Leader | Rare Disney Items Collector',
  subtitle:
    'Seasoned technology leader with extensive experience leading teams, consulting, and building innovative solutions in startup environments and SaaS platforms.',
  email: 'ams07141986@gmail.com',
  phone: '469-514-9600',
  social: {
    linkedin: 'https://www.linkedin.com/in/alan-s-6a57a8180/',
    twitter: 'https://x.com/NalaLockspur',
    github: 'https://github.com/AlanGreyjoy',
  },
};

export const ROLES = [
  'engineering leader',
  'technical consultant',
  'engineering manager',
  'architect',
  'AI architect',
  'full stack developer',
  'devops engineer',
  'cloud architect',
  'founder',
  'mentor',
  'sr. leader',
  'LLM integrator',
  'automation expert',
  'voip specialist',
  'ui/ux designer',
  'vibe coder',
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Goosehead Insurance Agency',
    role: 'Senior Software Engineer',
    period: 'June 2024 - Present',
    location: 'Westlake, Texas',
    highlights: [],
    technologies: [],
  },
  {
    company: 'Sipharmony, LLC',
    role: 'Founder & Engineer',
    period: 'January 2022 - Present',
    description:
      'Custom platform - written on top of Asterisk. Single handedly wrote a complete UCaaS/CPaaS platform.',
    highlights: [
      'Full scale, multi-hosted, and geo location failover PBX system',
      'Complete with SMS/MMS, Public facing API, Skill Based Routing',
      'AI services, AI assisted power dialer',
      'All the bells and whistles of other leading providers',
    ],
    technologies: [
      'React/Vite',
      'Sip.js',
      'MongoDB',
      'Supabase',
      'Asterisk 20',
      'RTP Engine',
      'Coturn',
      'Kamailio',
      'Python',
      'Node.js',
      'Docker',
    ],
  },
  {
    company: 'CBRE',
    role: 'Lead Sr Software Engineer',
    period: 'July 2023 - May 2024',
    location: 'United States',
    highlights: [
      'Led a team through the full software development lifecycle',
      '50% increase in frontend speed by adding RTK, RTK-QUERY, and React Hook Form',
      '20% increase in user engagement and performance',
      'Implemented Terraform (Infrastructure as code) for PR based deployments',
      'Implemented Husky pre-commit and pre-push scripts for CI/CD',
      'Managed Azure access, repositories, and permissions',
    ],
    technologies: [
      'JavaScript',
      'Python',
      'Azure DevOps',
      'Node.js',
      'Express.js',
      'Stoplight.io',
    ],
  },
  {
    company: 'GalaxE.Solutions',
    role: 'Lead Sr Full Stack Software Engineer',
    period: 'April 2022 - May 2023',
    highlights: [
      'Led team in designing microservices architecture',
      'Developed RESTful APIs with Node.js and Express',
      'Implemented CI/CD pipelines using GitHub Actions and Docker',
      'Led offshore teams transitioning SpringBoot/DB2 to Node.js/Postgres',
    ],
    technologies: [
      'Node.js',
      'Express',
      'React',
      'GitHub Actions',
      'GitLab',
      'Azure Pipelines',
      'Docker',
    ],
  },
  {
    company: 'Integritek',
    role: 'Sr VoIP Software Engineer',
    period: 'February 2017 - December 2021',
    location: 'Austin, Texas',
    highlights: [
      'Developed enterprise VoIP applications',
      'Implemented SIP protocols and VoIP features',
      'Integrated VoIP solutions with CRM systems',
      'Developed large-scale Node.js servers interacting with 350+ FreePBX installs',
    ],
    technologies: [
      'Node.js',
      'React.js',
      'Next.js',
      'SIP',
      'FreePBX',
      'pfSense',
    ],
  },
  {
    company: 'PanelSense, LLC',
    role: 'Principal Software Engineer',
    period: 'August 2019 - May 2020',
    location: 'Dallas, Texas',
    highlights: [
      'Directed development increasing efficiency by 30% and reducing costs by 20%',
      'Led a team of 50+ engineers, launching 5 new products on time',
      'Implemented Agile methodologies, reducing time-to-market by 40%',
      'Drove a 15% increase in revenue through technology strategy',
      'Reduced downtime by 25% with cloud technologies and automation',
    ],
    technologies: [
      'GitHub Actions',
      'ESLint',
      'SonarQube',
      'Checkmarx',
      'CyberArk',
    ],
  },
  {
    company: 'SeaDek Marine Products',
    role: 'Software Engineer',
    period: 'January 2016 - April 2017',
    location: 'Rockledge, Florida',
    highlights: [
      'Developed customer-facing web application with Laravel',
      'Created RhinoDek plugin for Rhino3D, saving 45 minutes per project',
      'Automated manufacturing processes with AutoInput Bot and SigmaBot',
    ],
    technologies: ['Laravel', 'C#', 'Winforms', 'WPF', 'Rhino3D', 'SigmaNest'],
  },
  {
    company: 'SkillCheck Games',
    role: 'Unity3D Software Engineer',
    period: '2010 - 2016',
    location: 'Seattle, Washington',
    highlights: [
      'Lead code reviews',
      'Designed a simple Auction House using Node.js and Postgres',
      'Designed an authoritative MMORPG server using TCP I/O',
    ],
    technologies: ['Unity3D', 'C#', 'Node.js', 'Postgres', 'TCP/IP'],
  },
  {
    company: 'The Dead Rabbits',
    role: 'Founder',
    period: 'January 2008 - January 2015',
    location: 'Dallas/Fort Worth Area',
    description:
      'Custom software solutions and game dev studio. Consulted and wrote Unity3D C# scripts for various gaming companies and projects.',
    highlights: [],
    technologies: ['Unity3D', 'C#'],
  },
];

export const EDUCATION: Education[] = [
  {
    school: 'ITT Technical Institute',
    degree: 'Bachelor of Science - BS, Software Development',
    period: 'September 2005 - June 2009',
  },
  {
    school: 'Eastern Florida State College',
    degree: 'Associate of Science - AS, CAD/CADD Drafting',
    period: '2012 - 2014',
  },
];

export const SKILLS = [
  'Engineering Leadership',
  'Technical Consulting',
  'Team Management',
  'System Architecture',
  'TypeScript',
  'React',
  'Node.js',
  'Google Cloud',
  'MongoDB',
  'Creative Problem Solving',
];

export const STATS = [
  { value: '17 Years', label: 'Industry Experience' },
  { value: 'AI Native', label: 'Future Ready Solutions' },
  { value: 'Founder', label: 'Built UCaaS/CPaaS Platform' },
  {
    value: 'Fortune 500',
    label: 'Consultant (Disney, Northwestern Mutual, Cigna, etc.)',
  },
];
