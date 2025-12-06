import '@radix-ui/themes/styles.css';
import '../src/styles.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'gray',
          value: '#f9fafb',
        },
        {
          name: 'dark',
          value: '#111827',
        },
      ],
    },
    layout: 'padded',
  },
};

export default preview;
