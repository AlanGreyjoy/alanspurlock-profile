import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
  component: Code,
  title: 'Typography/Code',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['inline', 'block'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Inline: Story = {
  args: {
    children: 'npm install',
    variant: 'inline',
  },
};

export const InlineLarge: Story = {
  args: {
    children: 'const greeting = "Hello, World!";',
    variant: 'inline',
    size: 'md',
  },
};

export const BlockJavaScript: Story = {
  args: {
    children: `function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}`,
    variant: 'block',
    language: 'javascript',
  },
};

export const BlockTypeScript: Story = {
  args: {
    children: `interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];`,
    variant: 'block',
    language: 'typescript',
    size: 'sm',
  },
};

export const BlockBash: Story = {
  args: {
    children: `# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build`,
    variant: 'block',
    language: 'bash',
  },
};

export const BlockJSON: Story = {
  args: {
    children: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}`,
    variant: 'block',
    language: 'json',
  },
};

export const BlockCSS: Story = {
  args: {
    children: `.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #2563eb;
}`,
    variant: 'block',
    language: 'css',
  },
};

export const InlineWithinText: Story = {
  render: () => (
    <p className="text-base text-gray-700">
      To install the package, run <Code>npm install my-package</Code> in your
      terminal. You can then import it using{' '}
      <Code>import MyPackage from "my-package"</Code>.
    </p>
  ),
};

export const MixedSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Extra Small</p>
        <Code size="xs">console.log("Hello")</Code>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Small</p>
        <Code size="sm">console.log("Hello")</Code>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Medium</p>
        <Code size="md">console.log("Hello")</Code>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-gray-700">Large</p>
        <Code size="lg">console.log("Hello")</Code>
      </div>
    </div>
  ),
};
