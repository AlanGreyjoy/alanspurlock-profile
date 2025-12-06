import { create } from '@storybook/theming';

export const spurlockTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'Spurlock UI',
  brandUrl: 'https://alanspurlock.com',
  brandTarget: '_self',

  // Typography
  fontBase: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
  fontCode: '"Fira Code", "Courier New", monospace',

  // Colors
  colorPrimary: '#ff0055',
  colorSecondary: '#00d1b2',

  // UI
  appBg: '#f9fafb',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e7eb',
  appBorderRadius: 8,

  // Text colors
  textColor: '#111827',
  textInverseColor: '#ffffff',
  textMutedColor: '#6b7280',

  // Toolbar
  barTextColor: '#374151',
  barSelectedColor: '#ff0055',
  barBg: '#ffffff',
  barHoverColor: '#ff0055',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  inputTextColor: '#111827',
  inputBorderRadius: 6,

  // Button colors
  buttonBg: '#ff0055',
  buttonBorder: '#ff0055',

  // Brand logo (optional)
  brandImage: undefined,
});
