/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orchid: "#417EF3", // Bright Blue (Primary Highlight & Kicker)
        violet: "#5D17B7", // Deep Purple (Brand Core)
        electric: "#417EF3", // Bright Blue (Brand Accent)
        "electric-deep": "#2C64D6", // Mid-Deep Blue
        mist: "#D8CEFD", // Mist Violet-Blue
        ink: "#090418", // Cosmic Deep Ink Canvas
        "ink-2": "#120928", // Elevated Surface
        "ink-3": "#1C103C", // Glass / Tertiary Surface
        tx: "#FAF8FF", // Primary Text
        "tx-2": "rgba(235, 230, 255, 0.72)",
        "tx-3": "rgba(180, 210, 255, 0.55)",
        line: "rgba(65, 126, 243, 0.16)",
        "line-2": "rgba(65, 126, 243, 0.30)",
        glass: "rgba(18, 9, 40, 0.45)",
        "glass-2": "rgba(28, 16, 60, 0.55)",

        // Brand Named Tokens
        "bright-blue": "#417EF3",
        "deep-purple": "#5D17B7",
        "light-purple": "#873CE6",
        "royal-violet": "#4E4FD7",
        "dark-purple": "#380A72",
        "cosmic-ink": "#090418",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "r-xl": "32px",
        "r-lg": "24px",
        "r-md": "16px",
        "r-sm": "10px",
        "r-pill": "999px",
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(.22,.9,.3,1)",
        "custom-out": "cubic-bezier(.16,1,.3,1)",
      },
      keyframes: {
        drift1: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(9%,7%) scale(1.13)" },
        },
        drift2: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-8%,10%) scale(1.09)" },
        },
        drift3: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(6%,-9%) scale(1.16)" },
        },
        blip: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(65,126,243,.55)" },
          "50%": { opacity: ".5", boxShadow: "0 0 0 7px rgba(93,23,183,0)" },
        },
        slide: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        flowLine: {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        drift1: "drift1 24s ease-in-out infinite",
        drift2: "drift2 30s ease-in-out infinite",
        drift3: "drift3 27s ease-in-out infinite",
        blip: "blip 2.4s ease-in-out infinite",
        slide: "slide 38s linear infinite",
        shimmer: "shimmer 2.5s infinite",
        pulseSlow: "pulseSlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
