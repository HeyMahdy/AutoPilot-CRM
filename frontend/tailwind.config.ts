import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#050816",
        accent: "#22d3ee",
        accentSoft: "#0f172a",
        danger: "#fb7185"
      }
    }
  },
  plugins: []
};

export default config;

