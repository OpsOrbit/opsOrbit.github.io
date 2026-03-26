/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'monospace',
        ],
      },
      colors: {
        hub: {
          bg: 'var(--hub-bg)',
          surface: 'var(--hub-surface)',
          elevated: 'var(--hub-elevated)',
          text: 'var(--hub-text)',
          sub: 'var(--hub-sub)',
          muted: 'var(--hub-muted)',
          brand: 'var(--hub-brand)',
          line: 'var(--hub-line)',
          primary: 'var(--hub-primary)',
          'primary-hover': 'var(--hub-primary-hover)',
          code: 'var(--hub-code-bg)',
          danger: 'var(--hub-danger)',
          'danger-bg': 'var(--hub-danger-bg)',
          'danger-border': 'var(--hub-danger-border)',
          accent: 'var(--hub-accent)',
          success: 'var(--hub-success)',
        },
      },
      boxShadow: {
        card: 'var(--hub-shadow-card)',
        'card-hover': 'var(--hub-shadow-card-hover)',
      },
      transitionDuration: {
        250: '250ms',
      },
      keyframes: {
        'panel-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'panel-in': 'panel-in 0.28s ease-out forwards',
      },
    },
  },
  plugins: [],
}
