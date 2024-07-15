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
        backgroundImage: {
          'hello': "url('Assets/Images/hello.png')",
          'hellooffice': "url('Assets/Images/hellooffice.png')",
          // 'heroku': "url('Assets/Images/wave.png')",
          // 'line': "url('Assets/Images/shiny.svg')",
          // 'simple': "url('Assets/Images/simple.svg')",
          // 'rect': "url('Assets/Images/rect.svg')",
          // 'ani': "url('Assets/Images/ani.svg')",
          // 'anitwo': "url('Assets/Images/anitwo.svg')",
        },
        backgroundColor:{
          green:{
            50: '#fdf8f6',
            100: '#ADBC9F',
            200: '#e4eae1',
            300: '#9ABD97',
            400: '#d2bab0',
            500: '#01AB01',
            600: '#019801',
            700: '#017f01',
            800: '#016501',
            900: '#004c00',
          },
        },
        //   'color-theme1':'#FAA916'
        // },
        colors:{
          green:{
            50: '#fdf8f6',
            100: '#ADBC9F',
            200: '#e4eae1',
            300: '#c9d5c3',
            400: '#d2bab0',
            500: '#01AB01',
            600: '#019801',
            700: '#017f01',
            800: '#016501',
            900: '#004c00',
          }
        
        

        }
      },
    
    // },
   
  },
  plugins: [require('flowbite/plugin')({
    charts: true,
}),],
}

