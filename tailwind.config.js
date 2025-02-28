/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Purple
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        secondary: {
          DEFAULT: '#4B5563', // Gray
          light: '#6B7280',
          dark: '#374151',
        },
        background: {
          DEFAULT: '#111827', // Dark gray/black
          light: '#1F2937',
          dark: '#030712',
        },
      },
    },
  },
  plugins: [],
};