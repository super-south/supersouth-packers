/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#13345b',
          'navy-light': '#1d4677',
          gold: '#f59e0b',
          'gold-hover': '#fbbf24',
          amber: '#d97706',
          teal: '#06b6d4',
          success: '#10b981',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
