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
      description: null,
      highlights: [],
      technologies: [],
      order: 0,
    },
    {
      company: 'Sipharmony, LLC',
      role: 'Founder & Engineer',
      period: 'January 2022 - Present',
      location: null,
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
      order: 1,
    },
    {
      company: 'CBRE',
      role: 'Lead Sr Software Engineer',
      period: 'July 2023 - May 2024',
      location: 'United States',
      description: null,
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
      order: 2,
    },
    {
      company: 'GalaxE.Solutions',
      role: 'Lead Sr Full Stack Software Engineer',
      period: 'April 2022 - May 2023',
      location: null,
      description: null,
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
      order: 3,
    },
    {
      company: 'Integritek',
      role: 'Sr VoIP Software Engineer',
      period: 'February 2017 - December 2021',
      location: 'Austin, Texas',
      description: null,
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
      order: 4,
    },
    {
      company: 'PanelSense, LLC',
      role: 'Principal Software Engineer',
      period: 'August 2019 - May 2020',
      location: 'Dallas, Texas',
      description: null,
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
      order: 5,
    },
    {
      company: 'SeaDek Marine Products',
      role: 'Software Engineer',
      period: 'January 2016 - April 2017',
      location: 'Rockledge, Florida',
      description: null,
      highlights: [
        'Developed customer-facing web application with Laravel',
        'Created RhinoDek plugin for Rhino3D, saving 45 minutes per project',
        'Automated manufacturing processes with AutoInput Bot and SigmaBot',
      ],
      technologies: [
        'Laravel',
        'C#',
        'Winforms',
        'WPF',
        'Rhino3D',
        'SigmaNest',
      ],
      order: 6,
    },
    {
      company: 'SkillCheck Games',
      role: 'Unity3D Software Engineer',
      period: '2010 - 2016',
      location: 'Seattle, Washington',
      description: null,
      highlights: [
        'Lead code reviews',
        'Designed a simple Auction House using Node.js and Postgres',
        'Designed an authoritative MMORPG server using TCP I/O',
      ],
      technologies: ['Unity3D', 'C#', 'Node.js', 'Postgres', 'TCP/IP'],
      order: 7,
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
