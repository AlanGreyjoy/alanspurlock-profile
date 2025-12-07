import type { StorybookConfig } from '@storybook/react-vite';

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
  async viteFinal(config) {
    const { default: tailwindcss } = await import('tailwindcss');
    const { default: autoprefixer } = await import('autoprefixer');

    // Merge configs carefully to avoid breaking Storybook's internal resolution
    const mergedConfig = {
      ...config,
      css: {
        ...config.css,
        postcss: {
          ...config.css?.postcss,
          plugins: [
            ...(config.css?.postcss?.plugins || []),
            tailwindcss(),
            autoprefixer(),
          ],
        },
      },
    };

    return mergedConfig;
  },
};

export default config;
