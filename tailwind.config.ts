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
        theme: {
          light: "#dcd2c9",
          secondary: "#b98e65",
          primary: "#251a12",
          tertiary: "#6d4322",
        },
      },
    },
  },
  plugins: [],
};
export default config;
