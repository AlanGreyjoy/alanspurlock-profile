import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      builder: {
        viteConfigPath: 'libs/spurlock-ui/vite.config.mts',
      },
    },
  },
  async viteFinal(config: InlineConfig) {
    return {
      ...config,
      css: {
        postcss: {
          plugins: [
            require('tailwindcss')({
              config: join(__dirname, '../tailwind.config.js'),
            }),
            require('autoprefixer'),
          ],
        },
      },
    };
  },
};

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;
