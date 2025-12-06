import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AngleSlider } from './AngleSlider';

const meta: Meta<typeof AngleSlider> = {
  component: AngleSlider,
  title: 'Inputs/AngleSlider',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      description: 'Size of the slider circle in pixels',
    },
    thumbSize: {
      control: 'number',
      description: 'Size of the thumb in pixels',
    },
    step: {
      control: 'number',
      description: 'Step value for keyboard navigation',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AngleSlider>;

export const Default: Story = {
  args: {
    'aria-label': 'Angle slider',
    size: 100,
    thumbSize: 8,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(180);
    return (
      <div className="flex flex-col gap-4">
        <AngleSlider
          value={value}
          onChange={setValue}
          aria-label="Angle slider"
        />
        <p className="text-sm text-gray-600">Current value: {value}°</p>
      </div>
    );
  },
};

export const WithLabel: Story = {
  args: {
    'aria-label': 'Angle slider',
    formatLabel: (value) => `${value}°`,
    size: 100,
  },
};

export const WithMarks: Story = {
  args: {
    'aria-label': 'Angle slider',
    formatLabel: (value) => `${value}°`,
    size: 100,
    marks: [
      { value: 0, label: '0°' },
      { value: 45, label: '45°' },
      { value: 90, label: '90°' },
      { value: 135, label: '135°' },
      { value: 180, label: '180°' },
      { value: 225, label: '225°' },
      { value: 270, label: '270°' },
      { value: 315, label: '315°' },
    ],
  },
};

export const RestrictToMarks: Story = {
  args: {
    'aria-label': 'Angle slider',
    formatLabel: (value) => `${value}°`,
    size: 100,
    restrictToMarks: true,
    marks: [
      { value: 0 },
      { value: 45 },
      { value: 90 },
      { value: 135 },
      { value: 180 },
      { value: 225 },
      { value: 270 },
      { value: 315 },
    ],
  },
};

export const WithOnChangeEnd: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    const [endValue, setEndValue] = useState(0);

    return (
      <div className="flex flex-col gap-4">
        <AngleSlider
          value={value}
          onChange={setValue}
          onChangeEnd={setEndValue}
          aria-label="Angle slider"
        />
        <div className="text-sm text-gray-600">
          <p>Current value: {value}°</p>
          <p>End value: {endValue}°</p>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Angle slider',
    disabled: true,
    value: 90,
  },
};

export const LargeSize: Story = {
  args: {
    'aria-label': 'Angle slider',
    size: 150,
    thumbSize: 12,
    formatLabel: (value) => `${value}°`,
  },
};

export const SmallSize: Story = {
  args: {
    'aria-label': 'Angle slider',
    size: 60,
    thumbSize: 6,
  },
};
