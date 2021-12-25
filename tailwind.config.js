const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: colors.yellow,
        gray: {
          'nav': '#1e1e1e'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
