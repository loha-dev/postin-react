/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'mainty': '#0D0D0D',
        'fotsy': '#ebf3f7',
      },
      fontFamily: {
        'body': "Nunito"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
