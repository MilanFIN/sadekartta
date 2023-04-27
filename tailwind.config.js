/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '6000': '6000'
      },
      top: {
        '1/10': '10%'
      },
      right: {
        '1/10': '10%'
      },
      left: {
        '1/10': '10%'
      },
      inset: {
        'x-1/10': '10%'
      },
      minHeight: {
        '1/2': '50%',
      },
      maxHeight: {
        '1/2': '50%',
      },
      height: {
        '95vh': '95vh',
      }
    },
  },
  plugins: [],
}

