/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#212e44',
        terracotta: '#eb7e56',
        beige: '#e4ceac',
        white: '#f9f6f0',
        'dark-tan': '#947955',
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['80px', { lineHeight: '0.85', letterSpacing: '-2.4px' }],
        'h2': ['60px', { lineHeight: '0.85', letterSpacing: '-1.8px' }],
        'h3': ['40px', { lineHeight: '1.0', letterSpacing: '-1.2px' }],
        'h4': ['30px', { lineHeight: '1.0', letterSpacing: '-0.9px' }],
        'body': ['18px', { lineHeight: '1.4', letterSpacing: '-0.54px' }],
        'label': ['14px', { lineHeight: '1.0', letterSpacing: '0.7px' }],
        'overline': ['14px', { lineHeight: '1.0', letterSpacing: '0.7px' }],
      },
      spacing: {
        'section': '15rem',
        'section-mobile': '8rem',
        'content': '3rem',
        'grid-gap': '6rem',
      },
      maxWidth: {
        'container': '1400px',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
