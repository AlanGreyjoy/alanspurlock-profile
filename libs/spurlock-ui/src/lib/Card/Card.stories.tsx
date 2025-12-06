import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
    component: Card,
    title: 'Components/Card',
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'elevated', 'outline', 'feature'],
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl'],
        },
        border: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: (
            <div>
                <h3 className="text-lg font-bold mb-2">Default Card</h3>
                <p>Standard surface color and soft border.</p>
            </div>
        ),
        variant: 'default',
    },
};

export const Elevated: Story = {
    args: {
        children: (
            <div>
                <h3 className="text-lg font-bold mb-2">Elevated Card</h3>
                <p>Raised surface with shadow.</p>
            </div>
        ),
        variant: 'elevated',
    },
};

export const Outline: Story = {
    args: {
        children: (
            <div>
                <h3 className="text-lg font-bold mb-2">Outline Card</h3>
                <p>Transparent background with border.</p>
            </div>
        ),
        variant: 'outline',
    },
};

export const Feature: Story = {
    args: {
        children: (
            <div>
                <h3 className="text-xl font-bold mb-2">Feature Card</h3>
                <p>Matches the home page design feel with hover effects and large padding.</p>
            </div>
        ),
        variant: 'feature',
        padding: 'xl',
    },
};

export const JobCardExample: Story = {
    render: (args) => (
        <div className="p-4 bg-gray-50 min-h-screen flex items-center justify-center">
            <Card {...args} className="max-w-md w-full">
                <div className="h-48 bg-gray-50 rounded-xl mb-6 flex items-center justify-center">
                    <span className="text-4xl">🏢</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Company Name</h3>
                <p className="text-gray-500 mb-4 font-medium">Senior Developer</p>
                <p className="text-gray-600 leading-relaxed">
                    Led the development of scalable web applications using React and Node.js.
                    Improved performance by 40% and reduced technical debt.
                </p>
            </Card>
        </div>
    ),
    args: {
        variant: 'feature',
        padding: 'xl',
    },
};

export const WithPrimaryBorder: Story = {
    args: {
        children: (
            <div>
                <h3 className="text-xl font-bold mb-2">Primary Border Card</h3>
                <p className="text-gray-600">This card has the primary border flag enabled.</p>
            </div>
        ),
        variant: 'feature',
        padding: 'lg',
        border: true,
    },
};
