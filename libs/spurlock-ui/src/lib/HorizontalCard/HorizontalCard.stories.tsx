import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalCard } from './HorizontalCard';

const meta: Meta<typeof HorizontalCard> = {
  component: HorizontalCard,
  title: 'Components/HorizontalCard',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'feature'],
    },
    hoverable: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HorizontalCard>;

export const Default: Story = {
  args: {
    imageSrc:
      'https://via.placeholder.com/600x400/00d1b2/ffffff?text=Project+Image',
    imageAlt: 'Project screenshot',
    title: 'Project Title',
    subtitle: 'Project Subtitle',
    description:
      'This is a description of the project. It provides context about what the project does and why it matters.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    footer: 'Learn More →',
    variant: 'feature',
  },
};

export const HotasHelperExample: Story = {
  args: {
    imageSrc: '/images/HotashelperReact-12-06-2025_12_47_AM.png',
    imageAlt: 'HotasHelper application screenshot',
    title: 'HotasHelper',
    subtitle: 'Visual HOTAS Control Binding Mapper',
    description:
      'A React/Vite application that uses Three.js and React Flow to visually map HOTAS control bindings for games like Star Citizen, Star Wars Squadrons, and more. An intuitive 3D interface that makes complex control mapping feel natural.',
    tags: ['React', 'Vite', 'Three.js', 'React Flow'],
    footer: 'Learn More →',
    variant: 'feature',
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Text-Only Card',
    subtitle: 'No image needed',
    description:
      'This card demonstrates the horizontal card component without an image. The content section takes up the full width.',
    tags: ['Design', 'UI', 'Components'],
    footer: 'View Details →',
    variant: 'feature',
  },
};

export const NoHoverEffect: Story = {
  args: {
    imageSrc:
      'https://via.placeholder.com/600x400/ff0055/ffffff?text=Static+Card',
    imageAlt: 'Static card example',
    title: 'Static Card',
    subtitle: 'No hover effects',
    description:
      'This card has hover effects disabled. It remains static when the user hovers over it.',
    tags: ['Static', 'No Animation'],
    hoverable: false,
    variant: 'default',
  },
};

export const MinimalContent: Story = {
  args: {
    imageSrc: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Minimal',
    imageAlt: 'Minimal card',
    title: 'Minimal Card',
    description: 'A card with just a title and description.',
    variant: 'feature',
  },
};

export const CustomBackground: Story = {
  args: {
    imageSrc:
      'https://via.placeholder.com/600x400/00d1b2/ffffff?text=Custom+BG',
    imageAlt: 'Custom background',
    title: 'Custom Background',
    subtitle: 'Different gradient',
    description:
      'This card uses a custom background gradient for the image container.',
    tags: ['Custom', 'Gradient'],
    footer: 'Explore →',
    imageBackground: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    variant: 'feature',
  },
};

export const LongDescription: Story = {
  args: {
    imageSrc:
      'https://via.placeholder.com/600x400/10b981/ffffff?text=Long+Text',
    imageAlt: 'Card with long description',
    title: 'Card with Long Description',
    subtitle: 'Demonstrates text truncation',
    description:
      "This is a very long description that demonstrates how the card handles overflow text. The text is clamped to 3 lines using the line-clamp-3 utility class. Any additional text beyond three lines will be hidden with an ellipsis. This ensures the card maintains a consistent height and doesn't grow too large. You can customize this behavior by adjusting the line-clamp value or removing it entirely.",
    tags: ['Long', 'Text', 'Example', 'Truncation'],
    footer: 'Read Full Story →',
    variant: 'feature',
  },
};

export const InLink: Story = {
  render: (args) => (
    <a href="#" className="block group">
      <HorizontalCard {...args} />
    </a>
  ),
  args: {
    imageSrc:
      'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Clickable',
    imageAlt: 'Clickable card',
    title: 'Clickable Card',
    subtitle: 'Wrapped in a link',
    description:
      'This entire card is wrapped in a link element, making it fully clickable. The group hover effects work across the entire card.',
    tags: ['Interactive', 'Link', 'Clickable'],
    footer: 'Click Anywhere →',
    variant: 'feature',
  },
};

