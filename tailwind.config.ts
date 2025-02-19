import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          950: 'hsl(var(--primary-950))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '80%': { opacity: '0.6' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '80%': { opacity: '0.6' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-down': 'fade-down 0.5s ease-out',
        'slide-up-fade': 'slide-up-fade 0.3s ease-out',
        'slide-down-fade': 'slide-down-fade 0.3s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid': 'linear-gradient(to right, hsl(var(--grid-color) / 0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--grid-color) / 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      gridTemplateColumns: {
        '52': 'repeat(52, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    typography,
    require('tailwindcss-animate'),
  ],
}

export default config
