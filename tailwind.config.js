/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'PT_Serif': ["PT Serif"],
        'Passion_One': ["Passion One"],
        'Shrikhand': ["Shrikhand"],
        'Chicle': ["Chicle"],
      },
      colors: {
        custom_orange: '#E83808',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
