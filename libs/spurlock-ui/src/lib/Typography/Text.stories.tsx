import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Typography/Text',
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'muted',
        'soft',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
      ],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
    italic: {
      control: 'boolean',
    },
    underline: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children:
      'The quick brown fox jumps over the lazy dog. This is a sample text to demonstrate the Text component.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="md">Medium text (md) - Default</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
      <Text size="2xl">2X large text (2xl)</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-3">
      <Text color="default">Default color text</Text>
      <Text color="muted">Muted color text</Text>
      <Text color="soft">Soft color text</Text>
      <Text color="primary">Primary color text</Text>
      <Text color="secondary">Secondary color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="warning">Warning color text</Text>
      <Text color="error">Error color text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-3">
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="rounded border border-gray-200 p-4">
        <Text align="left">
          Left aligned text. This is the default alignment for most text
          content.
        </Text>
      </div>
      <div className="rounded border border-gray-200 p-4">
        <Text align="center">
          Center aligned text. Often used for headings or special sections.
        </Text>
      </div>
      <div className="rounded border border-gray-200 p-4">
        <Text align="right">
          Right aligned text. Sometimes used for dates or metadata.
        </Text>
      </div>
      <div className="rounded border border-gray-200 p-4">
        <Text align="justify">
          Justified text. This alignment spreads the text evenly across the
          line, creating a clean edge on both sides. It is commonly used in
          newspapers and books.
        </Text>
      </div>
    </div>
  ),
};

export const StyleVariations: Story = {
  render: () => (
    <div className="space-y-3">
      <Text italic>This text is italicized</Text>
      <Text underline>This text is underlined</Text>
      <Text italic underline>
        This text is both italic and underlined
      </Text>
      <Text weight="bold" color="primary">
        Bold primary colored text
      </Text>
      <Text size="lg" weight="semibold" color="secondary">
        Large semibold secondary text
      </Text>
    </div>
  ),
};

export const LineClamp: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Line Clamp 1</p>
        <div className="rounded border border-gray-200 p-4">
          <Text lineClamp={1}>
            This is a very long text that will be truncated to a single line
            with an ellipsis. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </Text>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Line Clamp 2</p>
        <div className="rounded border border-gray-200 p-4">
          <Text lineClamp={2}>
            This is a very long text that will be truncated to two lines with an
            ellipsis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam.
          </Text>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Line Clamp 3</p>
        <div className="rounded border border-gray-200 p-4">
          <Text lineClamp={3}>
            This is a very long text that will be truncated to three lines with
            an ellipsis. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
        </div>
      </div>
    </div>
  ),
};

export const AsElements: Story = {
  render: () => (
    <div className="space-y-3">
      <Text as="p">This is rendered as a paragraph (p)</Text>
      <Text as="span">This is rendered as a span</Text>
      <Text as="div">This is rendered as a div</Text>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="demo-checkbox" />
        <Text as="label" htmlFor="demo-checkbox" className="cursor-pointer">
          This is rendered as a label
        </Text>
      </div>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <div className="space-y-3">
      <Text className="bg-yellow-100 p-2 rounded">
        Text with custom background and padding
      </Text>
      <Text className="border-l-4 border-blue-500 pl-4">
        Text with custom border
      </Text>
      <Text className="shadow-md p-4 rounded-lg bg-white">
        Text with shadow and rounded corners
      </Text>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-bold">Article Preview</h3>
        <div className="rounded border border-gray-200 p-4">
          <Text size="lg" weight="bold" className="mb-2">
            Understanding React Hooks
          </Text>
          <Text color="muted" size="sm" className="mb-3">
            Published on December 6, 2025 by John Doe
          </Text>
          <Text lineClamp={3}>
            React Hooks revolutionized the way we write React components by
            allowing us to use state and other React features without writing a
            class. In this comprehensive guide, we will explore the most
            commonly used hooks and learn how to create custom hooks for your
            specific needs. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </Text>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">Success Message</h3>
        <div className="rounded border border-green-200 bg-green-50 p-4">
          <Text color="success" weight="semibold" className="mb-1">
            Success!
          </Text>
          <Text size="sm">Your changes have been saved successfully.</Text>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-bold">Error Message</h3>
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <Text color="error" weight="semibold" className="mb-1">
            Error
          </Text>
          <Text size="sm">Failed to save changes. Please try again later.</Text>
        </div>
      </div>
    </div>
  ),
};
