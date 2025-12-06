const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
    join(__dirname, '.storybook/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#ff0055',
          secondary: '#00d1b2',
        },
      },
    },
  },
  plugins: [],
};
