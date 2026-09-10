import preset from "sila-ui/preset";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "../../packages/sila-ui/src/**/*.{ts,tsx}",
  ],
};
