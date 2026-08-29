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
        orchid: "#CD82FF",
        violet: "#8752FA",
        electric: "#4500F9",
        "electric-deep": "#3200bd",
        mist: "#E7EAEE",
        ink: "#0A0611",
        "ink-2": "#100A1C",
        "ink-3": "#170F26",
        tx: "#FFFFFF",
        "tx-2": "rgba(231,234,238,0.62)",
        "tx-3": "rgba(231,234,238,0.38)",
        line: "rgba(255,255,255,0.10)",
        "line-2": "rgba(255,255,255,0.20)",
        glass: "rgba(255,255,255,0.04)",
        "glass-2": "rgba(255,255,255,0.07)",
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
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(205,130,255,.55)" },
          "50%": { opacity: ".5", boxShadow: "0 0 0 7px rgba(205,130,255,0)" },
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
