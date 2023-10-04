/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.{html,js}", 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('preline/plugin')],
  darkMode: 'class',
}

