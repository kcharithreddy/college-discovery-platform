import type { Config } from 'tailwindcss';

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Inter Variable"', 'ui-sans-serif', 'sans-serif']
      },
      colors: {
        // Theme-aware surfaces and text (defined in globals.css for light and dark)
        page: token('page'),
        surface: token('surface'),
        muted: token('muted'),
        line: token('line'),
        ink: token('ink'),
        sub: token('sub'),
        faint: token('faint'),
        brand: {
          50: '#eef4ff',
          100: '#dbe6ff',
          200: '#bfd3ff',
          300: '#93b4ff',
          400: '#5f8bfb',
          500: '#3a66f2',
          600: '#2549de',
          700: '#1f39b3',
          800: '#20338d',
          900: '#1f2f70',
          950: '#141c44'
        }
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 4px 16px -4px rgb(15 23 42 / 0.08)',
        lift: '0 2px 4px rgb(15 23 42 / 0.05), 0 16px 40px -12px rgb(15 23 42 / 0.22)'
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'none' } }
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both'
      }
    }
  },
  plugins: []
};
export default config;
