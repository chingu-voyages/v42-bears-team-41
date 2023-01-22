const DaisyUI = require("daisyui");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [DaisyUI],

  daisyui: {
    themes: ["emerald", "night"],
    darkTheme: "night",
  },
};
