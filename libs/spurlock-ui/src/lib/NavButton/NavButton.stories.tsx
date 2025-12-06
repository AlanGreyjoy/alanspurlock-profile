import type { Meta, StoryObj } from '@storybook/react';
import { NavButton } from './NavButton';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof NavButton> = {
    component: NavButton,
    title: 'Components/NavButton',
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
        to: { control: 'text' },
        external: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof NavButton>;

const commonDecorator = (Story: any) => (
    <MemoryRouter>
        <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            <Story />
        </div>
    </MemoryRouter>
);

export const Default: Story = {
    args: {
        to: '/home',
        children: 'Home',
    },
    decorators: [commonDecorator],
};

export const External: Story = {
    args: {
        to: 'https://google.com',
        external: true,
        children: 'External Link',
    },
    decorators: [commonDecorator],
};

export const Active: Story = {
    args: {
        to: '/active',
        children: 'Active Page',
    },
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={['/active']}>
                <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
};
