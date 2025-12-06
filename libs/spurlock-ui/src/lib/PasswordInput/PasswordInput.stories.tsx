import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  component: PasswordInput,
  title: 'Inputs/PasswordInput',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
    defaultVisible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText:
      'Must be at least 8 characters with uppercase, lowercase, and numbers',
  },
};

export const Error: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    error: true,
    errorMessage: 'Password is required',
  },
};

export const Small: Story = {
  args: {
    label: 'Password',
    size: 'sm',
    placeholder: 'Small password input',
  },
};

export const Large: Story = {
  args: {
    label: 'Password',
    size: 'lg',
    placeholder: 'Large password input',
  },
};

export const DefaultVisible: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    defaultVisible: true,
    helperText: 'Password is visible by default',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    disabled: true,
    helperText: 'This field is disabled',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <PasswordInput label="Default" placeholder="Enter password" />
      <PasswordInput
        label="With Helper Text"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
      />
      <PasswordInput
        label="Error State"
        placeholder="Enter password"
        error
        errorMessage="Password is too weak"
      />
      <PasswordInput label="Disabled" placeholder="Enter password" disabled />
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <PasswordInput
        label="Small"
        size="sm"
        placeholder="Small password input"
      />
      <PasswordInput
        label="Medium (Default)"
        size="md"
        placeholder="Medium password input"
      />
      <PasswordInput
        label="Large"
        size="lg"
        placeholder="Large password input"
      />
    </div>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 max-w-md p-6 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div>
        <label className="block text-sm font-medium mb-1.5">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full h-11 px-4 border-2 border-brand-primary rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        />
      </div>
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        helperText="Forgot your password?"
      />
      <button className="w-full h-11 bg-brand-primary text-white rounded-md font-medium hover:opacity-90 transition-opacity">
        Sign In
      </button>
    </div>
  ),
};
