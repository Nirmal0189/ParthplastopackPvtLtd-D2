/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#D4A843',
          crimson: '#AC3024',
          charcoal: '#212529',
          gray: '#F8F9FA',
        },
        industrial: {
          dark: '#FFFFFF',    // White base background
          gray: '#F5F0E6',    // Warm light golden-tinted gray
          blue: '#D4A843',    // Light Golden (primary accent)
          red: '#AC3024',     // Deep Crimson (secondary accent)
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
