/** @type {import('tailwindcss').Config} */

const CUSTOM_CREAM = "#FCEDDC";
const CUSTOM_GREEN = "#1A8C92";
const CUSTOM_RED = "#991737";
const CUSTOM_PURPLE = "#2E1739";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        custom: {
          cream: CUSTOM_CREAM,
          green: CUSTOM_GREEN,
          red: CUSTOM_RED,
          purple: CUSTOM_PURPLE,
        },
      },
    },
  },
  plugins: [],
};
