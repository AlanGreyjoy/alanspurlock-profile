import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioItem } from './Radio';

// Re-export RadioGroupPrimitive for the story above
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'Inputs/Radio',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the radio buttons',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
      description: 'Visual variant of the radio buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all radio buttons are disabled',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Radio component built with Radix UI primitives. Supports multiple sizes, variants, label positions, and descriptions.

## Usage

\`\`\`tsx
import { RadioGroup } from '@alanspurlock-profile/spurlock-ui';

function MyComponent() {
  const [value, setValue] = useState('option1');
  
  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      items={[
        { value: 'option1', label: 'Option 1', description: 'First option' },
        { value: 'option2', label: 'Option 2', description: 'Second option' },
      ]}
    />
  );
}
\`\`\`

## Features

- **Variants**: Choose between \`filled\` (default) or \`outline\` styles
- **Sizes**: Small, medium (default), or large radio buttons
- **Label Position**: Place labels on the left or right (default) of the radio button
- **Descriptions**: Add helpful description text below labels
- **Accessibility**: Built with Radix UI primitives for full keyboard navigation and screen reader support
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
  },
};

export const WithDescriptions: Story = {
  args: {
    items: [
      {
        value: 'standard',
        label: 'Standard Plan',
        description: 'Perfect for individuals and small teams',
      },
      {
        value: 'pro',
        label: 'Pro Plan',
        description: 'For growing businesses with advanced needs',
      },
      {
        value: 'enterprise',
        label: 'Enterprise Plan',
        description: 'Custom solutions for large organizations',
      },
    ],
    defaultValue: 'pro',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    items: [
      { value: 'option1', label: 'Filled Option 1' },
      { value: 'option2', label: 'Filled Option 2' },
      { value: 'option3', label: 'Filled Option 3' },
    ],
    defaultValue: 'option1',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    items: [
      { value: 'option1', label: 'Outline Option 1' },
      { value: 'option2', label: 'Outline Option 2' },
      { value: 'option3', label: 'Outline Option 3' },
    ],
    defaultValue: 'option1',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    items: [
      { value: 'option1', label: 'Small Option 1' },
      { value: 'option2', label: 'Small Option 2' },
      { value: 'option3', label: 'Small Option 3' },
    ],
    defaultValue: 'option1',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    items: [
      { value: 'option1', label: 'Medium Option 1' },
      { value: 'option2', label: 'Medium Option 2' },
      { value: 'option3', label: 'Medium Option 3' },
    ],
    defaultValue: 'option1',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    items: [
      { value: 'option1', label: 'Large Option 1' },
      { value: 'option2', label: 'Large Option 2' },
      { value: 'option3', label: 'Large Option 3' },
    ],
    defaultValue: 'option1',
  },
};

export const LabelLeft: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Option 1', labelPosition: 'left' },
      { value: 'option2', label: 'Option 2', labelPosition: 'left' },
      { value: 'option3', label: 'Option 3', labelPosition: 'left' },
    ],
    defaultValue: 'option1',
  },
};

export const LabelRight: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Option 1', labelPosition: 'right' },
      { value: 'option2', label: 'Option 2', labelPosition: 'right' },
      { value: 'option3', label: 'Option 3', labelPosition: 'right' },
    ],
    defaultValue: 'option1',
  },
};

export const Disabled: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Disabled Option 1', disabled: true },
      { value: 'option2', label: 'Disabled Option 2', disabled: true },
      { value: 'option3', label: 'Disabled Option 3', disabled: true },
    ],
    defaultValue: 'option1',
  },
};

export const MixedDisabled: Story = {
  args: {
    items: [
      { value: 'option1', label: 'Enabled Option' },
      { value: 'option2', label: 'Disabled Option', disabled: true },
      { value: 'option3', label: 'Enabled Option' },
    ],
    defaultValue: 'option1',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          value={value}
          onValueChange={setValue}
          items={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
        />
        <p className="text-sm text-gray-600">Selected value: {value}</p>
      </div>
    );
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
      <div className="flex flex-col gap-4 max-w-md">
        <h3 className="text-lg font-semibold text-gray-900">
          Choose Payment Method
        </h3>
        <RadioGroup
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          size="md"
          variant="filled"
          items={[
            {
              value: 'card',
              label: 'Credit Card',
              description: 'Pay with Visa, MasterCard, or American Express',
            },
            {
              value: 'paypal',
              label: 'PayPal',
              description: 'Pay securely with your PayPal account',
            },
            {
              value: 'bank',
              label: 'Bank Transfer',
              description: 'Direct transfer from your bank account',
            },
            {
              value: 'crypto',
              label: 'Cryptocurrency',
              description:
                'Pay with Bitcoin, Ethereum, or other cryptocurrencies',
              disabled: true,
            },
          ]}
        />
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            Selected: <strong>{paymentMethod}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const AllVariantsCombinations: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Filled - Small
          </h3>
          <RadioGroup
            variant="filled"
            size="sm"
            defaultValue="option1"
            items={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Filled - Medium
          </h3>
          <RadioGroup
            variant="filled"
            size="md"
            defaultValue="option1"
            items={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Filled - Large
          </h3>
          <RadioGroup
            variant="filled"
            size="lg"
            defaultValue="option1"
            items={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Outline - Small
          </h3>
          <RadioGroup
            variant="outline"
            size="sm"
            defaultValue="option1"
            items={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Outline - Medium
          </h3>
          <RadioGroup
            variant="outline"
            size="md"
            defaultValue="option1"
            items={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Outline - Large
          </h3>
          <RadioGroup
            variant="outline"
            size="lg"
            defaultValue="option1"
            items={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
        </div>
      </div>
    );
  },
};

export const IndividualRadioItems: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-600 mb-2">
          You can also use RadioItem components individually:
        </p>
        <RadioGroupPrimitive.Root
          value={value}
          onValueChange={setValue}
          className="flex flex-col gap-3"
        >
          <RadioItem
            value="option1"
            label="Individual Radio 1"
            description="This is a standalone radio item"
            size="md"
            variant="filled"
          />
          <RadioItem
            value="option2"
            label="Individual Radio 2"
            description="Another standalone radio item"
            size="md"
            variant="outline"
          />
          <RadioItem
            value="option3"
            label="Individual Radio 3"
            labelPosition="left"
            size="lg"
            variant="filled"
          />
        </RadioGroupPrimitive.Root>
        <p className="text-sm text-gray-600">Selected: {value}</p>
      </div>
    );
  },
};

