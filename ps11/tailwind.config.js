/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#1a5f7a',
            secondary: '#ffa41b',
        },
        fontFamily: {
          sans: ['Roboto', 'Arial', 'sans-serif'],
          serif: ['Playfair Display', 'Georgia', 'serif'], 

        },
    }
  },
  plugins: [],
}

