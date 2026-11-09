/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'blue-dark': '#1e2a5e',
          'cv-page': 'var(--cv-page)',
          'cv-paper': 'var(--cv-paper, #ffffff)',
          'cv-primary': 'var(--cv-primary)',
          'cv-secondary': 'var(--cv-secondary)',
          'cv-muted': 'var(--cv-muted)',
          'cv-accent': 'var(--cv-accent)',
          'cv-border': 'var(--cv-border)',
          'cv-border-soft': 'var(--cv-border-soft)',
          'cv-chip': 'var(--cv-chip)',
          'cv-photo': 'var(--cv-photo)',
          'cv-bullet': 'var(--cv-bullet)',
        },
    },
  },
  plugins: [],
}
