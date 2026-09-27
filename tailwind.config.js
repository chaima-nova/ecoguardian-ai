/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        midnight: "#0A111E",
        ocean: "#0F2537",
        panel: "rgba(15, 37, 55, 0.60)",
        cyan: {
          DEFAULT: "#0066FF",
          mint: "#00AEDB",
        },
        ice: "#1D6FB8",
        slate: "#55708A",
        amber: "#A66A00",
        coral: "#D93636",
        navy: "#0A192F",
        iceblue: "#C8E5FF",
        skyblue: "#4A9EFF",
        oceannavy: "#0B2545",
      },
      backdropBlur: {
        xl: "24px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(10,25,47,0.12), inset 0 1px 1px rgba(255,255,255,0.4)",
        "glow-cyan": "0 0 0 1px rgba(0,102,255,0.15), 0 0 24px rgba(0,102,255,0.10)",
        "glow-btn": "0 8px 24px rgba(0,102,255,0.35)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%,100%": { opacity: 0.55 },
          "50%": { opacity: 1 },
        },
        flow: {
          "0%": { strokeDashoffset: 40 },
          "100%": { strokeDashoffset: 0 },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out both",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        flow: "flow 1.2s linear infinite",
        scan: "scan 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
