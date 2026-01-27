/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yes: '#3fb68b',
        no: '#ff5353',
        info: '#00b2ff',
        main: 'var(--text-main)',
        secondary: 'var(--text-secondary)',
        active: 'var(--bg-active)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#104d37',
          'primary-content': '#ffffff',
          'base-100': '#f4f9f7',
          'base-200': '#e8f1ed',
          'base-300': '#dbe7e2',
          'base-content': '#1a2622',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          primary: '#104d37',
          'primary-content': '#ffffff',
          'base-100': '#000000',
          'base-200': '#000000',
          'base-300': '#0b1410',
          'base-content': '#eaeaea',
        },
      },
    ],
  },
};
