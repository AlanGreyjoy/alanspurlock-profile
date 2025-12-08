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
  Select,
  Button,
  List,
  ListItem,
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
  Download,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState, useMemo } from 'react';
import {
  useExperiences,
  useEducation,
  useDownloadResume,
  useResumeDownloadStats,
  type ResumeType,
} from '../../services';

interface ExperienceWithIcon {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string | null;
  description?: string | null;
  highlights: string[];
  technologies: string[];
  icon?: ReactNode;
  order: number;
}

// Map icons to experiences
const iconMap: Record<string, ReactNode> = {
  'Goosehead Insurance Agency': <Briefcase />,
  'Sipharmony, LLC': <Phone />,
  CBRE: <Building />,
  'GalaxE.Solutions': <Rocket />,
  Integritek: <Headphones />,
  'PanelSense, LLC': <Zap />,
  'SeaDek Marine Products': <Anchor />,
  'SkillCheck Games': <Gamepad2 />,
  'The Dead Rabbits': <Rabbit />,
};

const resumeOptions = [
  { value: 'ai-optimized' as const, label: 'AI Optimized Resume' },
  { value: 'traditional' as const, label: 'Traditional Resume' },
];

export function ExperiencePage() {
  const [selectedResume, setSelectedResume] = useState<ResumeType | ''>('');

  // Fetch data using TanStack Query
  const {
    data: experiencesData,
    isLoading: isLoadingExperiences,
    error: experiencesError,
  } = useExperiences();

  const {
    data: educationData,
    isLoading: isLoadingEducation,
    error: educationError,
  } = useEducation();

  // Map icons to experiences
  const experiences = useMemo<ExperienceWithIcon[]>(() => {
    if (!experiencesData) return [];
    return experiencesData.map((exp) => ({
      ...exp,
      icon: iconMap[exp.company],
    }));
  }, [experiencesData]);

  // Resume download mutation
  const { mutate: downloadResume, isPending: isDownloading } =
    useDownloadResume();

  // Fetch download stats
  const { data: downloadStats } = useResumeDownloadStats();

  const isLoading = isLoadingExperiences || isLoadingEducation;
  const error = experiencesError || educationError;

  const handleResumeTypeChange = (value: string) => {
    setSelectedResume(value as ResumeType | '');
  };

  const handleDownload = () => {
    if (!selectedResume || isDownloading) return;

    downloadResume(
      { type: selectedResume },
      {
        onError: (error) => {
          console.error('Error downloading resume:', error);
          alert('Failed to download resume. Please try again.');
        },
      }
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container size="lg">
          <Card variant="elevated" padding="lg" className="text-center">
            <Heading as="h2" size="lg" className="mb-4">
              Loading...
            </Heading>
            <Text color="muted">Fetching experience and education data</Text>
          </Card>
        </Container>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container size="lg">
          <Card variant="elevated" padding="lg" className="text-center">
            <Heading as="h2" size="lg" className="mb-4 text-red-600">
              Error
            </Heading>
            <Text color="muted">
              {error instanceof Error ? error.message : 'Failed to load data'}
            </Text>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header with gradient background */}
      <section className="py-8 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-accent)]/5" />
        <Container size="lg" className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <Heading
                as="h1"
                size="2xl"
                className="mb-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent"
              >
                Experience
              </Heading>
              <Text
                size="lg"
                color="muted"
                className="max-w-2xl leading-relaxed"
              >
                Over 17 years of building software, from game engines to
                enterprise platforms. Here's my journey through tech.
              </Text>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Badge
                  variant="outline"
                  size="md"
                  className="px-4 py-2 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-primary)]/5 border-[var(--color-primary)]/20"
                >
                  <span className="font-semibold text-[var(--color-primary)]">
                    17+
                  </span>
                  <span className="ml-1.5 text-[var(--color-text-secondary)]">
                    Years Experience
                  </span>
                </Badge>

                <Badge
                  variant="outline"
                  size="md"
                  className="px-4 py-2 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 border-[var(--color-accent)]/20"
                >
                  <span className="font-semibold text-[var(--color-accent)]">
                    {experiences.length}
                  </span>
                  <span className="ml-1.5 text-[var(--color-text-secondary)]">
                    Companies
                  </span>
                </Badge>

                <Badge
                  variant="outline"
                  size="md"
                  className="px-4 py-2 bg-gradient-to-r from-[var(--color-success)]/10 to-[var(--color-success)]/5 border-[var(--color-success)]/20"
                >
                  <span className="font-semibold text-[var(--color-success)]">
                    {educationData?.length || 2}
                  </span>
                  <span className="ml-1.5 text-[var(--color-text-secondary)]">
                    Degrees
                  </span>
                </Badge>

                <Badge
                  variant="outline"
                  size="md"
                  className="px-4 py-2 bg-gradient-to-r from-[var(--color-info)]/10 to-[var(--color-info)]/5 border-[var(--color-info)]/20"
                >
                  <span className="font-semibold text-[var(--color-info)]">
                    {experiences.reduce(
                      (acc, exp) => acc + exp.technologies.length,
                      0
                    )}
                  </span>
                  <span className="ml-1.5 text-[var(--color-text-secondary)]">
                    Technologies
                  </span>
                </Badge>
              </div>
            </div>

            {/* Resume Download Section */}
            <Card
              variant="elevated"
              padding="lg"
              className="md:min-w-[350px] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <Heading as="h3" size="md">
                  Download Resume
                </Heading>
              </div>
              <Text size="sm" color="muted" className="mb-4">
                Choose your preferred format
              </Text>

              {/* Download Stats */}
              {downloadStats && (
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 border border-[var(--color-border-soft)]">
                  <div className="flex items-center justify-between mb-2">
                    <Text size="xs" weight="semibold" color="muted">
                      Total Downloads
                    </Text>
                    <Badge variant="outline" size="sm">
                      {downloadStats.total.toLocaleString()}
                    </Badge>
                  </div>
                  {downloadStats.total > 0 && (
                    <div className="flex gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--color-primary)]">●</span>
                        <Text size="xs" color="muted">
                          AI: {downloadStats.aiOptimized}
                        </Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[var(--color-accent)]">●</span>
                        <Text size="xs" color="muted">
                          Traditional: {downloadStats.traditional}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <Select
                  placeholder="Select resume version..."
                  options={resumeOptions}
                  value={selectedResume}
                  onValueChange={handleResumeTypeChange}
                  size="md"
                />
                <Button
                  onClick={handleDownload}
                  disabled={!selectedResume || isDownloading}
                  className="w-full"
                  size="md"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading ? 'Generating...' : 'Download PDF'}
                </Button>
              </div>
            </Card>
          </div>
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
                      color="muted"
                      className="mb-6 leading-relaxed text-base"
                    >
                      {exp.description}
                    </Text>
                  )}

                  {exp.highlights.length > 0 && (
                    <List
                      type="unordered"
                      withPadding={false}
                      spacing="md"
                      size="sm"
                      className="mb-6"
                    >
                      {exp.highlights.map((highlight, i) => (
                        <ListItem
                          key={i}
                          icon={
                            <span className="text-[var(--color-primary)] text-lg font-bold">
                              •
                            </span>
                          }
                        >
                          <Text
                            size="sm"
                            color="muted"
                            className="leading-relaxed"
                          >
                            {highlight}
                          </Text>
                        </ListItem>
                      ))}
                    </List>
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
            <Text color="muted" className="text-base">
              Academic foundation in software development and design
            </Text>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {educationData?.map((edu, index) => (
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
                    <Text color="muted" className="mb-2 font-medium">
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
