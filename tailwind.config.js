/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        typewriter: 'typewriter 2s steps(11) forwards',
        caret: 'typewriter 2s steps(11) forwards, blink 1s steps(11) infinite 2s',
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', 'Times', 'serif'],
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "50%": {
            width: "50%",
            visibility: "visible"
          },
          "100%": {
            width: "100%",
            visibility: "visible"
          },
        },
        blink: {
          "0%, 100%": {
            borderColor: "transparent"
          },
          "50%": {
            borderColor: "currentColor"
          },
        },
      },
      animation: {
        typing: "typing 3s steps(30) infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [require('daisyui')],
};
