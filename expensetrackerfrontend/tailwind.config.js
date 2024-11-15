const { nextui } = require("@nextui-org/theme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // For Next.js 13+ in `app` directory
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
	darkMode: "class",
  plugins: [nextui()],
}