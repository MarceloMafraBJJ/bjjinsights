import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        dark_primary: "#0f172a",
        dark_secondary: "#4444",
        light_primary: "#F6F6F6",
        accent: "#ff7857",
        accent_secondary: "#57c4ff30",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
