import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline', 'feature'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    border: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-bold mb-2">Default Card</h3>
        <p>Standard surface color and soft border.</p>
      </div>
    ),
    variant: 'default',
  },
};

export const Elevated: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-bold mb-2">Elevated Card</h3>
        <p>Raised surface with shadow.</p>
      </div>
    ),
    variant: 'elevated',
  },
};

export const Outline: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-bold mb-2">Outline Card</h3>
        <p>Transparent background with border.</p>
      </div>
    ),
    variant: 'outline',
  },
};

export const Feature: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-xl font-bold mb-2">Feature Card</h3>
        <p>
          Matches the home page design feel with hover effects and large
          padding.
        </p>
      </div>
    ),
    variant: 'feature',
    padding: 'xl',
  },
};

export const JobCardExample: Story = {
  render: (args) => (
    <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card {...args} className="max-w-md w-full">
        <div className="h-48 bg-gray-50 rounded-xl mb-6 flex items-center justify-center">
          <span className="text-4xl">🏢</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Company Name</h3>
        <p className="text-gray-500 mb-4 font-medium">Senior Developer</p>
        <p className="text-gray-600 leading-relaxed">
          Led the development of scalable web applications using React and
          Node.js. Improved performance by 40% and reduced technical debt.
        </p>
      </Card>
    </div>
  ),
  args: {
    variant: 'feature',
    padding: 'xl',
  },
};

export const WithPrimaryBorder: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-xl font-bold mb-2">Primary Border Card</h3>
        <p className="text-gray-600">
          This card has the primary border flag enabled.
        </p>
      </div>
    ),
    variant: 'feature',
    padding: 'lg',
    border: true,
  },
};

export const WithImage: Story = {
  render: (args) => (
    <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card
        {...args}
        className="max-w-md w-full overflow-hidden"
        padding="none"
      >
        <img
          src="https://via.placeholder.com/600x400/00d1b2/ffffff?text=Card+Image"
          alt="Example card image"
          className="w-full max-h-96 object-contain block"
        />
        <div className="p-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Card with Image
          </h3>
          <p className="text-gray-500 mb-4 font-medium">Image Example</p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Cards can include images to showcase projects, products, or visual
            content. Images should be full width with no padding, extending to
            the card edges. Use object-cover for full coverage or object-contain
            to preserve aspect ratio.
          </p>
          <div className="flex flex-wrap gap-2">
            {['React', 'Vite', 'Three.js'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  ),
  args: {
    variant: 'feature',
  },
};

export const WithImageContain: Story = {
  render: (args) => (
    <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card
        {...args}
        className="max-w-md w-full overflow-hidden"
        padding="none"
      >
        <div className="w-full max-h-96 bg-gray-50 overflow-hidden flex items-center justify-center">
          <img
            src="https://via.placeholder.com/400x600/ff0055/ffffff?text=Portrait+Image"
            alt="Example card image with contain"
            className="w-full max-h-96 object-contain block"
          />
        </div>
        <div className="p-10">
          <h3 className="text-xl font-bold mb-2">Image with Object-Contain</h3>
          <p className="text-gray-600">
            Using object-contain preserves the full image without cropping,
            useful for screenshots or logos. The image extends full width with
            no padding.
          </p>
        </div>
      </Card>
    </div>
  ),
  args: {
    variant: 'feature',
  },
};
