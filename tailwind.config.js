/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    '!./oauth-callback.html',
  ],
  safelist: [],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0071E3',
        'apple-blue-hover': '#0077ED',
        'apple-gray': '#6E6E73',
        'apple-gray-light': '#F5F5F7',
        'apple-dark': '#1D1D1F',
      },
      fontFamily: {
        'sf': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
};
