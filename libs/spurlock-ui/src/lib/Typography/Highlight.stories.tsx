import type { Meta, StoryObj } from '@storybook/react';
import { Highlight } from './Highlight';

const meta: Meta<typeof Highlight> = {
  component: Highlight,
  title: 'Typography/Highlight',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['yellow', 'blue', 'green', 'red', 'purple'],
    },
    caseSensitive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Highlight>;

export const Basic: Story = {
  args: {
    children: 'Highlight This, definitely THIS and also this!',
    highlight: 'this',
    variant: 'yellow',
  },
};

export const CaseSensitive: Story = {
  args: {
    children: 'Highlight This, definitely THIS and also this!',
    highlight: 'THIS',
    caseSensitive: true,
    variant: 'yellow',
  },
};

export const MultipleTerms: Story = {
  args: {
    children: 'React is a JavaScript library for building user interfaces.',
    highlight: ['React', 'JavaScript', 'interfaces'],
    variant: 'yellow',
  },
};

export const BlueVariant: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    highlight: ['quick', 'jumps', 'lazy'],
    variant: 'blue',
  },
};

export const GreenVariant: Story = {
  args: {
    children: 'Success! Your changes have been saved successfully.',
    highlight: ['Success', 'successfully'],
    variant: 'green',
  },
};

export const RedVariant: Story = {
  args: {
    children: 'Error: Failed to load the requested resource.',
    highlight: ['Error', 'Failed'],
    variant: 'red',
  },
};

export const PurpleVariant: Story = {
  args: {
    children: 'Important information that requires your attention.',
    highlight: ['Important', 'attention'],
    variant: 'purple',
  },
};

export const CodeExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 p-4">
        <p className="mb-2 text-sm font-mono text-gray-600">Demo.tsx</p>
        <pre className="overflow-x-auto rounded bg-gray-50 p-4 text-sm">
          <code>
            {`import { Highlight } from '@antine/core';

function Demo() {
  return (
    <Highlight highlight="this">
      Highlight This, definitely THIS and also this!
    </Highlight>
  );
}`}
          </code>
        </pre>
      </div>
      <div className="rounded-lg border border-gray-200 p-4">
        <p className="mb-2 text-sm font-medium text-gray-700">Output:</p>
        <Highlight highlight="this">
          Highlight This, definitely THIS and also this!
        </Highlight>
      </div>
    </div>
  ),
};

export const SearchResults: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold">Search results for "React"</h3>
      </div>
      <div className="space-y-2">
        <p className="text-gray-700">
          <Highlight highlight="React" variant="yellow">
            React is a free and open-source front-end JavaScript library for
            building user interfaces.
          </Highlight>
        </p>
        <p className="text-gray-700">
          <Highlight highlight="React" variant="yellow">
            React can be used as a base in the development of single-page or
            mobile applications.
          </Highlight>
        </p>
        <p className="text-gray-700">
          <Highlight highlight="React" variant="yellow">
            React Native is a framework for building native applications using
            React.
          </Highlight>
        </p>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
          Yellow (Default)
        </p>
        <Highlight highlight="highlight" variant="yellow">
          This is a yellow highlight example.
        </Highlight>
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
          Blue
        </p>
        <Highlight highlight="highlight" variant="blue">
          This is a blue highlight example.
        </Highlight>
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
          Green
        </p>
        <Highlight highlight="highlight" variant="green">
          This is a green highlight example.
        </Highlight>
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
          Red
        </p>
        <Highlight highlight="highlight" variant="red">
          This is a red highlight example.
        </Highlight>
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase text-gray-500">
          Purple
        </p>
        <Highlight highlight="highlight" variant="purple">
          This is a purple highlight example.
        </Highlight>
      </div>
    </div>
  ),
};
