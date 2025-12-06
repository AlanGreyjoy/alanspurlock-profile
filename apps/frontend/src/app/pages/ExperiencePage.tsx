import {
  Container,
  Section,
  Card,
  Badge,
  Heading,
  Text,
  Divider,
  Timeline,
  TimelineItem,
  Pills,
} from '@alanspurlock-profile/spurlock-ui';
import {
  Briefcase,
  Phone,
  Building,
  Rocket,
  Headphones,
  Zap,
  Anchor,
  Gamepad2,
  Rabbit,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
  highlights: string[];
  technologies?: string[];
  icon?: ReactNode;
}

const experiences: Experience[] = [
  {
    company: 'Goosehead Insurance Agency',
    role: 'Senior Software Engineer',
    period: 'June 2024 - Present',
    location: 'Westlake, Texas',
    highlights: [],
    icon: <Briefcase />,
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
    icon: <Phone />,
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
    icon: <Building />,
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
    icon: <Rocket />,
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
    icon: <Headphones />,
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
    icon: <Zap />,
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
    icon: <Anchor />,
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
    icon: <Gamepad2 />,
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
    icon: <Rabbit />,
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
    <div className="min-h-screen">
      {/* Header with gradient background */}
      <section className="py-8 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-accent)]/5" />
        <Container size="lg" className="relative z-10">
          <Heading
            as="h1"
            size="2xl"
            className="mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent"
          >
            Experience
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl leading-relaxed">
            Over 17 years of building software, from game engines to enterprise
            platforms. Here's my journey through tech.
          </Text>
        </Container>
      </section>

      {/* Timeline */}
      <Section>
        <Container size="lg">
          <Timeline>
            {experiences.map((exp, index) => (
              <TimelineItem
                key={`${exp.company}-${index}`}
                date={exp.period}
                icon={exp.icon}
              >
                <Card
                  variant="elevated"
                  padding="lg"
                  className="group-hover:shadow-2xl group-hover:border-[var(--color-primary)]/30 
                             transition-all duration-300 group-hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                    <div className="flex-1">
                      <Heading
                        as="h3"
                        size="lg"
                        className="mb-2 group-hover:text-[var(--color-primary)] transition-colors"
                      >
                        {exp.role}
                      </Heading>
                      <div className="flex flex-wrap items-center gap-2 text-[var(--color-text-muted)]">
                        <span className="font-semibold text-[var(--color-text)]">
                          {exp.company}
                        </span>
                        {exp.location && (
                          <>
                            <span className="text-[var(--color-border)]">
                              •
                            </span>
                            <span className="text-sm">{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {exp.description && (
                    <Text
                      variant="muted"
                      className="mb-6 leading-relaxed text-base"
                    >
                      {exp.description}
                    </Text>
                  )}

                  {exp.highlights.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 group/item"
                        >
                          <span className="text-[var(--color-primary)] mt-1.5 text-lg font-bold group-hover/item:scale-125 transition-transform">
                            •
                          </span>
                          <Text
                            size="sm"
                            variant="muted"
                            className="leading-relaxed"
                          >
                            {highlight}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="pt-6 border-t border-[var(--color-border-soft)]">
                      <Pills label="Technologies" items={exp.technologies} />
                    </div>
                  )}
                </Card>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Section>

      <Divider variant="soft" />

      {/* Education with enhanced design */}
      <Section>
        <Container size="lg">
          <div className="mb-10">
            <Heading as="h2" size="xl" className="mb-3">
              Education
            </Heading>
            <Text variant="muted" className="text-base">
              Academic foundation in software development and design
            </Text>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[var(--color-accent)]/30"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-primary)]/20 
                                flex items-center justify-center shrink-0"
                  >
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label="graduation"
                    >
                      🎓
                    </span>
                  </div>
                  <div className="flex-1">
                    <Heading as="h3" size="md" className="mb-2 leading-snug">
                      {edu.degree}
                    </Heading>
                    <Text variant="muted" className="mb-2 font-medium">
                      {edu.school}
                    </Text>
                    <Badge variant="outline" size="sm">
                      {edu.period}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bottom spacing */}
      <div className="h-16" />
    </div>
  );
}

export default ExperiencePage;
