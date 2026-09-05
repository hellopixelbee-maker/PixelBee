export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        brandviolet: 'rgb(var(--color-brandviolet) / <alpha-value>)',
      },
      borderRadius: {
        card: '24px',
        tile: '20px',
      },
      fontFamily: {
        sans: [
          '"BPG Rioni"',
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          '"Noto Sans Georgian"',
          'sans-serif',
        ],
      },
      boxShadow: {
        glass: '0 24px 80px -36px rgba(0, 0, 0, 0.75)',
        'glass-hover': '0 32px 100px -38px rgba(78, 111, 255, 0.48)',
        glow: '0 0 42px rgba(120, 169, 255, 0.22)',
      },
    },
  },
}
