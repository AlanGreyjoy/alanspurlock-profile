import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  component: RangeSlider,
  title: 'Inputs/RangeSlider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# RangeSlider

A customizable range slider component that allows users to select a range of values between two thumbs. Built on Radix UI primitives with full accessibility support.

## Features

- **Dual Thumbs**: Select minimum and maximum values
- **Range Constraints**: Configure minimum and maximum range intervals
- **Marks**: Display marks with optional labels on the track
- **Custom Colors**: Customize track and thumb colors
- **Multiple Sizes**: Five size variants (xs, sm, md, lg, xl)
- **Accessibility**: Full keyboard navigation and screen reader support
- **Controlled & Uncontrolled**: Support for both controlled and uncontrolled modes

## Usage

\`\`\`tsx
import { RangeSlider } from '@alanspurlock-profile/spurlock-ui';

function App() {
  const [value, setValue] = useState<[number, number]>([25, 75]);

  return (
    <RangeSlider
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  );
}
\`\`\`

## Keyboard Interactions

- **Arrow Keys**: Adjust the focused thumb value
- **Home**: Set the focused thumb to minimum
- **End**: Set the focused thumb to maximum
- **Tab**: Move focus between thumbs
        `,
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Color of the track and thumb',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the track',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius of the track and thumbs',
    },
    disabled: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    minRange: {
      control: 'number',
      description: 'Minimum range interval between thumbs',
    },
    maxRange: {
      control: 'number',
      description: 'Maximum range interval between thumbs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

/**
 * The default range slider with standard configuration.
 */
export const Default: Story = {
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
  },
};

/**
 * A controlled range slider with real-time value display.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([30, 70]);

    return (
      <div className="w-full max-w-md space-y-4">
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={1}
        />
        <div className="text-sm text-gray-600">
          <p>Min: {value[0]}</p>
          <p>Max: {value[1]}</p>
          <p>Range: {value[1] - value[0]}</p>
        </div>
      </div>
    );
  },
};

/**
 * Range slider with marks displayed on the track.
 */
export const WithMarks: Story = {
  args: {
    defaultValue: [20, 80],
    min: 0,
    max: 100,
    step: 10,
    marks: [
      { value: 0, label: '0%' },
      { value: 25, label: '25%' },
      { value: 50, label: '50%' },
      { value: 75, label: '75%' },
      { value: 100, label: '100%' },
    ],
  },
};

/**
 * Range slider restricted to only select marked values.
 */
export const RestrictToMarks: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);

    return (
      <div className="w-full max-w-md space-y-4">
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          restrictToMarks
          marks={[
            { value: 0, label: 'XS' },
            { value: 25, label: 'SM' },
            { value: 50, label: 'MD' },
            { value: 75, label: 'LG' },
            { value: 100, label: 'XL' },
          ]}
        />
        <div className="text-sm text-gray-600">
          Selected: {value[0]} - {value[1]}
        </div>
      </div>
    );
  },
};

/**
 * Range slider with minimum and maximum range constraints.
 */
export const WithRangeConstraints: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([40, 60]);

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Min Range: 10, Max Range: 40</p>
          <RangeSlider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            minRange={10}
            maxRange={40}
            step={1}
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>Min: {value[0]}</p>
          <p>Max: {value[1]}</p>
          <p>Current Range: {value[1] - value[0]}</p>
        </div>
      </div>
    );
  },
};

/**
 * Range slider with labels always visible above thumbs.
 */
export const WithLabelsAlwaysOn: Story = {
  args: {
    defaultValue: [30, 70],
    min: 0,
    max: 100,
    labelAlwaysOn: true,
    label: (value: number) => `$${value}`,
  },
};

/**
 * Range slider with custom color theming.
 */
export const CustomColor: Story = {
  render: () => {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium">Primary (Pink)</p>
          <RangeSlider defaultValue={[25, 75]} color="#ff0055" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Secondary (Teal)</p>
          <RangeSlider defaultValue={[30, 70]} color="#00d1b2" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Purple</p>
          <RangeSlider defaultValue={[20, 80]} color="#9333ea" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Blue</p>
          <RangeSlider defaultValue={[35, 65]} color="#3b82f6" />
        </div>
      </div>
    );
  },
};

/**
 * Range sliders in different sizes.
 */
export const Sizes: Story = {
  render: () => {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium">Extra Small (xs)</p>
          <RangeSlider defaultValue={[25, 75]} size="xs" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Small (sm)</p>
          <RangeSlider defaultValue={[25, 75]} size="sm" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Medium (md) - Default</p>
          <RangeSlider defaultValue={[25, 75]} size="md" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Large (lg)</p>
          <RangeSlider defaultValue={[25, 75]} size="lg" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Extra Large (xl)</p>
          <RangeSlider defaultValue={[25, 75]} size="xl" />
        </div>
      </div>
    );
  },
};

/**
 * Range slider in disabled state.
 */
export const Disabled: Story = {
  args: {
    defaultValue: [25, 75],
    disabled: true,
  },
};

/**
 * Range slider with custom domain and precision.
 */
export const CustomDomainAndPrecision: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([0.5, 2.5]);

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Range: 0.0 - 5.0 (Step: 0.1)</p>
          <RangeSlider
            value={value}
            onChange={setValue}
            domain={[0, 5]}
            step={0.1}
            precision={1}
            labelAlwaysOn
          />
        </div>
        <div className="text-sm text-gray-600">
          Selected: {value[0].toFixed(1)} - {value[1].toFixed(1)}
        </div>
      </div>
    );
  },
};

/**
 * Range slider with callback demonstrations.
 */
export const WithCallbacks: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);
    const [committedValue, setCommittedValue] = useState<[number, number]>([
      25, 75,
    ]);
    const [changeCount, setChangeCount] = useState(0);
    const [commitCount, setCommitCount] = useState(0);

    return (
      <div className="w-full max-w-md space-y-4">
        <RangeSlider
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setChangeCount((c) => c + 1);
          }}
          onChangeEnd={(newValue) => {
            setCommittedValue(newValue);
            setCommitCount((c) => c + 1);
          }}
          min={0}
          max={100}
        />
        <div className="text-sm space-y-1 bg-gray-50 p-3 rounded">
          <p className="font-medium">Current Value:</p>
          <p className="text-gray-600">
            [{value[0]}, {value[1]}] (onChange called {changeCount} times)
          </p>
          <p className="font-medium mt-2">Committed Value:</p>
          <p className="text-gray-600">
            [{committedValue[0]}, {committedValue[1]}] (onChangeEnd called{' '}
            {commitCount} times)
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Range slider with inverted track.
 */
export const Inverted: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Inverted Range Slider</p>
          <RangeSlider
            value={value}
            onChange={setValue}
            inverted
            min={0}
            max={100}
          />
        </div>
        <div className="text-sm text-gray-600">
          Selected: {value[0]} - {value[1]}
        </div>
      </div>
    );
  },
};

/**
 * Price range selector example showing real-world usage.
 */
export const PriceRangeExample: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);

    return (
      <div className="w-full max-w-md p-6 bg-white rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
        <RangeSlider
          value={priceRange}
          onChange={setPriceRange}
          min={0}
          max={1000}
          step={10}
          labelAlwaysOn
          label={(value: number) => `$${value}`}
          color="#00d1b2"
          marks={[
            { value: 0, label: '$0' },
            { value: 250, label: '$250' },
            { value: 500, label: '$500' },
            { value: 750, label: '$750' },
            { value: 1000, label: '$1000' },
          ]}
        />
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-600">Min:</span>{' '}
            <span className="font-semibold">${priceRange[0]}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Max:</span>{' '}
            <span className="font-semibold">${priceRange[1]}</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-brand-primary text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
          Apply Filter
        </button>
      </div>
    );
  },
};
