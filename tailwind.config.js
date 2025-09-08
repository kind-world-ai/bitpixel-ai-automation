/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // BitPixel Brand Colors
        'bitpixel': {
          orange: {
            50: 'oklch(0.97 0.02 35)',
            100: 'oklch(0.94 0.05 35)',
            200: 'oklch(0.88 0.08 35)',
            300: 'oklch(0.8 0.12 35)',
            400: 'oklch(0.72 0.15 35)',
            500: 'oklch(0.65 0.18 35)', // Primary
            600: 'oklch(0.58 0.16 35)',
            700: 'oklch(0.5 0.14 35)',
            800: 'oklch(0.42 0.12 35)',
            900: 'oklch(0.35 0.1 35)',
            950: 'oklch(0.25 0.08 35)',
          },
          blue: {
            50: 'oklch(0.97 0.01 240)',
            100: 'oklch(0.94 0.03 240)',
            200: 'oklch(0.88 0.06 240)',
            300: 'oklch(0.8 0.1 240)',
            400: 'oklch(0.7 0.13 240)',
            500: 'oklch(0.6 0.15 240)', // Accent
            600: 'oklch(0.5 0.13 240)',
            700: 'oklch(0.4 0.11 240)',
            800: 'oklch(0.3 0.08 240)',
            900: 'oklch(0.2 0.05 240)',
            950: 'oklch(0.15 0.03 240)',
          },
          navy: {
            50: 'oklch(0.97 0.005 240)',
            100: 'oklch(0.94 0.01 240)',
            200: 'oklch(0.88 0.015 240)',
            300: 'oklch(0.8 0.02 240)',
            400: 'oklch(0.7 0.02 240)',
            500: 'oklch(0.6 0.02 240)',
            600: 'oklch(0.5 0.02 240)',
            700: 'oklch(0.4 0.02 240)',
            800: 'oklch(0.3 0.02 240)',
            900: 'oklch(0.2 0.02 240)',
            950: 'oklch(0.15 0.02 240)', // Dark foreground
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'mono': ['monospace'],
        'serif': ['Georgia', 'serif'],
      },
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}