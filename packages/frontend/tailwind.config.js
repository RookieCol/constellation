/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green400: "#73c358",
        green500: "#3f882b",
        green600: "#2b5222"
      },
      backgroundImage: {
        "banner": "url('/images/banner.jpg')"
      },
      backgroundColor: {
        "tapiz": "url('/images/tapiz.jpg')"
      }
    },
  },
  plugins: [require("daisyui")],
}

export default config