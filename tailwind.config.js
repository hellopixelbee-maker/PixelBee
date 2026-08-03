export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#f3f2ef',
        ink: '#0d0d0f',
      },
      borderRadius: {
        card: '24px',
        tile: '20px',
      },
      fontFamily: {
        sans: [
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
    },
  },
}
