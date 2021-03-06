module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        84: '21rem',
        88: '22rem',
        92: '23rem',
      },
      fontSize: {
        xxxs: '.5rem',
        xxs: '.75rem',
      },
      maxWidth: {
        xxs: '12rem',
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        line: '#00C300',
        'line-hover': '#00E000',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
