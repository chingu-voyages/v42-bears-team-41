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
    themes: ["emerald", "night"],
    darkTheme: "night",
  },
};
