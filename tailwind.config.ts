import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a3c6e",
          light: "#2a5298",
          dark: "#0f2444",
        },
        secondary: {
          DEFAULT: "#2a6fbb",
          light: "#4a8fd4",
        },
        accent: {
          DEFAULT: "#f5a623",
          dark: "#e09010",
        },
        light: "#f4f7fb",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;