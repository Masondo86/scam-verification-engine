/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        indigo: '0 20px 40px rgba(99,102,241,0.35)',
        emerald: '0 20px 40px rgba(16,185,129,0.35)'
      }
    }
  },
  plugins: []
}
