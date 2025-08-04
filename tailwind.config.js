/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '50%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(10px)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in-out': 'fadeInOut 1s ease-out forwards',
        'bounce-slow': 'bounceSlow 1.5s forwards',
      },
    },
  },
  plugins: [],
};
