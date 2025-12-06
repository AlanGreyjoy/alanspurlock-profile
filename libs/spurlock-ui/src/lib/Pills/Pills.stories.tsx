import type { Meta, StoryObj } from '@storybook/react';
import { Pills, Pill } from './Pills';
import { Card } from '../Card/Card';
import { Code, Database, Terminal, Zap, Rocket } from 'lucide-react';

const meta: Meta<typeof Pills> = {
  component: Pills,
  title: 'Components/Pills',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pills>;

export const Default: Story = {
  args: {
    items: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker'],
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Technologies',
    items: [
      'React',
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Docker',
      'Kubernetes',
      'AWS',
      'PostgreSQL',
    ],
  },
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <Pills
        label="Primary"
        variant="primary"
        items={['React', 'Vue', 'Angular']}
      />
      <Pills
        label="Secondary"
        variant="secondary"
        items={['Node.js', 'Express', 'Fastify']}
      />
      <Pills
        label="Accent"
        variant="accent"
        items={['MongoDB', 'PostgreSQL', 'Redis']}
      />
      <Pills
        label="Outline"
        variant="outline"
        items={['Docker', 'Kubernetes', 'AWS']}
      />
      <Pills
        label="Default"
        variant="default"
        items={['Git', 'GitHub', 'GitLab']}
      />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Pills
        label="Small (default)"
        size="sm"
        items={['React', 'TypeScript', 'Node.js']}
      />
      <Pills
        label="Medium"
        size="md"
        items={['React', 'TypeScript', 'Node.js']}
      />
    </div>
  ),
};

export const DifferentGaps: Story = {
  render: () => (
    <div className="space-y-6">
      <Pills
        label="Extra Small Gap"
        gap="xs"
        items={['React', 'TypeScript', 'Node.js', 'MongoDB']}
      />
      <Pills
        label="Small Gap (default)"
        gap="sm"
        items={['React', 'TypeScript', 'Node.js', 'MongoDB']}
      />
      <Pills
        label="Medium Gap"
        gap="md"
        items={['React', 'TypeScript', 'Node.js', 'MongoDB']}
      />
      <Pills
        label="Large Gap"
        gap="lg"
        items={['React', 'TypeScript', 'Node.js', 'MongoDB']}
      />
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    label: 'Technologies',
    items: [
      { label: 'React', icon: <Code className="w-3 h-3" /> },
      { label: 'Database', icon: <Database className="w-3 h-3" /> },
      { label: 'Terminal', icon: <Terminal className="w-3 h-3" /> },
      { label: 'Fast', icon: <Zap className="w-3 h-3" /> },
      { label: 'Deploy', icon: <Rocket className="w-3 h-3" /> },
    ],
  },
};

export const MixedVariants: Story = {
  args: {
    label: 'Tech Stack',
    items: [
      { label: 'React', variant: 'primary' },
      { label: 'TypeScript', variant: 'secondary' },
      { label: 'Node.js', variant: 'accent' },
      { label: 'MongoDB', variant: 'primary' },
      { label: 'Docker', variant: 'outline' },
    ],
  },
};

export const CustomChildren: Story = {
  render: () => (
    <Pills label="Custom Pills">
      <Pill variant="primary">Custom 1</Pill>
      <Pill variant="secondary" icon={<Code className="w-3 h-3" />}>
        With Icon
      </Pill>
      <Pill variant="accent">Custom 3</Pill>
      <Pill variant="outline">Custom 4</Pill>
    </Pills>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card variant="elevated" padding="lg" className="max-w-2xl">
      <h3 className="text-xl font-bold mb-4">Senior Software Engineer</h3>
      <p className="text-[var(--color-text-muted)] mb-4">
        Leading development of modern web applications with focus on performance
        and scalability.
      </p>
      <Pills
        label="Technologies"
        items={[
          'React',
          'TypeScript',
          'Node.js',
          'Express',
          'MongoDB',
          'PostgreSQL',
          'Docker',
          'Kubernetes',
          'AWS',
          'GitHub Actions',
        ]}
      />
    </Card>
  ),
};

export const MultipleSections: Story = {
  render: () => (
    <Card variant="elevated" padding="lg" className="max-w-2xl">
      <h3 className="text-xl font-bold mb-4">Full Stack Developer</h3>
      <p className="text-[var(--color-text-muted)] mb-6">
        Building scalable applications across the entire stack.
      </p>

      <div className="space-y-4">
        <Pills
          label="Frontend"
          variant="primary"
          items={['React', 'Vue', 'TypeScript', 'Tailwind CSS']}
        />
        <Pills
          label="Backend"
          variant="secondary"
          items={['Node.js', 'Python', 'Express', 'FastAPI']}
        />
        <Pills
          label="Database"
          variant="accent"
          items={['MongoDB', 'PostgreSQL', 'Redis']}
        />
        <Pills
          label="DevOps"
          variant="outline"
          items={['Docker', 'Kubernetes', 'AWS', 'GitHub Actions']}
        />
      </div>
    </Card>
  ),
};

export const CustomRender: Story = {
  args: {
    label: 'Custom Rendered Pills',
    items: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    renderItem: (item, index) => (
      <Pill key={index} variant={index % 2 === 0 ? 'primary' : 'secondary'}>
        #{index + 1} {typeof item === 'string' ? item : item.label}
      </Pill>
    ),
  },
};

export const LongList: Story = {
  args: {
    label: 'All Technologies',
    items: [
      'JavaScript',
      'TypeScript',
      'React',
      'Vue',
      'Angular',
      'Svelte',
      'Node.js',
      'Express',
      'Fastify',
      'NestJS',
      'Python',
      'Django',
      'Flask',
      'FastAPI',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'Azure',
      'GCP',
      'GitHub Actions',
      'GitLab CI',
      'Jenkins',
    ],
  },
};

export const Empty: Story = {
  args: {
    label: 'No Technologies',
    items: [],
  },
};
