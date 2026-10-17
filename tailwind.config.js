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
        surface: "#0a0a0a",
        "surface-elevated": "#121212",
        "surface-highlight": "#181818",
        "surface-interactive": "#222222",
        border: "rgba(255, 255, 255, 0.08)",
        "border-default": "rgba(255, 255, 255, 0.14)",
        "border-active": "rgba(255, 255, 255, 0.35)",
        "text-primary": "#ededed",
        "text-secondary": "#a1a1aa",
        "text-muted": "#71717a",
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'ring-subtle': '0 0 0 1px rgba(255, 255, 255, 0.08)',
        'ring-default': '0 0 0 1px rgba(255, 255, 255, 0.14)',
        'ring-active': '0 0 0 1px rgba(255, 255, 255, 0.35)',
        'card-glow': '0 8px 32px -4px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.25)' },
        },
        slideUpRight: {
          '0%': { transform: 'translateY(100%) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '70%': { transform: 'translateY(6px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        shake: 'shake 0.35s ease-in-out',
        pulseGlow: 'pulseGlow 2s infinite ease-in-out',
        slideUpRight: 'slideUpRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        slideDown: 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        scaleUp: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
