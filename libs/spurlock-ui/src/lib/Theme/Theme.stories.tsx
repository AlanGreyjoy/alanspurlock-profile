import type { Meta, StoryObj } from '@storybook/react';

const BrandColors = () => (
    <div className="p-10 bg-white">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Brand Identity</h1>

        <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Brand Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {/* Primary Color */}
                <div className="space-y-2">
                    <div className="h-32 rounded-xl bg-brand-primary shadow-lg flex items-center justify-center text-white font-mono">
                        #ff0055
                    </div>
                    <div className="text-sm">
                        <p className="font-bold text-gray-900">Brand Primary</p>
                        <p className="text-gray-500">bg-brand-primary</p>
                    </div>
                </div>

                {/* Secondary Color */}
                <div className="space-y-2">
                    <div className="h-32 rounded-xl bg-brand-secondary shadow-lg flex items-center justify-center text-white font-mono">
                        #00d1b2
                    </div>
                    <div className="text-sm">
                        <p className="font-bold text-gray-900">Brand Secondary</p>
                        <p className="text-gray-500">bg-brand-secondary</p>
                    </div>
                </div>

            </div>
        </section>

        <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Typography</h2>
            <div className="space-y-4">
                <div>
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">Heading 1</h1>
                    <p className="text-sm text-gray-400 font-mono mt-1">.text-7xl .font-bold</p>
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Heading 2</h2>
                    <p className="text-sm text-gray-400 font-mono mt-1">.text-5xl .font-bold</p>
                </div>
                <div>
                    <p className="text-xl text-gray-700">Body text large. Used for introductions and lead paragraphs.</p>
                    <p className="text-sm text-gray-400 font-mono mt-1">.text-xl</p>
                </div>
                <div>
                    <p className="text-base text-gray-600">Body text regular. Used for standard content descriptions.</p>
                    <p className="text-sm text-gray-400 font-mono mt-1">.text-base</p>
                </div>
            </div>
        </section>
    </div>
);

const meta: Meta = {
    title: 'Design System/Theme',
    component: BrandColors,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof BrandColors>;

export const Brand: Story = {};
