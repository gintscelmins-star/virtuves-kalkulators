/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50:"#fdf8f0", 100:"#faefd8", 200:"#f3d99b", 500:"#c8882a", 600:"#b07524", 700:"#9a6318", 900:"#5c3a0d" }
      },
      fontFamily: { sans: ["Inter", "sans-serif"] }
    }
  },
  plugins: []
};
