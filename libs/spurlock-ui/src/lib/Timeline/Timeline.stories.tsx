import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from './Timeline';
import { Card } from '../Card/Card';
import { Badge } from '../Badge/Badge';
import {
  Briefcase,
  Rocket,
  Building,
  GraduationCap,
  Code,
  Zap,
  Star,
} from 'lucide-react';

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: 'Components/Timeline',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem date="June 2024 - Present">
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Senior Software Engineer</h3>
          <p className="text-[var(--color-text-muted)]">
            Goosehead Insurance Agency
          </p>
        </Card>
      </TimelineItem>

      <TimelineItem date="January 2022 - May 2024">
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Lead Developer</h3>
          <p className="text-[var(--color-text-muted)]">Tech Company Inc.</p>
        </Card>
      </TimelineItem>

      <TimelineItem date="2020 - 2021">
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Full Stack Developer</h3>
          <p className="text-[var(--color-text-muted)]">Startup Co.</p>
        </Card>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithLucideIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem date="June 2024 - Present" icon={<Briefcase />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Senior Software Engineer</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            Goosehead Insurance Agency
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              React
            </Badge>
            <Badge variant="secondary" size="sm">
              TypeScript
            </Badge>
            <Badge variant="secondary" size="sm">
              Node.js
            </Badge>
          </div>
        </Card>
      </TimelineItem>

      <TimelineItem date="January 2022 - May 2024" icon={<Rocket />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Lead Developer</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            Tech Company Inc.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              Python
            </Badge>
            <Badge variant="secondary" size="sm">
              Django
            </Badge>
          </div>
        </Card>
      </TimelineItem>

      <TimelineItem date="2020 - 2021" icon={<Zap />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Full Stack Developer</h3>
          <p className="text-[var(--color-text-muted)]">Startup Co.</p>
        </Card>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithEmojiIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem date="June 2024 - Present" icon="💼">
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Senior Software Engineer</h3>
          <p className="text-[var(--color-text-muted)]">
            Goosehead Insurance Agency
          </p>
        </Card>
      </TimelineItem>

      <TimelineItem date="January 2022 - May 2024" icon="🚀">
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Lead Developer</h3>
          <p className="text-[var(--color-text-muted)]">Tech Company Inc.</p>
        </Card>
      </TimelineItem>

      <TimelineItem date="2020 - 2021" icon="⚡">
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Full Stack Developer</h3>
          <p className="text-[var(--color-text-muted)]">Startup Co.</p>
        </Card>
      </TimelineItem>
    </Timeline>
  ),
};

export const YearOnly: Story = {
  render: () => (
    <Timeline>
      <TimelineItem year="2024" icon={<GraduationCap />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Master of Computer Science</h3>
          <p className="text-[var(--color-text-muted)]">University Name</p>
        </Card>
      </TimelineItem>

      <TimelineItem year="2020" icon={<Building />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">
            Bachelor of Computer Science
          </h3>
          <p className="text-[var(--color-text-muted)]">College Name</p>
        </Card>
      </TimelineItem>
    </Timeline>
  ),
};

export const NoDates: Story = {
  render: () => (
    <Timeline>
      <TimelineItem icon={<Code />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Mobile App Launch</h3>
          <p className="text-[var(--color-text-muted)]">
            Released version 1.0 of the mobile application
          </p>
        </Card>
      </TimelineItem>

      <TimelineItem icon={<Star />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Design System Created</h3>
          <p className="text-[var(--color-text-muted)]">
            Built a comprehensive design system
          </p>
        </Card>
      </TimelineItem>

      <TimelineItem icon={<Rocket />}>
        <Card variant="elevated" padding="lg">
          <h3 className="text-xl font-bold mb-2">Product Shipped</h3>
          <p className="text-[var(--color-text-muted)]">
            Delivered the final product to customers
          </p>
        </Card>
      </TimelineItem>
    </Timeline>
  ),
};
