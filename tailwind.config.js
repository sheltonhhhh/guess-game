/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", // Include this if you are using Tailwind in your HTML files
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors
        limeGreen: '#e3f28c',
        accent: '#BCD914',

        // Text
        // Dark
        textDarkPrimary: '#1f1f1f',
        // Light
        textLightPrimary: '#d7d7d7',
        textLightSecondary: '#cbcbcb',

        // Backgrounds
        // Dark
        bgDarkPrimary: '#151515',
        bgDarkSecondary: '#282826',
        // Light
        bgLightSecondary: '#e8e1e1',
        bgLightPrimary: '#f6f6f6',
      },
      fontFamily: {
        adventPro: ['"Advent Pro"', 'sans-serif'],
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
      },
      fontWeight: {
        extrabold: 800,
        semibold: 600,
        bold: 700,
        medium: 500,
        regular: 400,
      },
      fontSize: {
        logo: '28px', // font-size: 28px
        displayLarge: '60px', // font-size: 60px
        h3: '18px', // font-size: 18px
        h1: '33px', // font-size: 33px
        button: '16px', // font-size: 16px
        h4: '16px', // font-size: 16px
        bodySmall: '12px', // font-size: 12px
        bodyMedium: '16px', // font-size: 14px
      },
      lineHeight: {
        logo: '32px', // line-height: 32px
        displayLarge: '70px', // line-height: 70px
        h3: '24px', // line-height: 24px
        h1: '38px', // line-height: 38px
        button: '20px', // line-height: 20px
        h4: '20px', // line-height: 18px
        bodySmall: '16px', // line-height: 16px
        bodyMedium: '18px', // line-height: 20px
      },
    },
  },
  plugins: [
    // Custom typography plugin to enable font styles
    function({ addComponents, theme }) {
      const typography = {
        '.logo': {
          fontFamily: theme('fontFamily.adventPro'),
          fontWeight: theme('fontWeight.extrabold'),
          fontSize: theme('fontSize.logo'),
          lineHeight: theme('lineHeight.logo'),
        },
        '.display-large': {
          fontFamily: theme('fontFamily.adventPro'),
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.displayLarge'),
          lineHeight: theme('lineHeight.displayLarge'),
        },
        '.h3': {
          fontFamily: theme('fontFamily.adventPro'),
          fontWeight: theme('fontWeight.extrabold'),
          fontSize: theme('fontSize.h3'),
          lineHeight: theme('lineHeight.h3'),
        },
        '.h1': {
          fontFamily: theme('fontFamily.adventPro'),
          fontWeight: theme('fontWeight.semibold'),
          fontStyle: 'italic',
          fontSize: theme('fontSize.h1'),
          lineHeight: theme('lineHeight.h1'),
        },
        '.button-text': {
          fontFamily: theme('fontFamily.adventPro'),
          fontWeight: theme('fontWeight.extrabold'),
          fontSize: theme('fontSize.button'),
          lineHeight: theme('lineHeight.button'),
        },
        '.h4': {
          fontFamily: theme('fontFamily.adventPro'),
          fontWeight: theme('fontWeight.bold'),
          fontSize: theme('fontSize.h4'),
          lineHeight: theme('lineHeight.h4'),
        },
        '.body-small': {
          fontFamily: theme('fontFamily.robotoCondensed'),
          fontWeight: theme('fontWeight.regular'),
          fontSize: theme('fontSize.bodySmall'),
          lineHeight: theme('lineHeight.bodySmall'),
        },
        '.body-small-strong': {
          fontFamily: theme('fontFamily.robotoCondensed'),
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.bodySmall'),
          lineHeight: theme('lineHeight.bodySmall'),
        },
        '.body-medium': {
          fontFamily: theme('fontFamily.robotoCondensed'),
          fontWeight: theme('fontWeight.regular'),
          fontSize: theme('fontSize.bodyMedium'),
          lineHeight: theme('lineHeight.bodyMedium'),
        },
        '.body-medium-strong': {
          fontFamily: theme('fontFamily.robotoCondensed'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.bodyMedium'),
          lineHeight: theme('lineHeight.bodyMedium'),
        },
        '.label-small': {
          fontFamily: theme('fontFamily.robotoCondensed'),
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.bodySmall'),
          lineHeight: theme('lineHeight.bodySmall'),
        },
      };

      addComponents(typography);
    },
  ],
}
