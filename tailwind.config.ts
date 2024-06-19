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
        'redColor': '#f13a01',
        'grayColor': '#6b7284'
      }
    }
  },
  screens: {
    sm: "546px",
    md: "708px",
    lg: "922px",
    xl: "1100px",
    xxl: "1300px",
  },
};
export default config;
