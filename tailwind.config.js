/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  content: [
    "./projects/**/src/**/*.{html,ts}",
    "./libs/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      rotate: {
        '270': '270deg',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      }
    },
    darkMode: "class"
  },
  plugins: [],
}

