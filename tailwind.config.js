/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "dark-background": "#101B23",
        "light-text": "#DEE7EA",
        "subtle-text": "#4F7396",
        "dark-surface": "#243546",
        "primary-text": "#0D141C",
        "light-surface": "#E8EDF2"
      }
    },
  },
  plugins: [],
};
