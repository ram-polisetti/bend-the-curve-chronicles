/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'newspaper': {
          background: '#F5F5F0',
          primary: '#1A1A1A',
          secondary: '#4A4A4A',
          muted: '#717171',
          border: '#E0E0E0',
        }
      },
      fontFamily: {
        // Primary font for headlines and important text
        serif: ['GT Alpina', 'Freight Text Pro', 'Georgia', 'serif'],
        // Secondary font for body and UI
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        'newspaper': {
          css: {
            '--tw-prose-body': '#4A4A4A',
            '--tw-prose-headings': '#1A1A1A',
            '--tw-prose-links': '#1A1A1A',
            maxWidth: 'none',
            p: {
              marginBottom: '1.5em',
              lineHeight: '1.8',
            },
            h2: {
              fontFamily: 'Playfair Display, Georgia, serif',
              marginTop: '2em',
              marginBottom: '1em',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [typography],
}; 