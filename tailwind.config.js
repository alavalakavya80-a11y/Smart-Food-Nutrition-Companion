/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { leaf: { 50: "#f1f8f1", 100: "#e2f0e3", 500: "#4d9560", 600: "#367a49", 700: "#28613a" } } } },
  plugins: []
};
