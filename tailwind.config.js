/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // ── SRIKARA DIALYSIS HEALTHCARE DESIGN SYSTEM ─────────────
        navy: {
          950: '#060E1A',
          900: '#0A192F',
          850: '#0F2444',
          800: '#16325B',
          700: '#1E4477',
          600: '#2A5C9E',
        },
        healthcare: {
          blue: '#1D4ED8',
          'blue-hover': '#1E40AF',
          'blue-soft': '#EFF6FF',
          teal: '#0D9488',
          'teal-hover': '#0F766E',
          'teal-soft': '#F0FDFA',
        },
        // ── SEMANTIC TOKENS (accessible & consistent) ─────────────
        primary: {
          DEFAULT: '#0F2444',
          hover: '#16325B',
          active: '#0A192F',
          soft: '#EFF6FF',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
          soft: '#F0FDFA',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          soft: '#DBEAFE',
          foreground: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          subtle: '#F1F5F9',
          elevated: '#FFFFFF',
          dark: '#0A192F',
        },
        border: {
          DEFAULT: '#E2E8F0',
          subtle: '#F1F5F9',
          strong: '#CBD5E1',
          focus: '#2563EB',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          inverted: '#FFFFFF',
        },
        status: {
          success: '#059669',
          'success-soft': '#ECFDF5',
          warning: '#D97706',
          'warning-soft': '#FFFBEB',
          error: '#DC2626',
          'error-soft': '#FEF2F2',
          info: '#2563EB',
          'info-soft': '#EFF6FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'elevated': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'card': '12px',
        'badge': '6px',
        'btn': '8px',
      },
      transitionTimingFunction: {
        'healthcare': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
