/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  theme: {
    // extend: {
      extend: {
        // colors:{
        //  'bg-row':'#82e3af'
        // },
        backgroundColor:{
        //   green:{
        //     50: '#fdf8f6',
        //     100: '#ADBC9F',
        //     200: '#e4eae1',
        //     300: '#9ABD97',
        //     400: '#d2bab0',
        //     500: '#bfa094',
        //     600: '#a0b597',
        //     700: '#346a35',
        //     800: '#346a35',
        //     900: '#346a35',
        //   },
        //   'color-theme1':'#FAA916'
        // },
        // colors:{
        //   green:{
        //     50: '#fdf8f6',
        //     100: '#ADBC9F',
        //     200: '#e4eae1',
        //     300: '#c9d5c3',
        //     400: '#d2bab0',
        //     500: '#bfa094',
        //     600: '#a0b597',
        //     700: '#346a35',
        //     800: '#346a35',
        //     900: '#346a35',
        //   },
          'color-theme-1':'#C2EFB3',
          // 'color-theme-2':'#DEC1FF',
          // 'color-theme-3':'#EEC584',
          'color-theme-4':'#BFD7EA',
          'color-theme-5':'#dce7c8',
          // 'color-theme-6':'#ffdad7',
          // 'color-theme-7':'#adc6ff'

        }
      },
    
    // },
   
  },
  plugins: [require('flowbite/plugin')({
    charts: true,
}),],
}

