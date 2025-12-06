import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorInput } from './ColorInput';

const meta: Meta<typeof ColorInput> = {
  component: ColorInput,
  title: 'Inputs/ColorInput',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    format: {
      control: 'select',
      options: ['hex', 'hexa', 'rgb', 'rgba', 'hsl', 'hsla'],
    },
    error: {
      control: 'boolean',
    },
    withPicker: {
      control: 'boolean',
    },
    withEyeDropper: {
      control: 'boolean',
    },
    disallowInput: {
      control: 'boolean',
    },
    fixOnBlur: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorInput>;

export const Default: Story = {
  args: {
    placeholder: 'Pick a color...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Favorite Color',
    placeholder: 'Select your favorite color',
    defaultValue: '#C5D899',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Theme Color',
    helperText: 'Choose a color for your theme',
    defaultValue: '#ff0055',
  },
};

export const Error: Story = {
  args: {
    label: 'Color',
    placeholder: 'Enter a valid color',
    error: true,
    errorMessage: 'Please enter a valid color value',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('#ff0055');
    return (
      <div className="space-y-4">
        <ColorInput
          label="Controlled Color Input"
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-gray-600">
          Current value:{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">{value}</code>
        </p>
      </div>
    );
  },
};

export const DifferentFormats: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ColorInput label="HEX Format" format="hex" defaultValue="#ff0055" />
      <ColorInput label="HEXA Format" format="hexa" defaultValue="#ff005580" />
      <ColorInput
        label="RGB Format"
        format="rgb"
        defaultValue="rgb(255, 0, 85)"
      />
      <ColorInput
        label="RGBA Format"
        format="rgba"
        defaultValue="rgba(255, 0, 85, 0.5)"
      />
      <ColorInput
        label="HSL Format"
        format="hsl"
        defaultValue="hsl(340, 100%, 50%)"
      />
      <ColorInput
        label="HSLA Format"
        format="hsla"
        defaultValue="hsla(340, 100%, 50%, 0.5)"
      />
    </div>
  ),
};

export const WithSwatches: Story = {
  args: {
    label: 'Your favorite color',
    format: 'hex',
    swatches: [
      '#2e2e2e',
      '#868e96',
      '#fa5252',
      '#e64980',
      '#be4bdb',
      '#7950f2',
      '#4c6ef5',
      '#228be6',
      '#15aabf',
      '#12b886',
      '#40c057',
      '#82c91e',
      '#fab005',
      '#fd7e14',
    ],
  },
};

export const CustomSwatchesPerRow: Story = {
  args: {
    label: 'Color with custom swatches layout',
    format: 'hex',
    swatchesPerRow: 5,
    swatches: [
      '#ff0055',
      '#00d1b2',
      '#ffb700',
      '#7c3aed',
      '#ec4899',
      '#06b6d4',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
    ],
  },
};

export const WithoutPicker: Story = {
  args: {
    label: 'Without dropdown',
    placeholder: 'Enter color value',
    withPicker: false,
  },
};

export const WithoutEyeDropper: Story = {
  args: {
    label: 'Without eye dropper',
    placeholder: 'Pick color',
    withEyeDropper: false,
    defaultValue: '#ff0055',
  },
};

export const DisallowInput: Story = {
  args: {
    label: 'Swatches only',
    disallowInput: true,
    withPicker: false,
    swatches: [
      '#ff0055',
      '#00d1b2',
      '#ffb700',
      '#7c3aed',
      '#ec4899',
      '#06b6d4',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
    ],
  },
};

export const FixOnBlur: Story = {
  args: {
    label: 'Value is fixed on blur',
    placeholder: 'Try entering invalid color',
    fixOnBlur: true,
    defaultValue: '#ff0055',
  },
};

export const DontFixOnBlur: Story = {
  args: {
    label: 'Value is not fixed on blur',
    placeholder: 'May contain invalid value',
    fixOnBlur: false,
    defaultValue: '#ff0055',
  },
};

export const CloseOnSwatchClick: Story = {
  args: {
    label: 'Closes on swatch click',
    format: 'hex',
    closeOnColorSwatchClick: true,
    swatches: [
      '#ff0055',
      '#00d1b2',
      '#ffb700',
      '#7c3aed',
      '#ec4899',
      '#06b6d4',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ColorInput label="Small" size="sm" defaultValue="#ff0055" />
      <ColorInput label="Medium" size="md" defaultValue="#ff0055" />
      <ColorInput label="Large" size="lg" defaultValue="#ff0055" />
    </div>
  ),
};

export const WithAlphaChannel: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ColorInput
        label="RGBA Format"
        format="rgba"
        defaultValue="rgba(255, 0, 85, 0.5)"
      />
      <ColorInput label="HEXA Format" format="hexa" defaultValue="#ff005580" />
      <ColorInput
        label="HSLA Format"
        format="hsla"
        defaultValue="hsla(340, 100%, 50%, 0.5)"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Disabled',
    disabled: true,
    defaultValue: '#ff0055',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read only',
    defaultValue: '#ff0055',
    readOnly: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <ColorInput label="Default" placeholder="Default state" />
      <ColorInput
        label="With Helper Text"
        placeholder="Helper text"
        helperText="This is helpful information"
      />
      <ColorInput
        label="Error State"
        placeholder="Error state"
        error
        errorMessage="This field is required"
      />
      <ColorInput
        label="Disabled"
        placeholder="Disabled state"
        disabled
        defaultValue="#ff0055"
      />
      <ColorInput label="Read Only" defaultValue="#ff0055" readOnly />
    </div>
  ),
};

export const onChangeEnd: Story = {
  render: () => {
    const [changeEndValue, setChangeEndValue] = useState('#FFFFFF');
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Change end value: <b>{changeEndValue}</b>
        </p>
        <ColorInput
          label="Pick color"
          placeholder="Pick color"
          defaultValue="#FFFFFF"
          onChangeEnd={setChangeEndValue}
        />
      </div>
    );
  },
};
