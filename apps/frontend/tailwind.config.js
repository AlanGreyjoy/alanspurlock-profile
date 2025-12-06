/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    '../../libs/spurlock-ui/src/**/*.{js,jsx,ts,tsx}',
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
