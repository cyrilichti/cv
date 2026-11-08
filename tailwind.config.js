/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'blue-dark': '#1e2a5e',
          cv: {
            canvas: 'var(--cv-canvas, #f9fafb)',
            paper: 'var(--cv-paper, #fff)',
            foreground: 'var(--cv-foreground, #111827)',
            secondary: 'var(--cv-secondary, #374151)',
            muted: 'var(--cv-muted, #6b7280)',
            accent: 'var(--cv-accent, #1e2a5e)',
            border: 'var(--cv-border, #d1d5db)',
            'soft-border': 'var(--cv-soft-border, #e5e7eb)',
            subtle: 'var(--cv-subtle, #f9fafb)',
            portrait: 'var(--cv-subtle, #f3f4f6)',
            bullet: 'var(--cv-secondary, #1f2937)',
          },
        },
    },
  },
  plugins: [],
}
