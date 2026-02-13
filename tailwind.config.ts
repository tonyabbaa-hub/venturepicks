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
        "vp-bg": "#0a0b0f",
        "vp-surface": "#12131a",
        "vp-surface-2": "#1a1b25",
        "vp-surface-3": "#222330",
        "vp-border": "#2a2b3a",
        "vp-text": "#e8e9f0",
        "vp-text-secondary": "#8b8d9e",
        "vp-text-muted": "#5a5c6e",
        "vp-accent": "#00d4aa",
        "vp-accent-hover": "#00e8bc",
        "vp-accent-dim": "rgba(0, 212, 170, 0.1)",
        "vp-yes": "#00d4aa",
        "vp-yes-dim": "rgba(0, 212, 170, 0.12)",
        "vp-no": "#ff4a6e",
        "vp-no-dim": "rgba(255, 74, 110, 0.12)",
        "vp-warn": "#ffb020",
        "vp-info": "#3b82f6",
        "vp-purple": "#8b5cf6",
        "vp-gold": "#f59e0b",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 212, 170, 0.15)",
        "glow-lg": "0 0 40px rgba(0, 212, 170, 0.2)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 170, 0.12), transparent)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 170, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 212, 170, 0.25)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
