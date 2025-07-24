/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1.5s ease-out forwards",
      },
      transformOrigin: {
        top: "top",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-15px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      variants: {
        extend: {
          scale: ["group-hover"],
        },
      },
    },
  },
  plugins: [],
};
