/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 7s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeOut: {
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  plugins: [],
};
