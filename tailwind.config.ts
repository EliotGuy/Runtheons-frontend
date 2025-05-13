import type { Config } from 'tailwindcss';
const { heroui } = require('@heroui/react');

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './molecules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif']
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      boxShadow: {
        'inset-black': 'inset 0px 0px 5px #000000',
        'inset-black1': 'inset 0px 0px 5px #000000A8'
      },
      screens: {
        xs: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        mxl: '1280px',
        xl: '1440px',
        '2xl': '1536px',
        '3xl': '1800px'
      }
    }
  },
  plugins: [heroui()]
} satisfies Config;
