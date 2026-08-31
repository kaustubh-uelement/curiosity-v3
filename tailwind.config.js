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
        orchid: "#5CAEFF", // Bright Sky
        violet: "#1662CC", // Deep Sky
        electric: "#1E7DFF", // Cerulean
        "electric-deep": "#0A3B7A", // Twilight Blue
        mist: "#CDE4FF", // Mist Blue
        ink: "#010A16", // Ink Sky
        "ink-2": "#021024", // Midnight
        "ink-3": "#041A35", // Night Blue
        tx: "#F0F7FF", // Cloud
        "tx-2": "rgba(205,228,255,0.70)",
        "tx-3": "rgba(151,201,255,0.45)",
        line: "rgba(182,216,255,0.12)",
        "line-2": "rgba(182,216,255,0.22)",
        glass: "rgba(4,26,53,0.40)",
        "glass-2": "rgba(6,41,86,0.50)",

        // Full 16-color Sky Blue Palette
        cloud: "#F0F7FF",
        "arctic-sky": "#E1F0FF",
        "mist-blue": "#CDE4FF",
        "light-sky": "#B6D8FF",
        "clear-sky": "#97C9FF",
        "day-sky": "#78BAFF",
        "bright-sky": "#5CAEFF",
        "pure-sky": "#3D9BFF",
        cerulean: "#1E7DFF",
        "deep-sky": "#1662CC",
        azure: "#0F4FA3",
        "twilight-blue": "#0A3B7A",
        "evening-sky": "#062956",
        "night-blue": "#041A35",
        midnight: "#021024",
        "ink-sky": "#010A16",
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
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(92,174,255,.55)" },
          "50%": { opacity: ".5", boxShadow: "0 0 0 7px rgba(92,174,255,0)" },
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
