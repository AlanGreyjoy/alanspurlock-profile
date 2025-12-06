import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta: Meta<typeof List> = {
  component: List,
  title: 'Typography/List',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['ordered', 'unordered'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    withPadding: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Unordered: Story = {
  args: {
    type: 'unordered',
    withPadding: true,
    children: (
      <>
        <List.Item>Clone or download repository from GitHub</List.Item>
        <List.Item>Install dependencies with yarn</List.Item>
        <List.Item>To start development server run npm start command</List.Item>
        <List.Item>
          Run tests to make sure your changes do not break the build
        </List.Item>
        <List.Item>Submit a pull request once you are done</List.Item>
      </>
    ),
  },
};

export const Ordered: Story = {
  args: {
    type: 'ordered',
    withPadding: true,
    children: (
      <>
        <List.Item>Clone or download repository from GitHub</List.Item>
        <List.Item>Install dependencies with yarn</List.Item>
        <List.Item>To start development server run npm start command</List.Item>
        <List.Item>
          Run tests to make sure your changes do not break the build
        </List.Item>
        <List.Item>Submit a pull request once you are done</List.Item>
      </>
    ),
  },
};

export const WithoutPadding: Story = {
  args: {
    type: 'unordered',
    withPadding: false,
    children: (
      <>
        <List.Item>First item</List.Item>
        <List.Item>Second item</List.Item>
        <List.Item>Third item</List.Item>
      </>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    type: 'unordered',
    size: 'sm',
    withPadding: true,
    children: (
      <>
        <List.Item>Small text item one</List.Item>
        <List.Item>Small text item two</List.Item>
        <List.Item>Small text item three</List.Item>
      </>
    ),
  },
};

export const LargeSize: Story = {
  args: {
    type: 'unordered',
    size: 'lg',
    withPadding: true,
    children: (
      <>
        <List.Item>Large text item one</List.Item>
        <List.Item>Large text item two</List.Item>
        <List.Item>Large text item three</List.Item>
      </>
    ),
  },
};

export const TightSpacing: Story = {
  args: {
    type: 'unordered',
    spacing: 'xs',
    withPadding: true,
    children: (
      <>
        <List.Item>Item with extra tight spacing</List.Item>
        <List.Item>Item with extra tight spacing</List.Item>
        <List.Item>Item with extra tight spacing</List.Item>
        <List.Item>Item with extra tight spacing</List.Item>
      </>
    ),
  },
};

export const LooseSpacing: Story = {
  args: {
    type: 'unordered',
    spacing: 'lg',
    withPadding: true,
    children: (
      <>
        <List.Item>Item with loose spacing</List.Item>
        <List.Item>Item with loose spacing</List.Item>
        <List.Item>Item with loose spacing</List.Item>
      </>
    ),
  },
};

export const NestedLists: Story = {
  render: () => (
    <List type="unordered" withPadding>
      <List.Item>
        Frontend Technologies
        <List type="unordered" withPadding spacing="xs" className="mt-1">
          <List.Item>React</List.Item>
          <List.Item>TypeScript</List.Item>
          <List.Item>Tailwind CSS</List.Item>
        </List>
      </List.Item>
      <List.Item>
        Backend Technologies
        <List type="unordered" withPadding spacing="xs" className="mt-1">
          <List.Item>Node.js</List.Item>
          <List.Item>Express</List.Item>
          <List.Item>PostgreSQL</List.Item>
        </List>
      </List.Item>
      <List.Item>
        DevOps Tools
        <List type="unordered" withPadding spacing="xs" className="mt-1">
          <List.Item>Docker</List.Item>
          <List.Item>GitHub Actions</List.Item>
          <List.Item>AWS</List.Item>
        </List>
      </List.Item>
    </List>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold">With Checkmarks</h3>
        <List type="unordered" withPadding={false}>
          <List.Item
            icon={
              <svg
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          >
            Task completed successfully
          </List.Item>
          <List.Item
            icon={
              <svg
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          >
            All tests passed
          </List.Item>
          <List.Item
            icon={
              <svg
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          >
            Build deployed to production
          </List.Item>
        </List>
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold">With Warning Icons</h3>
        <List type="unordered" withPadding={false}>
          <List.Item
            icon={
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          >
            Warning: This action cannot be undone
          </List.Item>
          <List.Item
            icon={
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
          >
            Deprecated feature - will be removed in v2.0
          </List.Item>
        </List>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Extra Small
        </p>
        <List type="unordered" size="xs" withPadding>
          <List.Item>Extra small list item</List.Item>
          <List.Item>Extra small list item</List.Item>
        </List>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Small
        </p>
        <List type="unordered" size="sm" withPadding>
          <List.Item>Small list item</List.Item>
          <List.Item>Small list item</List.Item>
        </List>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Medium (Default)
        </p>
        <List type="unordered" size="md" withPadding>
          <List.Item>Medium list item</List.Item>
          <List.Item>Medium list item</List.Item>
        </List>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase text-gray-500">
          Large
        </p>
        <List type="unordered" size="lg" withPadding>
          <List.Item>Large list item</List.Item>
          <List.Item>Large list item</List.Item>
        </List>
      </div>
    </div>
  ),
};
