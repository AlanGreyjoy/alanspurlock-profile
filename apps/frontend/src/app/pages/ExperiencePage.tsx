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
import { useState } from 'react';
import { EXPERIENCES, EDUCATION } from '../../lib/resume-data';

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

const experiences: Experience[] = EXPERIENCES.map((exp) => ({
  ...exp,
  icon: iconMap[exp.company],
}));

const education = EDUCATION;

const resumeOptions = [
  { value: 'ai-optimized', label: 'AI Optimized Resume' },
  { value: 'traditional', label: 'Traditional Resume' },
];

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function ExperiencePage() {
  const [selectedResume, setSelectedResume] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!selectedResume || isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/resume/download?type=${selectedResume}`
      );

      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download =
        selectedResume === 'ai-optimized'
          ? 'alan-spurlock-resume-ai-optimized.pdf'
          : 'alan-spurlock-resume-traditional.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

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
                variant="muted"
                className="max-w-2xl leading-relaxed"
              >
                Over 17 years of building software, from game engines to
                enterprise platforms. Here's my journey through tech.
              </Text>
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
              <Text size="sm" variant="muted" className="mb-4">
                Choose your preferred format
              </Text>
              <div className="space-y-3">
                <Select
                  placeholder="Select resume version..."
                  options={resumeOptions}
                  value={selectedResume}
                  onValueChange={setSelectedResume}
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
