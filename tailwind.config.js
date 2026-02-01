/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1E8',
        beige: '#E8DCC4',
        tan: '#C9B89A',
        caramel: '#B89968',
        olive: '#8B8B6B',
        brown: '#6B5D52',
        'dark-brown': '#3D3530',
        'paper': '#F2EBE3',
        'bronze': '#A88F72',
        'charcoal': '#1A1A1A',
      },
      fontFamily: {
        script: ['Dancing Script', 'cursive'],
        serif: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '0.2em',
        'ultra-wide': '0.3em',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      aspectRatio: {
        '2/3': '2 / 3',
        '3/2': '3 / 2',
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
};
