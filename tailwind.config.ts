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
        primary: "#4936e6",
        "primary-container": "#6355ff",
        "primary-fixed": "#e3dfff",
        "primary-fixed-dim": "#c4c0ff",
        "on-primary": "#ffffff",
        "on-primary-container": "#f9f4ff",
        
        "gradient-start": "#6355FF",
        "gradient-end": "#9F55FF",
        
        surface: "#fcf8f9",
        "surface-bright": "#fcf8f9",
        "surface-dim": "#dcd9da",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f4",
        "surface-container": "#f0edee",
        "surface-container-high": "#eae7e8",
        "surface-container-highest": "#e5e2e3",
        "surface-variant": "#e5e2e3",
        "surface-accent": "#FFEFDF",
        
        "on-surface": "#1c1b1c",
        "on-surface-variant": "#464556",
        "on-background": "#1c1b1c",
        
        secondary: "#5e5d68",
        "secondary-container": "#e4e1ee",
        "secondary-fixed": "#e4e1ee",
        "secondary-fixed-dim": "#c7c5d1",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#64636e",
        
        outline: "#777587",
        "outline-variant": "#c8c4d9",
        
        tertiary: "#943e00",
        "tertiary-container": "#bb5000",
        "tertiary-fixed": "#ffdbcb",
        
        error: "#ba1a1a",
        "error-container": "#ffdad6"
      },
      spacing: {
        "margin-mobile": "20px",
        unit: "8px",
        gutter: "24px",
        "margin-desktop": "80px",
        "section-gap": "120px"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
