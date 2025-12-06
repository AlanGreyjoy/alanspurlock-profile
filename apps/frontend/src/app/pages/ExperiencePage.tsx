import {
  Container,
  Section,
  Card,
  Badge,
  Heading,
  Text,
  Divider,
} from '@alanspurlock-profile/spurlock-ui';

interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
  highlights: string[];
  technologies?: string[];
}

const experiences: Experience[] = [
  {
    company: 'Goosehead Insurance Agency',
    role: 'Senior Software Engineer',
    period: 'June 2024 - Present',
    location: 'Westlake, Texas',
    highlights: [],
  },
  {
    company: 'Sipharmony, LLC',
    role: 'Founder & Engineer',
    period: 'January 2022 - Present',
    description: 'Custom platform - written on top of Asterisk. Single handedly wrote a complete UCaaS/CPaaS platform.',
    highlights: [
      'Full scale, multi-hosted, and geo location failover PBX system',
      'Complete with SMS/MMS, Public facing API, Skill Based Routing',
      'AI services, AI assisted power dialer',
      'All the bells and whistles of other leading providers',
    ],
    technologies: ['React/Vite', 'Sip.js', 'MongoDB', 'Supabase', 'Asterisk 20', 'RTP Engine', 'Coturn', 'Kamailio', 'Python', 'Node.js', 'Docker'],
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
    technologies: ['JavaScript', 'Python', 'Azure DevOps', 'Node.js', 'Express.js', 'Stoplight.io'],
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
    technologies: ['Node.js', 'Express', 'React', 'GitHub Actions', 'GitLab', 'Azure Pipelines', 'Docker'],
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
    technologies: ['Node.js', 'React.js', 'Next.js', 'SIP', 'FreePBX', 'pfSense'],
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
    technologies: ['GitHub Actions', 'ESLint', 'SonarQube', 'Checkmarx', 'CyberArk'],
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
    description: 'Custom software solutions and game dev studio. Consulted and wrote Unity3D C# scripts for various gaming companies and projects.',
    highlights: [],
    technologies: ['Unity3D', 'C#'],
  },
];

const education = [
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

export function ExperiencePage() {
  return (
    <div>
      {/* Header */}
      <section className="py-12 md:py-16">
        <Container size="lg">
          <Heading as="h1" size="2xl" className="mb-4">
            Experience
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl">
            Over 15 years of building software, from game engines to enterprise 
            platforms. Here's my journey through tech.
          </Text>
        </Container>
      </section>

      <Divider variant="soft" spacing="sm" />

      {/* Timeline */}
      <Section>
        <Container size="lg">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-[var(--color-border)]" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={`${exp.company}-${index}`} className="relative pl-8 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-8 top-2 w-2 h-2 rounded-full bg-[var(--color-primary)] -translate-x-1/2" />
                  
                  <Card variant="default" padding="lg">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <Heading as="h3" size="lg">
                          {exp.role}
                        </Heading>
                        <Text variant="muted" className="flex items-center gap-2">
                          <span className="font-medium text-[var(--color-text)]">{exp.company}</span>
                          {exp.location && (
                            <>
                              <span>•</span>
                              <span>{exp.location}</span>
                            </>
                          )}
                        </Text>
                      </div>
                      <Badge variant="outline" size="sm">
                        {exp.period}
                      </Badge>
                    </div>

                    {exp.description && (
                      <Text variant="muted" className="mb-4">
                        {exp.description}
                      </Text>
                    )}

                    {exp.highlights.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[var(--color-primary)] mt-1">•</span>
                            <Text size="sm" variant="muted">
                              {highlight}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border-soft)]">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="soft" />

      {/* Education */}
      <Section title="Education">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <Card key={index} variant="elevated" padding="lg">
                <Heading as="h3" size="md" className="mb-2">
                  {edu.degree}
                </Heading>
                <Text variant="muted">{edu.school}</Text>
                <Text size="sm" variant="soft" className="mt-2">
                  {edu.period}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default ExperiencePage;
