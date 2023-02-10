const DaisyUI = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [DaisyUI],

  daisyui: {
    themes: [
      {
        emerald: {
          ...require("daisyui/src/colors/themes")["[data-theme=emerald]"],
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
        },
        night: require("daisyui/src/colors/themes")["[data-theme=night]"],
      },
    ],
    darkTheme: "night",
  },
};
