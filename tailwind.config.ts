/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#e6f2ff",
          100: "#cce4ff",
          200: "#99c9ff",
          300: "#66adff",
          400: "#3392ff",
          500: "#0077ff",
          600: "#005fcc",
          700: "#004799",
          800: "#003066",
          900: "#001833",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      minHeight: {
        '32': '8rem',
      },
    },
  },
  plugins: [],
};