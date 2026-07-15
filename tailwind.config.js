/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#0a0a0a',
        smoke: '#121212',
        panel: '#161616',
        line: '#262626',
        steel: '#9a9a96',
        bone: '#e8e6e1',
        ember: '#ff6700',
        emberDark: '#c95200',
        spark: '#ffb347',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        wider2: '0.18em',
        wider3: '0.3em',
      },
    },
  },
  plugins: [],
}
