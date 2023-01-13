/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#082032",
        secondary: "#2C394B",
        accent: "#334756",
        main: "#FF4C29",
      },
    },
  },
  plugins: [],
};
