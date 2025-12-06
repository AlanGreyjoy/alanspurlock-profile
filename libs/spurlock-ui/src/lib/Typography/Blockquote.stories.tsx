import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
  component: Blockquote,
  title: 'Typography/Blockquote',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'default', 'warning', 'success'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Info: Story = {
  args: {
    children:
      'Life is like an npm install – you never know what you are going to get.',
    attribution: 'Forrest Gump',
    variant: 'info',
  },
};

export const Default: Story = {
  args: {
    children: 'The best way to predict the future is to invent it.',
    attribution: 'Alan Kay',
    variant: 'default',
  },
};

export const Warning: Story = {
  args: {
    children:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    attribution: 'Martin Fowler',
    variant: 'warning',
  },
};

export const Success: Story = {
  args: {
    children: 'First, solve the problem. Then, write the code.',
    attribution: 'John Johnson',
    variant: 'success',
  },
};

export const WithoutAttribution: Story = {
  args: {
    children: "Code is like humor. When you have to explain it, it's bad.",
    variant: 'info',
  },
};

export const LongQuote: Story = {
  args: {
    children:
      "Programming isn't about what you know; it's about what you can figure out. It's about being resourceful, persistent, and creative in the face of challenges. Every bug is an opportunity to learn, every feature is a chance to innovate, and every line of code is a step forward in your journey as a developer.",
    attribution: 'Anonymous Developer',
    variant: 'info',
  },
};

export const MultiParagraph: Story = {
  args: {
    children: (
      <>
        <p className="mb-3">
          There are two ways to write error-free programs; only the third one
          works.
        </p>
        <p>
          The first rule of functions is that they should be small. The second
          rule of functions is that they should be smaller than that.
        </p>
      </>
    ),
    attribution: 'Robert C. Martin',
    variant: 'default',
  },
};

export const CustomIcon: Story = {
  args: {
    children: 'Creativity is intelligence having fun.',
    attribution: 'Albert Einstein',
    variant: 'success',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
};
