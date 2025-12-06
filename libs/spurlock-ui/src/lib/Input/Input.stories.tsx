import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Search, Mail, Tag } from 'lucide-react';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Inputs/Input',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const Error: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small size...',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large size...',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    prefixIcon: <Search className="h-5 w-5" />,
  },
};

export const WithSuffixIcon: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    suffixIcon: <Mail className="h-5 w-5" />,
  },
};

export const WithChips: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'React', variant: 'primary' as const },
      { id: '2', label: 'TypeScript', variant: 'secondary' as const },
    ]);

    return (
      <Input
        label="Skills"
        placeholder="Add a skill..."
        chips={chips}
        onChipRemove={(chipId) =>
          setChips(chips.filter((c) => c.id !== chipId))
        }
      />
    );
  },
};

export const WithChipsAndIcon: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'Frontend', variant: 'primary' as const },
      { id: '2', label: 'Backend', variant: 'secondary' as const },
    ]);

    return (
      <Input
        label="Tags"
        placeholder="Add tags..."
        prefixIcon={<Tag className="h-5 w-5" />}
        chips={chips}
        onChipRemove={(chipId) =>
          setChips(chips.filter((c) => c.id !== chipId))
        }
      />
    );
  },
};

export const InteractiveChips: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'React', variant: 'primary' as const },
      { id: '2', label: 'TypeScript', variant: 'secondary' as const },
      { id: '3', label: 'Tailwind', variant: 'outline' as const },
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        const newChip = {
          id: Date.now().toString(),
          label: inputValue.trim(),
          variant: 'default' as const,
        };
        setChips([...chips, newChip]);
        setInputValue('');
      }
    };

    return (
      <Input
        label="Add Skills (Press Enter to add)"
        placeholder="Type and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        chips={chips}
        onChipRemove={(chipId) =>
          setChips(chips.filter((c) => c.id !== chipId))
        }
      />
    );
  },
};

export const WithChipsSmall: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'React', variant: 'primary' as const },
      { id: '2', label: 'TS', variant: 'secondary' as const },
    ]);

    return (
      <Input
        label="Small Input with Chips"
        size="sm"
        placeholder="Add..."
        chips={chips}
        onChipRemove={(chipId) =>
          setChips(chips.filter((c) => c.id !== chipId))
        }
      />
    );
  },
};

export const WithChipsLarge: Story = {
  render: () => {
    const [chips, setChips] = useState([
      { id: '1', label: 'React', variant: 'primary' as const },
      { id: '2', label: 'TypeScript', variant: 'secondary' as const },
      { id: '3', label: 'Tailwind CSS', variant: 'outline' as const },
    ]);

    return (
      <Input
        label="Large Input with Chips"
        size="lg"
        placeholder="Add tags..."
        chips={chips}
        onChipRemove={(chipId) =>
          setChips(chips.filter((c) => c.id !== chipId))
        }
      />
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input label="Default" placeholder="Default state" />
      <Input
        label="With Helper Text"
        placeholder="Helper text"
        helperText="This is helpful information"
      />
      <Input
        label="Error State"
        placeholder="Error state"
        error
        errorMessage="This field is required"
      />
      <Input label="Disabled" placeholder="Disabled state" disabled />
    </div>
  ),
};
