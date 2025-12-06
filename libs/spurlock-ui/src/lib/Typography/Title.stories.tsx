import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta: Meta<typeof Title> = {
  component: Title,
  title: 'Typography/Title',
  tags: ['autodocs'],
  argTypes: {
    order: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    textWrap: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    children: 'Default Title (h1)',
  },
};

export const SemanticOrders: Story = {
  render: () => (
    <div className="space-y-4">
      <Title order={1}>H1 heading - Largest semantic heading</Title>
      <Title order={2}>H2 heading - Second level heading</Title>
      <Title order={3}>H3 heading - Third level heading</Title>
      <Title order={4}>H4 heading - Fourth level heading</Title>
      <Title order={5}>H5 heading - Fifth level heading</Title>
      <Title order={6}>H6 heading - Sixth level heading</Title>
    </div>
  ),
};

export const OrderWithSemanticSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Title order={3} size="h1">
        H3 heading with h1 font-size
      </Title>
      <Title order={1} size="h4">
        H1 heading with h4 font-size
      </Title>
      <Title order={2} size="h6">
        H2 heading with h6 font-size
      </Title>
      <Title order={6} size="h1">
        H6 heading with h1 font-size
      </Title>
    </div>
  ),
};

export const WithTShirtSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Title size="xs">Title with xs size</Title>
      <Title size="sm">Title with sm size</Title>
      <Title size="md">Title with md size</Title>
      <Title size="lg">Title with lg size</Title>
      <Title size="xl">Title with xl size</Title>
      <Title size="2xl">Title with 2xl size</Title>
      <Title size="3xl">Title with 3xl size</Title>
    </div>
  ),
};

export const WithPixelSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Title size={12}>Title with 12px size</Title>
      <Title size={16}>Title with 16px size</Title>
      <Title size={24}>Title with 24px size</Title>
      <Title size={32}>Title with 32px size</Title>
      <Title size={48}>Title with 48px size</Title>
      <Title size={64}>Title with 64px size</Title>
    </div>
  ),
};

export const TextWrapEnabled: Story = {
  render: () => (
    <div className="max-w-md rounded border border-gray-200 p-4">
      <Title textWrap={true}>
        This is a very long title that will wrap to multiple lines when it
        exceeds the container width. The text will naturally flow to the next
        line.
      </Title>
    </div>
  ),
};

export const TextWrapDisabled: Story = {
  render: () => (
    <div className="max-w-md rounded border border-gray-200 p-4">
      <Title textWrap={false}>
        This is a very long title that will be truncated with ellipsis when it
        exceeds the container width instead of wrapping to multiple lines.
      </Title>
    </div>
  ),
};

export const MixedExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Semantic HTML with Custom Size
        </p>
        <Title order={3} size="h1">
          H3 heading with h1 font-size
        </Title>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          H1 with Smaller Size
        </p>
        <Title size="h4">H1 heading with h4 font-size</Title>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Pixel-based Sizing
        </p>
        <Title size={16}>H1 heading with 16px size</Title>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          T-shirt Size
        </p>
        <Title size="xs">H1 heading with xs size</Title>
      </div>
    </div>
  ),
};

export const ResponsiveHeadings: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="rounded border border-gray-200 p-4">
        <Title order={1}>
          This h1 heading is responsive and adjusts its size based on screen
          width
        </Title>
      </div>
      <div className="rounded border border-gray-200 p-4">
        <Title order={2}>
          This h2 heading also adapts to different viewport sizes
        </Title>
      </div>
      <div className="rounded border border-gray-200 p-4">
        <Title order={3}>
          Resize your browser to see the responsive typography in action
        </Title>
      </div>
    </div>
  ),
};

export const PageHeadings: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Title order={1} className="mb-4">
          Getting Started with React
        </Title>
        <p className="text-gray-600">
          React is a JavaScript library for building user interfaces. Learn how
          to get started with React in this comprehensive guide.
        </p>
      </div>

      <div>
        <Title order={2} className="mb-3">
          Installation
        </Title>
        <p className="text-gray-600">
          You can install React using npm or yarn package managers.
        </p>

        <div className="mt-4">
          <Title order={3} className="mb-2">
            Using npm
          </Title>
          <pre className="rounded bg-gray-100 p-3 text-sm">
            npm install react react-dom
          </pre>
        </div>

        <div className="mt-4">
          <Title order={3} className="mb-2">
            Using yarn
          </Title>
          <pre className="rounded bg-gray-100 p-3 text-sm">
            yarn add react react-dom
          </pre>
        </div>
      </div>

      <div>
        <Title order={2} className="mb-3">
          Creating Your First Component
        </Title>
        <Title order={3} className="mb-2">
          Functional Components
        </Title>
        <p className="text-gray-600">
          Modern React applications primarily use functional components with
          hooks.
        </p>
      </div>
    </div>
  ),
};

export const WithCustomClassName: Story = {
  render: () => (
    <div className="space-y-4">
      <Title className="text-blue-600">Title with custom color</Title>
      <Title className="uppercase">Uppercase title</Title>
      <Title className="tracking-widest">Title with wide tracking</Title>
      <Title className="text-center">Centered title</Title>
      <Title className="bg-yellow-100 p-4 rounded-lg">
        Title with background
      </Title>
    </div>
  ),
};
