/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        // Core brand palette — deep navy / electric blue / cool off-white.
        // `azure` is the primary accent token used across every component.
        azure: {
          50: '#EEF5FF',
          100: '#D9E8FF',
          200: '#A9CBFF',
          300: '#6FA9FF',
          400: '#5299FF',
          500: '#3D8BFF', // primary brand blue
          600: '#2468D6',
          700: '#1B54B3',
          800: '#163F88',
          900: '#102C60',
        },
        steel: {
          300: '#8FA3C7',
          400: '#6E84AD',
          500: '#526893',
          600: '#3A4E78',
        },
        midnight: {
          700: '#15264F',
          800: '#101E40',
          900: '#0B1633',
          950: '#081129',
        },
        ink: {
          700: '#13234A',
          800: '#0E1A3A',
          900: '#0A1531',
          950: '#050B1C',
        },
        mist: {
          50: '#F5F7FF',
          100: '#E6ECFA',
          200: '#CDD7EE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        condensed: ['Anton', '"Arial Narrow"', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        ultra: '0.22em',
        wide2: '0.14em',
      },
      backgroundImage: {
        'azure-sheen': 'linear-gradient(110deg, #3D8BFF 0%, #6FA9FF 45%, #A9CBFF 55%, #3D8BFF 100%)',
        'azure-fade':
          'linear-gradient(180deg, rgba(61,139,255,0) 0%, rgba(61,139,255,0.14) 100%)',
        'midnight-deep':
          'radial-gradient(120% 90% at 20% 0%, #0E1A3A 0%, #081129 55%, #050B1C 100%)',
        'grid-fade':
          'linear-gradient(180deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      boxShadow: {
        azure: '0 0 0 1px rgba(61,139,255,0.22), 0 24px 60px -32px rgba(61,139,255,0.22)',
        card: '0 30px 70px -40px rgba(0,0,0,0.9)',
        'card-hover': '0 40px 90px -44px rgba(0,0,0,0.95)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.92)', opacity: '0.7' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'spin-slow': 'spin-slow 26s linear infinite',
        'spin-reverse': 'spin-reverse 38s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3.2s ease-out infinite',
        marquee: 'marquee 32s linear infinite',
        sheen: 'sheen 1.4s ease-out',
      },
    },
  },
  plugins: [],
}
