import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    '../src/Introduction.stories.tsx',
    '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableOnboarding: true,
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config, { configType }) {
    const { default: tailwindcss } = await import('tailwindcss');
    const { default: autoprefixer } = await import('autoprefixer');

    return {
      ...config,
      css: {
        postcss: {
          plugins: [
            tailwindcss(join(__dirname, '../tailwind.config.mjs')),
            autoprefixer(),
          ],
        },
      },
    };
  },
};

export default config;
