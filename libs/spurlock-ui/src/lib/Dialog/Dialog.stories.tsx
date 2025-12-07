import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { useState } from 'react';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dialog component built on Radix UI primitives. Dialogs are used to display content in a layer above the main page content. They can be used for confirmations, forms, or any content that requires user attention.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogWrapper = (args: any) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Dialog</Button>
      <Dialog {...args} opened={opened} onClose={() => setOpened(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => (
    <DialogWrapper title="Default Dialog">
      <p className="text-gray-700 leading-relaxed">
        This is a default dialog with standard settings. It can be closed by
        clicking the X button, pressing Escape, or clicking outside the dialog.
      </p>
    </DialogWrapper>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <DialogWrapper title="Dialog with Title">
      <p className="text-gray-700 leading-relaxed mb-4">
        This dialog has a title that clearly indicates its purpose.
      </p>
      <p className="text-gray-600 text-sm">
        You can customize the title with any React node, including components
        and styled text.
      </p>
    </DialogWrapper>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <DialogWrapper title="No Close Button" withCloseButton={false}>
      <p className="text-gray-700 leading-relaxed mb-4">
        This dialog doesn't have a close button in the header.
      </p>
      <p className="text-gray-600 text-sm mb-4">
        You can still close it by clicking outside or pressing Escape.
      </p>
      <Button onClick={() => {}}>Custom Close Action</Button>
    </DialogWrapper>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <DialogWrapper title="Small Dialog" size="sm">
      <p className="text-gray-700 leading-relaxed">
        This is a small dialog, perfect for simple confirmations or brief
        messages.
      </p>
    </DialogWrapper>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <DialogWrapper title="Large Dialog" size="lg">
      <p className="text-gray-700 leading-relaxed mb-4">
        This is a large dialog with more space for content. It's great for
        forms, detailed information, or any content that needs more room.
      </p>
      <div className="space-y-3 mb-4">
        <div className="h-12 bg-gray-100 rounded"></div>
        <div className="h-12 bg-gray-100 rounded"></div>
        <div className="h-12 bg-gray-100 rounded"></div>
      </div>
      <p className="text-gray-600 text-sm">
        The dialog will automatically handle scrolling if content overflows.
      </p>
    </DialogWrapper>
  ),
};

export const ExtraLargeSize: Story = {
  render: () => (
    <DialogWrapper title="Extra Large Dialog" size="xl">
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          This is an extra large dialog, ideal for complex forms or extensive
          content.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-gray-100 rounded"></div>
          <div className="h-32 bg-gray-100 rounded"></div>
          <div className="h-32 bg-gray-100 rounded"></div>
          <div className="h-32 bg-gray-100 rounded"></div>
        </div>
      </div>
    </DialogWrapper>
  ),
};

export const CustomPadding: Story = {
  render: () => (
    <DialogWrapper title="Custom Padding" padding="xl">
      <p className="text-gray-700 leading-relaxed">
        This dialog has extra large padding for a more spacious feel.
      </p>
    </DialogWrapper>
  ),
};

export const WithActions: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Button onClick={() => setOpened(true)}>
          Open Confirmation Dialog
        </Button>
        <Dialog
          opened={opened}
          onClose={() => setOpened(false)}
          title="Confirm Action"
        >
          <p className="text-gray-700 leading-relaxed mb-6">
            Are you sure you want to proceed with this action? This operation
            cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpened(false)}>Confirm</Button>
          </div>
        </Dialog>
      </>
    );
  },
};

export const RichContent: Story = {
  render: () => (
    <DialogWrapper title="CI/CD Pipeline Node" size="lg">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#00d1b2] rounded-lg flex items-center justify-center text-2xl">
            📝
          </div>
          <div>
            <h3 className="font-bold text-lg">Git Push</h3>
            <p className="text-sm text-gray-600">Source Control</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The starting point of our CI/CD pipeline. When code is pushed to the
          repository, it triggers the automated build and deployment process.
        </p>

        <div className="bg-gray-50 border-2 border-gray-900 rounded-lg p-4">
          <h4 className="font-bold mb-2">What happens here:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Code is pushed to GitHub</li>
            <li>GitHub Actions workflow is triggered</li>
            <li>Automated pipeline begins</li>
          </ul>
        </div>
      </div>
    </DialogWrapper>
  ),
};
