/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',  // Dark Blue
        secondary: '#E5A623', // Golden Yellow
        accent: '#C98C39', // Light Gold
        light: '#FFFFFF' // White
      }
    },
  },
  plugins: [],
}

