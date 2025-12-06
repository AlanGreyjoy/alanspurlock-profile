import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OTPInput } from './OTPInput';
import { Lock, Key, Hash } from 'lucide-react';

const meta: Meta<typeof OTPInput> = {
  component: OTPInput,
  title: 'Inputs/OTPInput',
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of OTP digits/characters',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the input',
    },
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alphabetic'],
      description: 'Type of characters allowed',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
    },
    masked: {
      control: 'boolean',
      description: 'Whether to mask the input values',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether to disable all inputs',
    },
    showDefaultIcon: {
      control: 'boolean',
      description: 'Whether to show the default shield icon in empty inputs',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder character or icon to show in empty inputs',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# OTPInput Component

A fully-featured One-Time Password input component with auto-focus navigation, paste support, and comprehensive validation.

## Features

- **Auto-navigation**: Automatically focuses next input on character entry
- **Smart backspace**: Navigates to previous input when current is empty
- **Paste support**: Intelligently handles pasted OTP codes
- **Keyboard navigation**: Supports arrow keys, Home, and End keys
- **Flexible validation**: Numeric, alphanumeric, or alphabetic input modes
- **Masked mode**: Hide characters for sensitive codes
- **Custom placeholders**: Text or icon placeholders with default shield icon
- **Accessible**: ARIA labels and keyboard-friendly
- **Responsive**: Multiple size variants

## Usage

\`\`\`tsx
import { OTPInput } from '@spurlock-ui';

function MyForm() {
  const [otp, setOtp] = useState('');

  const handleComplete = (code: string) => {
    console.log('OTP entered:', code);
    // Verify the OTP code
  };

  return (
    <OTPInput
      length={6}
      label="Enter verification code"
      helperText="Check your email for the code"
      value={otp}
      onChange={setOtp}
      onComplete={handleComplete}
    />
  );
}
\`\`\`

## Controlled vs Uncontrolled

The component can be used in both controlled and uncontrolled modes:

### Controlled
\`\`\`tsx
const [otp, setOtp] = useState('');
<OTPInput value={otp} onChange={setOtp} />
\`\`\`

### Uncontrolled
\`\`\`tsx
<OTPInput defaultValue="123" onComplete={(code) => verify(code)} />
\`\`\`

## Placeholder Options

The component supports flexible placeholder display:

\`\`\`tsx
// Default shield icon (shown by default)
<OTPInput length={6} />

// Custom icon
<OTPInput 
  length={6} 
  placeholder={<Lock className="h-5 w-5" />}
  showDefaultIcon={false}
/>

// Text character
<OTPInput length={6} placeholder="–" showDefaultIcon={false} />

// No placeholder
<OTPInput length={6} showDefaultIcon={false} />
\`\`\`

## Best Practices

1. **Always provide a label** for accessibility
2. **Use numeric type** for phone/SMS verification codes
3. **Enable masked mode** for sensitive security codes
4. **Provide clear error messages** when validation fails
5. **Handle onComplete** to trigger verification logic
6. **Consider auto-submit** when all digits are entered
7. **Use appropriate placeholders** to indicate security (default shield is good for most cases)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

/**
 * Default 6-digit numeric OTP input with shield icon placeholders.
 * This is the most common use case for SMS verification codes and 2FA.
 */
export const Default: Story = {
  args: {
    length: 6,
    label: 'Enter verification code',
    helperText: 'We sent a 6-digit code to your email',
  },
};

/**
 * OTP input with custom text placeholder (dash character).
 */
export const WithTextPlaceholder: Story = {
  args: {
    length: 6,
    label: 'Enter code',
    helperText: 'Custom dash placeholder',
    placeholder: '–',
    showDefaultIcon: false,
  },
};

/**
 * OTP input with custom lock icon placeholder.
 */
export const WithCustomIcon: Story = {
  args: {
    length: 6,
    label: 'Security Code',
    helperText: 'Custom lock icon placeholder',
    placeholder: <Lock className="h-5 w-5" />,
    showDefaultIcon: false,
  },
};

/**
 * OTP input without any placeholder (clean look).
 */
export const WithoutPlaceholder: Story = {
  args: {
    length: 6,
    label: 'Enter code',
    helperText: 'No placeholder shown',
    showDefaultIcon: false,
  },
};

/**
 * Example with controlled state and completion handler.
 * Shows how to integrate with form validation and submission.
 */
export const Controlled: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleComplete = (code: string) => {
      console.log('OTP entered:', code);
      setSubmitted(true);
      // Simulate verification
      setTimeout(() => {
        setSubmitted(false);
        setOtp('');
      }, 2000);
    };

    return (
      <div className="space-y-4">
        <OTPInput
          label="Verification Code"
          helperText={
            submitted
              ? '✓ Verifying...'
              : 'Enter the 6-digit code sent to your device'
          }
          value={otp}
          onChange={setOtp}
          onComplete={handleComplete}
        />
        <div className="text-sm text-[var(--color-text-muted)]">
          Current value: <code className="font-mono">{otp || '(empty)'}</code>
        </div>
      </div>
    );
  },
};

/**
 * Error state for invalid OTP codes.
 * Use this to show validation feedback to users.
 */
export const WithError: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(false);

    const handleComplete = (code: string) => {
      // Simulate validation
      if (code === '123456') {
        setError(false);
        alert('✓ Code verified successfully!');
        setOtp('');
      } else {
        setError(true);
      }
    };

    return (
      <div className="space-y-4">
        <OTPInput
          label="Enter verification code"
          helperText="Hint: Try 123456 for a valid code"
          value={otp}
          onChange={(val) => {
            setOtp(val);
            setError(false);
          }}
          onComplete={handleComplete}
          error={error}
          errorMessage="Invalid code. Please try again."
        />
      </div>
    );
  },
};

/**
 * Small size variant - ideal for compact UIs or mobile layouts.
 */
export const Small: Story = {
  args: {
    size: 'sm',
    length: 6,
    label: 'Small OTP Input',
    helperText: 'Compact size for space-constrained layouts',
  },
};

/**
 * Large size variant - better for accessibility and touch interfaces.
 */
export const Large: Story = {
  args: {
    size: 'lg',
    length: 6,
    label: 'Large OTP Input',
    helperText: 'Large size for better touch targets',
  },
};

/**
 * Masked input for security-sensitive codes.
 * Characters are hidden like a password field.
 */
export const Masked: Story = {
  args: {
    length: 6,
    label: 'Enter security code',
    helperText: 'Your code will be hidden for security',
    masked: true,
  },
};

/**
 * 4-digit PIN input - common for banking and security applications.
 */
export const FourDigitPIN: Story = {
  args: {
    length: 4,
    label: 'Enter PIN',
    helperText: 'Enter your 4-digit PIN',
    masked: true,
  },
};

/**
 * Alphanumeric input for more complex verification codes.
 * Accepts both letters and numbers.
 */
export const Alphanumeric: Story = {
  args: {
    length: 8,
    type: 'alphanumeric',
    label: 'Activation Code',
    helperText: 'Enter the 8-character activation code',
  },
};

/**
 * Alphabetic input for letter-only codes.
 */
export const Alphabetic: Story = {
  args: {
    length: 5,
    type: 'alphabetic',
    label: 'Access Code',
    helperText: 'Enter the 5-letter access code',
  },
};

/**
 * Disabled state - for read-only display or when waiting for async operations.
 */
export const Disabled: Story = {
  args: {
    length: 6,
    label: 'Verification Code',
    helperText: 'Input is currently disabled',
    disabled: true,
    defaultValue: '123456',
  },
};

/**
 * Example with default value preset.
 */
export const WithDefaultValue: Story = {
  args: {
    length: 6,
    label: 'Edit Verification Code',
    helperText: 'Pre-filled with a default value',
    defaultValue: '123456',
  },
};

/**
 * Comprehensive demo showing all size variants and states.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <OTPInput
        size="sm"
        length={6}
        label="Small (sm)"
        helperText="Compact size variant"
      />
      <OTPInput
        size="md"
        length={6}
        label="Medium (md) - Default"
        helperText="Standard size variant"
      />
      <OTPInput
        size="lg"
        length={6}
        label="Large (lg)"
        helperText="Large size variant"
      />
    </div>
  ),
};

/**
 * Demo showing different input lengths.
 */
export const DifferentLengths: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <OTPInput length={4} label="4-digit code" helperText="Common for PINs" />
      <OTPInput
        length={6}
        label="6-digit code"
        helperText="Most common for 2FA"
      />
      <OTPInput
        length={8}
        label="8-digit code"
        helperText="Higher security codes"
      />
    </div>
  ),
};

/**
 * Interactive example with real-time validation feedback.
 */
export const InteractiveValidation: Story = {
  render: () => {
    const [otp, setOtp] = useState('');
    const [status, setStatus] = useState<
      'idle' | 'validating' | 'success' | 'error'
    >('idle');
    const correctCode = '999999';

    const handleComplete = (code: string) => {
      setStatus('validating');

      // Simulate API call
      setTimeout(() => {
        if (code === correctCode) {
          setStatus('success');
          setTimeout(() => {
            setOtp('');
            setStatus('idle');
          }, 2000);
        } else {
          setStatus('error');
        }
      }, 1000);
    };

    const handleChange = (val: string) => {
      setOtp(val);
      if (status === 'error') {
        setStatus('idle');
      }
    };

    return (
      <div className="space-y-4">
        <OTPInput
          label="Two-Factor Authentication"
          helperText={
            status === 'validating'
              ? 'Validating code...'
              : status === 'success'
              ? '✓ Code verified successfully!'
              : `Enter the code from your authenticator app (hint: ${correctCode})`
          }
          value={otp}
          onChange={handleChange}
          onComplete={handleComplete}
          error={status === 'error'}
          errorMessage="Invalid code. Please try again."
          disabled={status === 'validating'}
        />
        {status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
            ✓ Authentication successful! Redirecting...
          </div>
        )}
      </div>
    );
  },
};

/**
 * Example showing all states side by side.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <OTPInput label="Default State" helperText="Ready for input" />
      <OTPInput
        label="With Value"
        defaultValue="123456"
        helperText="Pre-filled value"
      />
      <OTPInput
        label="Error State"
        defaultValue="000000"
        error
        errorMessage="Invalid verification code"
      />
      <OTPInput
        label="Disabled State"
        defaultValue="123456"
        disabled
        helperText="Input is disabled"
      />
      <OTPInput
        label="Masked Input"
        defaultValue="123456"
        masked
        helperText="Characters are hidden"
      />
    </div>
  ),
};

/**
 * Demo showing different placeholder styles.
 */
export const PlaceholderVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <OTPInput
        length={6}
        label="Default Shield Icon"
        helperText="Default shield icon placeholder"
      />
      <OTPInput
        length={6}
        label="Lock Icon"
        helperText="Custom lock icon"
        placeholder={<Lock className="h-5 w-5" />}
        showDefaultIcon={false}
      />
      <OTPInput
        length={6}
        label="Key Icon"
        helperText="Custom key icon"
        placeholder={<Key className="h-5 w-5" />}
        showDefaultIcon={false}
      />
      <OTPInput
        length={6}
        label="Hash Icon"
        helperText="Custom hash icon"
        placeholder={<Hash className="h-5 w-5" />}
        showDefaultIcon={false}
      />
      <OTPInput
        length={6}
        label="Dash Placeholder"
        helperText="Text character placeholder"
        placeholder="–"
        showDefaultIcon={false}
      />
      <OTPInput
        length={6}
        label="Asterisk Placeholder"
        helperText="Asterisk character"
        placeholder="*"
        showDefaultIcon={false}
      />
      <OTPInput
        length={6}
        label="No Placeholder"
        helperText="Clean, no placeholder"
        showDefaultIcon={false}
      />
    </div>
  ),
};
