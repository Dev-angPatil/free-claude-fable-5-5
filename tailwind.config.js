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
        "surface-elevated": "#1a1a1a",
        border: "#2C2C2E",
        "border-muted": "#1c1c1e",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0A0",
        "text-muted": "#5C5E62",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
