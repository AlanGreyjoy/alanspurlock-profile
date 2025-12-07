import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Inputs/Select',
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
type Story = StoryObj<typeof Select>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'next', label: 'Next.js' },
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
];

export const Default: Story = {
  args: {
    placeholder: 'Select an option...',
    options: frameworkOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Choose Framework',
    placeholder: 'Select your framework...',
    options: frameworkOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select your country...',
    helperText: 'Choose the country where you reside',
    options: countryOptions,
  },
};

export const Error: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework...',
    error: true,
    errorMessage: 'Please select a framework',
    options: frameworkOptions,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Select',
    size: 'sm',
    placeholder: 'Small size...',
    options: frameworkOptions,
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Select',
    size: 'md',
    placeholder: 'Medium size...',
    options: frameworkOptions,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Select',
    size: 'lg',
    placeholder: 'Large size...',
    options: frameworkOptions,
  },
};

export const GroupedOptions: Story = {
  args: {
    label: 'Food Category',
    placeholder: 'Select a food...',
    options: groupedOptions,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Framework',
    placeholder: 'Select a framework...',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue', disabled: true },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte', disabled: true },
      { value: 'next', label: 'Next.js' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    placeholder: 'This is disabled...',
    options: frameworkOptions,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="space-y-4">
        <Select
          label="Controlled Select"
          placeholder="Select a framework..."
          options={frameworkOptions}
          value={value}
          onValueChange={setValue}
        />
        <div className="text-sm text-gray-600">
          Selected value: <strong>{value || 'None'}</strong>
        </div>
      </div>
    );
  },
};

export const LongList: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select your country...',
    helperText: 'Scroll to see more options',
    options: countryOptions,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Select
        label="Small Select"
        size="sm"
        placeholder="Small size..."
        options={frameworkOptions}
      />
      <Select
        label="Medium Select"
        size="md"
        placeholder="Medium size..."
        options={frameworkOptions}
      />
      <Select
        label="Large Select"
        size="lg"
        placeholder="Large size..."
        options={frameworkOptions}
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Select
        label="Default"
        placeholder="Default state"
        options={frameworkOptions}
      />
      <Select
        label="With Helper Text"
        placeholder="Helper text"
        helperText="This is helpful information"
        options={frameworkOptions}
      />
      <Select
        label="Error State"
        placeholder="Error state"
        error
        errorMessage="This field is required"
        options={frameworkOptions}
      />
      <Select
        label="Disabled"
        placeholder="Disabled state"
        disabled
        options={frameworkOptions}
      />
    </div>
  ),
};
