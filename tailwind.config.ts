import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        info: "#f9f9f9", // Grey White
        primary: "#e8e8e8", // Grey White
        secondary: "#dadada", // Greyer White
        background: "#0C2D48", // Dark Blue?
        accent: "#41aab8", // Aquamarine
        "accent-2": "#FFD53D", // Yellow?
        "content-base": "#0f110f", // Greenish Black
        "content-muted": "#676767", // Grey
        success: "#00FF00", // Green
        error: "#FF0000", // Red
      },
      boxShadow: {
        emphasis: "0 0px 10px 0px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
