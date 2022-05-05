const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: false, // or 'media'
  theme: {
    screens: {
      xs: '375px',
      ...defaultTheme.screens
    },
    container: {
      maxWidth: 1152
    },
    colors: {
      // primary: '#ff7200', // sampled from Glossary Nav
      primary: '#ff6600', // Sampled from other designs
      secondary: '#74ca3f', // aka Servpro Green; sampled from Nearest Search
      'primary-black': '#2B3B48'
    },
    extend: {
      colors,
      fontSize: {
        '21px': '21px',
        '22px': '22px',
        '26px': '26px',
        '28px': '28px',
        '30px': '30px',
        '32px': '32px',
        '36px': '36px',
        '42px': '42px',
        '44px': '44px',
        '52px': '52px',
        '54px': '54px',
        '75px': '75px',
        '78px': '78px'
      },
      zIndex: {
        300: '300',
        250: '250',
        200: '200',
        '-1': '-1',
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40',
        '-50': '-50'
      }
    }
  },
  plugins: []
}
