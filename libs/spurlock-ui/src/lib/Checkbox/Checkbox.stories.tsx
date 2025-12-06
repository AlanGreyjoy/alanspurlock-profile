import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Inputs/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text displayed next to the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the terms',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: false,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium checkbox',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    checked: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-sm text-gray-600">
          Checked: {checked ? 'true' : 'false'}
        </p>
      </div>
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [items, setItems] = useState({
      option1: false,
      option2: true,
      option3: false,
    });

    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          label="Option 1"
          checked={items.option1}
          onCheckedChange={(checked) =>
            setItems({ ...items, option1: checked === true })
          }
        />
        <Checkbox
          label="Option 2"
          checked={items.option2}
          onCheckedChange={(checked) =>
            setItems({ ...items, option2: checked === true })
          }
        />
        <Checkbox
          label="Option 3"
          checked={items.option3}
          onCheckedChange={(checked) =>
            setItems({ ...items, option3: checked === true })
          }
        />
      </div>
    );
  },
};
