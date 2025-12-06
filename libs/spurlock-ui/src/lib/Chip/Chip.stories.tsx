import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Tag, User, Star } from 'lucide-react';

const meta: Meta<typeof Chip> = {
  component: Chip,
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'outline', 'accent'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    removable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Default Chip',
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Chip',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Chip',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Chip',
    variant: 'outline',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Chip',
    variant: 'accent',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Chip',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Chip',
    size: 'lg',
  },
};

export const Removable: Story = {
  args: {
    children: 'Removable Chip',
    removable: true,
    onRemove: () => alert('Chip removed!'),
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Chip with Icon',
    icon: <Tag className="h-3.5 w-3.5" />,
    variant: 'primary',
  },
};

export const WithIconAndRemove: Story = {
  args: {
    children: 'Chip with Icon',
    icon: <User className="h-3.5 w-3.5" />,
    removable: true,
    onRemove: () => alert('Chip removed!'),
    variant: 'secondary',
  },
};

export const Interactive: Story = {
  render: () => {
    const [chips, setChips] = React.useState([
      { id: '1', label: 'React', variant: 'primary' as const },
      { id: '2', label: 'TypeScript', variant: 'secondary' as const },
      { id: '3', label: 'Tailwind', variant: 'outline' as const },
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Chip
            key={chip.id}
            variant={chip.variant}
            removable
            onRemove={() => setChips(chips.filter((c) => c.id !== chip.id))}
          >
            {chip.label}
          </Chip>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="outline">Outline</Chip>
      <Chip variant="accent">Accent</Chip>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip icon={<Tag className="h-3.5 w-3.5" />} variant="primary">
        Tagged
      </Chip>
      <Chip icon={<User className="h-3.5 w-3.5" />} variant="secondary">
        User
      </Chip>
      <Chip icon={<Star className="h-3.5 w-3.5" />} variant="accent">
        Featured
      </Chip>
    </div>
  ),
};
