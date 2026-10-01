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
        // Core brand palette — electric blue / deep navy / true black
        azure: {
          50: '#EEF5FF',
          100: '#D9E8FF',
          200: '#B4D1FF',
          300: '#83B0FF',
          400: '#4C87FA',
          500: '#1F63E0', // primary brand blue
          600: '#154DC0',
          700: '#113C99',
          800: '#0F307A',
          900: '#0C2559',
        },
        steel: {
          300: '#7E97B8',
          400: '#5F7C9F',
          500: '#4A6382',
          600: '#354A63',
        },
        midnight: {
          700: '#14213A',
          800: '#0D1729',
          900: '#081020',
          950: '#04080F',
        },
        ink: {
          700: '#1A1E24',
          800: '#12151A',
          900: '#0A0C10',
          950: '#050609',
        },
        mist: {
          50: '#F8FAFD',
          100: '#EFF3F9',
          200: '#DCE3ED',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['"Sora"', 'Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
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
        'azure-sheen':
          'linear-gradient(110deg, #0F307A 0%, #1F63E0 22%, #B4D1FF 42%, #1F63E0 62%, #113C99 100%)',
        'azure-fade':
          'linear-gradient(180deg, rgba(31,99,224,0) 0%, rgba(31,99,224,0.22) 100%)',
        'midnight-deep':
          'radial-gradient(120% 90% at 20% 0%, #0D1729 0%, #0A0C10 55%, #050609 100%)',
        'grid-fade':
          'linear-gradient(180deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      boxShadow: {
        azure: '0 0 0 1px rgba(31,99,224,0.28), 0 24px 60px -28px rgba(31,99,224,0.35)',
        card: '0 30px 70px -40px rgba(0,0,0,0.9)',
        'card-hover': '0 40px 90px -40px rgba(31,99,224,0.28)',
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
