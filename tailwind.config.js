module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Add this line
  ],
}