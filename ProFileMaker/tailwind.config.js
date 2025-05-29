/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          light: "rgb(255 255 255)", // white
          dark: "rgb(15 23 42)", // slate-900
        },
        foreground: {
          light: "rgb(15 23 42)", // slate-900
          dark: "rgb(255 255 255)", // white
        },
        primary: {
          DEFAULT: "rgb(30 58 138)", // blue-900
          50: "rgb(239 246 255)",
          100: "rgb(219 234 254)",
          200: "rgb(191 219 254)",
          300: "rgb(147 197 253)",
          400: "rgb(96 165 250)",
          500: "rgb(59 130 246)",
          600: "rgb(37 99 235)",
          700: "rgb(29 78 216)",
          800: "rgb(30 58 138)",
          900: "rgb(30 58 138)",
        },
        accent: {
          DEFAULT: "rgb(204 173 0)", // darker gold
          50: "rgb(255 249 230)",
          100: "rgb(255 242 204)",
          200: "rgb(255 230 153)",
          300: "rgb(230 194 0)",
          400: "rgb(204 173 0)",
          500: "rgb(153 129 0)", // even darker for hover or emphasis
        },
      },
    },
  },
  plugins: [import("@tailwindcss/forms"), import("@tailwindcss/typography")],
};
