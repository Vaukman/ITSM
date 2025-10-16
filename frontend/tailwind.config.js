/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e1e27",
        secondary: "#df0139",
        accent: "#ABACAD",
        background: "#28242a",
        text: "#e2e2e2",
      },
    },
  },
  plugins: [],
};
