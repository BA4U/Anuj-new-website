import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent — used sparingly: links, one primary action per view
        primary: "#4936e6",
        "primary-container": "#4335d8",
        "primary-fixed": "#eae7ff",
        "primary-fixed-dim": "#d5cdff",
        "on-primary": "#ffffff",
        "on-primary-container": "#ffffff",

        "gradient-start": "#4936e6",
        "gradient-end": "#8b5cf6",

        // Surfaces: white → Apple's neutral greys
        surface: "#ffffff",
        "surface-bright": "#ffffff",
        "surface-dim": "#e8e8ed",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f7f9",
        "surface-container": "#f2f2f5",
        "surface-container-high": "#ececf0",
        "surface-container-highest": "#e4e4e9",
        "surface-variant": "#e4e4e9",
        "surface-accent": "#eef0ff",

        "on-surface": "#1d1d1f",
        "on-surface-variant": "#6e6e73",
        "on-background": "#1d1d1f",

        secondary: "#6e6e73",
        "secondary-container": "#ededf2",
        "secondary-fixed": "#ededf2",
        "secondary-fixed-dim": "#dcdce3",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#3a3a3f",

        outline: "#8e8e93",
        "outline-variant": "#d8d8de",

        tertiary: "#943e00",
        "tertiary-container": "#bb5000",
        "tertiary-fixed": "#ffdbcb",

        error: "#ba1a1a",
        "error-container": "#ffdad6",
      },
      spacing: {
        "margin-mobile": "20px",
        unit: "8px",
        gutter: "24px",
        "margin-desktop": "80px",
        "section-gap": "120px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
        "marquee-reverse": "marquee-reverse 56s linear infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
