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
        // Core brand palette — deep black / neon lime / off-white.
        // `azure` is kept as the token name for the primary accent so every
        // component picks up the new brand colour without a rename.
        azure: {
          50: '#F7FFE8',
          100: '#EDFFCC',
          200: '#DCFF9E',
          300: '#CAFF6B',
          400: '#BFFF4D',
          500: '#B5FF36', // primary brand lime
          600: '#97DB1E',
          700: '#74AA12',
          800: '#557F0D',
          900: '#3A5709',
        },
        steel: {
          300: '#A6A69E',
          400: '#86867F',
          500: '#66665F',
          600: '#474743',
        },
        midnight: {
          700: '#1E1E1C',
          800: '#171716',
          900: '#111110',
          950: '#0A0A0A',
        },
        ink: {
          700: '#1C1C1B',
          800: '#141414',
          900: '#0C0C0C',
          950: '#050505',
        },
        mist: {
          50: '#F5F5F0',
          100: '#EAEAE4',
          200: '#D6D6CF',
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
        'azure-sheen': 'linear-gradient(110deg, #B5FF36 0%, #CAFF6B 45%, #DCFF9E 55%, #B5FF36 100%)',
        'azure-fade':
          'linear-gradient(180deg, rgba(181,255,54,0) 0%, rgba(181,255,54,0.14) 100%)',
        'midnight-deep':
          'radial-gradient(120% 90% at 20% 0%, #141414 0%, #0A0A0A 55%, #050505 100%)',
        'grid-fade':
          'linear-gradient(180deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      boxShadow: {
        azure: '0 0 0 1px rgba(181,255,54,0.22), 0 24px 60px -32px rgba(181,255,54,0.22)',
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
