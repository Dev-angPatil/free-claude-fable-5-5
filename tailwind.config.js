/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#111111",
        "surface-sunken": "#181818",
        "surface-elevated": "#1e1e1e",
        border: "#2C2C2E",
        "border-thick": "#FFFFFF",
        "border-muted": "#3A3A3C",
        "text-primary": "#FFFFFF",
        "text-secondary": "#D1D5DB",
        "text-muted": "#9CA3AF",
      },
      fontFamily: {
        sans: ['"Work Sans"', 'Inter', 'system-ui', 'sans-serif'],
        headline: ['"Archivo Black"', 'sans-serif'],
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        glitch: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.4' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        shake: 'shake 0.35s ease-in-out',
        glitch: 'glitch 0.2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
