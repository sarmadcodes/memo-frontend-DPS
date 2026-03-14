/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C9A84C',
        dark: '#1A1A2E',
        surface: '#F8F6F1',
      },
    },
  },
  plugins: [],
}

