import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Components/Avatar',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'The shape variant of the avatar',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The size of the avatar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'User avatar',
    variant: 'circle',
    size: 'md',
  },
};

export const Circle: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Circle avatar',
    variant: 'circle',
    size: 'lg',
  },
};

export const Square: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Square avatar',
    variant: 'square',
    size: 'lg',
  },
};

export const Rounded: Story = {
  args: {
    src: 'https://i.pravatar.cc/300',
    alt: 'Rounded avatar',
    variant: 'rounded',
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Extra small avatar"
        size="xs"
        variant="circle"
      />
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Small avatar"
        size="sm"
        variant="circle"
      />
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Medium avatar"
        size="md"
        variant="circle"
      />
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Large avatar"
        size="lg"
        variant="circle"
      />
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Extra large avatar"
        size="xl"
        variant="circle"
      />
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="2X large avatar"
        size="2xl"
        variant="circle"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Circle variant"
        size="xl"
        variant="circle"
      />
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Rounded variant"
        size="xl"
        variant="rounded"
      />
      <Avatar
        src="https://i.pravatar.cc/300"
        alt="Square variant"
        size="xl"
        variant="square"
      />
    </div>
  ),
};

export const StackedGroup: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        src="https://i.pravatar.cc/300?img=1"
        alt="User 1"
        size="md"
        variant="circle"
        className="ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=2"
        alt="User 2"
        size="md"
        variant="circle"
        className="-ml-3 ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=3"
        alt="User 3"
        size="md"
        variant="circle"
        className="-ml-3 ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=4"
        alt="User 4"
        size="md"
        variant="circle"
        className="-ml-3 ring-2 ring-white"
      />
    </div>
  ),
};

export const StackedGroupLarge: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        src="https://i.pravatar.cc/300?img=5"
        alt="User 1"
        size="lg"
        variant="circle"
        className="ring-4 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=6"
        alt="User 2"
        size="lg"
        variant="circle"
        className="-ml-4 ring-4 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=7"
        alt="User 3"
        size="lg"
        variant="circle"
        className="-ml-4 ring-4 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=8"
        alt="User 4"
        size="lg"
        variant="circle"
        className="-ml-4 ring-4 ring-white"
      />
    </div>
  ),
};

export const StackedGroupWithCounter: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        src="https://i.pravatar.cc/300?img=10"
        alt="User 1"
        size="md"
        variant="circle"
        className="ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=11"
        alt="User 2"
        size="md"
        variant="circle"
        className="-ml-3 ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=12"
        alt="User 3"
        size="md"
        variant="circle"
        className="-ml-3 ring-2 ring-white"
      />
      <div className="-ml-3 w-16 h-16 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-sm font-semibold text-gray-700">
        +12
      </div>
    </div>
  ),
};

export const StackedGroupRounded: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        src="https://i.pravatar.cc/300?img=20"
        alt="User 1"
        size="md"
        variant="rounded"
        className="ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=21"
        alt="User 2"
        size="md"
        variant="rounded"
        className="-ml-3 ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=22"
        alt="User 3"
        size="md"
        variant="rounded"
        className="-ml-3 ring-2 ring-white"
      />
      <Avatar
        src="https://i.pravatar.cc/300?img=23"
        alt="User 4"
        size="md"
        variant="rounded"
        className="-ml-3 ring-2 ring-white"
      />
    </div>
  ),
};
