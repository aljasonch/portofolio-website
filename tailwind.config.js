/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Deep Blue
        secondary: '#0D9488', // Vibrant Teal
        accent: '#F97316', // Bright Orange
        neutralBg: '#F3F4F6', // Light Gray (Background)
        neutralText: '#1F2937', // Dark Gray (Text)
      },
    },
  },
  plugins: [],
};
