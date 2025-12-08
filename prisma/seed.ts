import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.personalInfo.deleteMany();

  // Seed Personal Info
  console.log('Seeding personal info...');
  await prisma.personalInfo.create({
    data: {
      name: 'Alan Spurlock',
      title: 'Passionate Leader | Rare Disney Items Collector',
      subtitle:
        'Seasoned technology leader with extensive experience leading teams, consulting, and building innovative solutions in startup environments and SaaS platforms.',
      email: 'ams07141986@gmail.com',
      phone: '469-514-9600',
      linkedin: 'https://www.linkedin.com/in/alan-s-6a57a8180/',
      twitter: 'https://x.com/NalaLockspur',
      github: 'https://github.com/AlanGreyjoy',
    },
  });

  // Seed Experiences
  console.log('Seeding experiences...');
  const experiences = [
    {
      company: 'Goosehead Insurance Agency',
      role: 'Senior Software Engineer',
      period: 'June 2024 - Present',
      location: 'Westlake, Texas',
      description:
        'Architecting and implementing scalable solutions for a rapidly growing insurance technology platform serving thousands of independent agents nationwide.',
      highlights: [
        'Designing microservices architecture to support high-volume insurance quoting and policy management',
        'Collaborating with cross-functional teams to modernize legacy systems and improve agent productivity',
        'Implementing best practices for code quality, testing, and continuous deployment',
        'Contributing to technical decision-making and architectural planning for platform evolution',
      ],
      technologies: [
        'TypeScript',
        'React',
        'Node.js',
        'NX',
        'NestJS',
        'Next.js',
        'Heroku',
        'AWS',
        'Microservices',
        'CI/CD',
      ],
      order: 0,
    },
    {
      company: 'Sipharmony, LLC',
      role: 'Founder & Engineer',
      period: 'January 2022 - Present',
      location: null,
      description:
        'Founded and single-handedly architected a complete enterprise-grade UCaaS/CPaaS platform built on Asterisk, competing with established industry leaders through innovative features and cost-effective scalability.',
      highlights: [
        'Engineered full-stack multi-tenant PBX system with geo-location failover and high availability',
        'Implemented advanced features: SMS/MMS messaging, public REST API, skill-based call routing',
        'Developed AI-powered services including intelligent call analytics and AI-assisted power dialer',
        'Built scalable infrastructure handling thousands of concurrent calls with 99.9% uptime',
        'Created comprehensive web application with real-time WebRTC calling and intuitive admin interfaces',
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
      order: 1,
    },
    {
      company: 'CBRE',
      role: 'Lead Sr Software Engineer',
      period: 'July 2023 - May 2024',
      location: 'United States',
      description:
        "Led engineering initiatives for the world's largest commercial real estate services firm, driving technical excellence and team productivity across enterprise-scale applications.",
      highlights: [
        'Guided cross-functional team through complete SDLC, establishing best practices and architectural standards',
        'Achieved 50% improvement in frontend performance by implementing Redux Toolkit, RTK Query, and React Hook Form',
        'Drove 20% increase in user engagement through optimized UX and application performance enhancements',
        'Architected Infrastructure as Code using Terraform, enabling automated PR-based deployment workflows',
        'Established robust CI/CD pipeline with Husky pre-commit hooks, reducing production bugs by 30%',
        'Managed Azure DevOps ecosystem including access control, repository governance, and team permissions',
      ],
      technologies: [
        'JavaScript',
        'Python',
        'Azure DevOps',
        'Node.js',
        'Express.js',
        'Stoplight.io',
        'Terraform',
        'Redux Toolkit',
      ],
      order: 2,
    },
    {
      company: 'GalaxE.Solutions',
      role: 'Lead Sr Full Stack Software Engineer',
      period: 'April 2022 - May 2023',
      location: null,
      description:
        'Spearheaded technical leadership for Fortune 500 consulting engagements including Disney, Cigna, ExpressScripts, and Fiserv, driving architectural modernization and leading distributed engineering teams through complex technology migrations.',
      highlights: [
        'Led team of 17 offshore resources, providing technical mentorship and architectural guidance',
        'Architected and executed complete SpringBoot/DB2 to Node.js/PostgreSQL migration, training team on new stack',
        'Designed cloud-native microservices infrastructure for multiple enterprise clients, improving scalability',
        'Implemented RESTful APIs serving millions of requests daily with sub-second response times',
        'Built comprehensive CI/CD pipelines using GitHub Actions and Docker, reducing deployment time by 60%',
        'Established coding standards and review processes across Fortune 500 client projects',
      ],
      technologies: [
        'Node.js',
        'Express',
        'React',
        'GitHub Actions',
        'GitLab',
        'Azure Pipelines',
        'Docker',
        'PostgreSQL',
        'SpringBoot',
        'DB2',
      ],
      order: 3,
    },
    {
      company: 'Integritek',
      role: 'Sr VoIP Software Engineer',
      period: 'February 2017 - December 2021',
      location: 'Austin, Texas',
      description:
        'Engineered enterprise-grade VoIP solutions and telecommunications infrastructure, managing one of the largest distributed FreePBX networks while building custom telephony applications.',
      highlights: [
        'Architected and maintained distributed VoIP infrastructure serving thousands of concurrent users',
        'Developed scalable Node.js orchestration servers managing 350+ FreePBX installations across multiple data centers',
        'Implemented advanced SIP protocols, call routing, and real-time communication features',
        'Built seamless CRM integrations enabling click-to-dial, call logging, and automated workflows',
        'Created customer-facing web applications using React.js and Next.js for call management and analytics',
        'Established network security practices using pfSense, ensuring PCI-DSS compliance for payment card data',
      ],
      technologies: [
        'Node.js',
        'React.js',
        'Next.js',
        'SIP',
        'FreePBX',
        'pfSense',
        'WebRTC',
        'Asterisk',
      ],
      order: 4,
    },
    {
      company: 'PanelSense, LLC',
      role: 'Principal Software Engineer',
      period: 'August 2019 - May 2020',
      location: 'Dallas, Texas',
      description:
        'Provided strategic technical leadership for enterprise software initiatives, overseeing large-scale engineering operations and driving organizational transformation through modern development practices.',
      highlights: [
        'Directed multi-team development efforts, achieving 30% efficiency improvement and 20% cost reduction',
        'Led organization of 50+ engineers across 5 concurrent product launches, delivering all on schedule',
        'Championed Agile transformation, implementing Scrum practices that reduced time-to-market by 40%',
        'Architected technology strategy and platform improvements directly contributing to 15% revenue growth',
        'Spearheaded cloud migration and automation initiatives, reducing system downtime by 25%',
        'Established comprehensive security and quality pipeline using SonarQube, Checkmarx, and CyberArk',
      ],
      technologies: [
        'GitHub Actions',
        'ESLint',
        'SonarQube',
        'Checkmarx',
        'CyberArk',
        'Cloud Architecture',
        'Agile/Scrum',
      ],
      order: 5,
    },
    {
      company: 'SeaDek Marine Products',
      role: 'Software Engineer',
      period: 'January 2016 - April 2017',
      location: 'Rockledge, Florida',
      description:
        'Pioneered digital transformation for marine manufacturing company, developing custom software solutions that bridged e-commerce, CAD design, and automated manufacturing workflows.',
      highlights: [
        'Built customer-facing web platform using Laravel, enabling online product customization and ordering',
        'Engineered RhinoDek plugin for Rhino3D CAD software, reducing design time by 45 minutes per project',
        'Automated manufacturing workflows with custom C# applications (AutoInput Bot and SigmaBot)',
        'Integrated e-commerce platform with CNC manufacturing systems, streamlining order-to-production pipeline',
        'Delivered solutions that improved production efficiency and enabled new business capabilities',
      ],
      technologies: [
        'Laravel',
        'C#',
        'Winforms',
        'WPF',
        'Rhino3D',
        'SigmaNest',
        'CAD/CAM',
      ],
      order: 6,
    },
    {
      company: 'SkillCheck Games',
      role: 'Unity3D Software Engineer',
      period: '2010 - 2016',
      location: 'Seattle, Washington',
      description:
        'Contributed to game development and backend engineering for an independent game studio, building scalable multiplayer systems and maintaining code quality across multiple game projects.',
      highlights: [
        'Led code review processes, establishing quality standards and mentoring junior developers',
        'Architected authoritative MMORPG server using custom TCP/IP protocol, supporting hundreds of concurrent players',
        'Designed and implemented real-time auction house system using Node.js and PostgreSQL',
        'Developed game mechanics, UI systems, and networked gameplay features in Unity3D/C#',
        'Collaborated with designers and artists to implement engaging player experiences',
      ],
      technologies: [
        'Unity3D',
        'C#',
        'Node.js',
        'PostgreSQL',
        'TCP/IP',
        'Game Networking',
      ],
      order: 7,
    },
    {
      company: 'The Dead Rabbits',
      role: 'Founder',
      period: 'January 2008 - January 2015',
      location: 'Dallas/Fort Worth Area',
      description:
        'Founded independent game development studio and consulting practice, delivering custom software solutions and Unity3D development services to gaming companies and enterprise clients.',
      highlights: [
        'Established successful consulting practice serving multiple game studios and software companies',
        'Developed custom Unity3D C# solutions across various genres including action, strategy, and simulation games',
        'Provided technical consulting on game architecture, performance optimization, and best practices',
        'Managed full project lifecycle from concept to delivery for client projects',
        'Built portfolio of successful game mechanics, tools, and systems used in shipped titles',
      ],
      technologies: [
        'Unity3D',
        'C#',
        'Game Development',
        '3D Graphics',
        'Physics Engines',
      ],
      order: 8,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({
      data: exp,
    });
  }

  // Seed Education
  console.log('Seeding education...');
  const education = [
    {
      school: 'ITT Technical Institute',
      degree: 'Bachelor of Science - BS, Software Development',
      period: 'September 2005 - June 2009',
      order: 0,
    },
    {
      school: 'Eastern Florida State College',
      degree: 'Associate of Science - AS, CAD/CADD Drafting',
      period: '2012 - 2014',
      order: 1,
    },
  ];

  for (const edu of education) {
    await prisma.education.create({
      data: edu,
    });
  }

  // Seed Skills
  console.log('Seeding skills...');
  const skills = [
    { name: 'Engineering Leadership', category: 'Leadership', order: 0 },
    { name: 'Technical Consulting', category: 'Leadership', order: 1 },
    { name: 'Team Management', category: 'Leadership', order: 2 },
    { name: 'System Architecture', category: 'Architecture', order: 3 },
    { name: 'TypeScript', category: 'Programming', order: 4 },
    { name: 'React', category: 'Frontend', order: 5 },
    { name: 'Node.js', category: 'Backend', order: 6 },
    { name: 'Google Cloud', category: 'Cloud', order: 7 },
    { name: 'MongoDB', category: 'Database', order: 8 },
    { name: 'Creative Problem Solving', category: 'Soft Skills', order: 9 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
