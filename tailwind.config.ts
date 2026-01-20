import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#99b1bd',
          50: '#f4f7f8',
          100: '#e9eff1',
          200: '#d3dfe3',
          300: '#bdcfd5',
          400: '#a7bfc7',
          500: '#99b1bd',
          600: '#7a8e9a',
          700: '#5c6b73',
          800: '#3d474d',
          900: '#1f2426',
        },
        secondary: {
          DEFAULT: '#2e4b74',
          50: '#eef2f7',
          100: '#dce5ef',
          200: '#b9cbdf',
          300: '#97b1cf',
          400: '#7497bf',
          500: '#2e4b74',
          600: '#253c5d',
          700: '#1c2d46',
          800: '#131e2e',
          900: '#0a0f17',
        },
      },
    },
  },
  plugins: [],
}
export default config
