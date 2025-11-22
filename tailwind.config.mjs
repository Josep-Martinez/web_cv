/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          900: "#0a192f",
          800: "#112240",
          700: "#233554",
        },
        slate: {
          light: "#8892b0",
          DEFAULT: "#a8b2d1",
          dark: "#495670",
        },
        electric: "#64ffda",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-martian-mono)", "monospace"], // Keeping for some accents if needed
      },
    },
  },
  plugins: [],
};
