import {
  Container,
  Section,
  Card,
  Badge,
  Heading,
  Text,
  Divider,
  Link as UILink,
} from '@alanspurlock-profile/spurlock-ui';

interface Project {
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features?: string[];
  status: 'active' | 'completed' | 'archived';
  type: 'personal' | 'startup' | 'contract';
}

const projects: Project[] = [
  {
    name: 'Sipharmony',
    description: 'Complete UCaaS/CPaaS platform built from scratch',
    longDescription: 'A full-scale, multi-hosted, and geo-location failover PBX system. Single handedly architected and developed a complete unified communications platform.',
    technologies: ['React', 'Vite', 'Sip.js', 'MongoDB', 'Supabase', 'Asterisk 20', 'RTP Engine', 'Coturn', 'Kamailio', 'Python', 'Node.js', 'Docker', 'CircleCI'],
    features: [
      'SMS/MMS messaging',
      'Public facing REST API',
      'Skill Based Routing',
      'AI services integration',
      'AI assisted power dialer',
      'Multi-tenant architecture',
      'Geo-location failover',
    ],
    status: 'active',
    type: 'startup',
  },
  {
    name: 'RhinoDek',
    description: 'C#/Winforms plugin for Rhino3D',
    longDescription: 'A productivity plugin that automated setup tasks for manufacturing projects, saving drafters over 45 minutes per project.',
    technologies: ['C#', 'Winforms', 'Rhino3D'],
    features: [
      'Auto color code setting',
      'DXF attribute application',
      'Auto-select correct layout',
      'Scale management',
    ],
    status: 'completed',
    type: 'contract',
  },
  {
    name: 'MMORPG Server',
    description: 'Authoritative game server for online multiplayer',
    longDescription: 'An authoritative MMORPG server using TCP I/O to translate player positions and manage inventories.',
    technologies: ['Node.js', 'Postgres', 'TCP/IP', 'Unity3D'],
    features: [
      'Real-time position sync (XYZ)',
      'Inventory management',
      'Auction House system',
      'Authoritative server architecture',
    ],
    status: 'archived',
    type: 'personal',
  },
  {
    name: 'AutoInput Bot & SigmaBot',
    description: 'Manufacturing automation tools',
    longDescription: 'Desktop programs to automate different aspects of the manufacturing process at SeaDek Marine Products.',
    technologies: ['C#', 'Winforms', 'WPF', 'SigmaNest'],
    features: [
      'Automated data entry',
      'SigmaNest tooling automation',
      'Process streamlining',
    ],
    status: 'completed',
    type: 'contract',
  },
];

const statusColors = {
  active: 'primary' as const,
  completed: 'secondary' as const,
  archived: 'default' as const,
};

const typeLabels = {
  personal: '🎮 Personal',
  startup: '🚀 Startup',
  contract: '💼 Contract',
};

export function ProjectsPage() {
  return (
    <div>
      {/* Header */}
      <section className="py-12 md:py-16">
        <Container size="lg">
          <Heading as="h1" size="2xl" className="mb-4">
            Projects
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl">
            A selection of projects I've built over the years — from VoIP platforms 
            to game servers to manufacturing automation tools.
          </Text>
        </Container>
      </section>

      <Divider variant="soft" spacing="sm" />

      {/* Featured Project */}
      <Section title="Featured Project">
        <Container size="lg">
          <Card variant="elevated" padding="lg" className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary-light)] rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="primary">Active</Badge>
                <Badge variant="accent">🚀 Startup</Badge>
              </div>
              
              <Heading as="h2" size="xl" className="mb-3">
                Sipharmony
              </Heading>
              
              <Text variant="muted" className="mb-6 max-w-2xl leading-relaxed">
                A full-scale, multi-hosted, and geo-location failover PBX system. 
                Single handedly architected and developed a complete unified 
                communications platform with all the bells and whistles of other 
                leading providers.
              </Text>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <Heading as="h4" size="sm" className="mb-3">
                    Key Features
                  </Heading>
                  <ul className="space-y-2">
                    {projects[0].features?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[var(--color-primary)]">✓</span>
                        <Text size="sm" variant="muted">{feature}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Heading as="h4" size="sm" className="mb-3">
                    Technology Partners
                  </Heading>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Text size="sm" variant="muted">Voip Innovations (now Sangoma)</Text>
                    </li>
                    <li className="flex items-center gap-2">
                      <Text size="sm" variant="muted">Bandwidth</Text>
                    </li>
                    <li className="flex items-center gap-2">
                      <Text size="sm" variant="muted">VoIP.ms</Text>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border-soft)]">
                {projects[0].technologies.map((tech) => (
                  <Badge key={tech} variant="default" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      <Divider variant="soft" />

      {/* Other Projects */}
      <Section title="Other Projects">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.slice(1).map((project) => (
              <Card key={project.name} variant="default" padding="lg" className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={statusColors[project.status]} size="sm">
                    {project.status}
                  </Badge>
                  <Text size="xs" variant="soft">
                    {typeLabels[project.type]}
                  </Text>
                </div>

                <Heading as="h3" size="md" className="mb-2">
                  {project.name}
                </Heading>

                <Text size="sm" variant="muted" className="mb-4 flex-grow">
                  {project.longDescription || project.description}
                </Text>

                {project.features && project.features.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[var(--color-primary)] text-xs">•</span>
                        <Text size="xs" variant="soft">{feature}</Text>
                      </li>
                    ))}
                    {project.features.length > 3 && (
                      <li>
                        <Text size="xs" variant="soft">
                          +{project.features.length - 3} more features
                        </Text>
                      </li>
                    )}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border-soft)]">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="default" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 5 && (
                    <Badge variant="outline" size="sm">
                      +{project.technologies.length - 5}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Divider variant="soft" />

      {/* Game Dev */}
      <Section title="Game Development" subtitle="My roots in software development">
        <Container size="lg">
          <Card variant="default" padding="lg">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Heading as="h3" size="lg" className="mb-4">
                  The Dead Rabbits Studio
                </Heading>
                <Text variant="muted" className="mb-4 leading-relaxed">
                  Founded a custom software solutions and game dev studio. 
                  Consulted and wrote Unity3D C# scripts for various gaming 
                  companies and projects over 7 years.
                </Text>
                <Text variant="muted" className="leading-relaxed">
                  At SkillCheck Games, I led code reviews, designed an auction house 
                  system, and built an authoritative MMORPG server handling real-time 
                  player positions and inventories.
                </Text>
              </div>
              <div className="md:w-64">
                <div className="bg-[var(--color-surface)] rounded-lg p-4">
                  <Heading as="h4" size="sm" className="mb-3">
                    Technologies
                  </Heading>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Unity3D</Badge>
                    <Badge variant="secondary">C#</Badge>
                    <Badge variant="default">Node.js</Badge>
                    <Badge variant="default">Postgres</Badge>
                    <Badge variant="default">TCP/IP</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </div>
  );
}

export default ProjectsPage;
