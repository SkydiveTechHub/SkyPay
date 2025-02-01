import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				pryColor: "#020d1e",
			},
			fontFamily: {
				urbanist: ["Urbanist", "sans-serif"],
				zen: ["Zen Kaku Gothic Antique", "sans-serif"],
				rope: ["Manrope", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
				int: ["Inter", "sans-serif"],
				mul: ["Mulish", "sans-serif"],
			},
		},
	},
	plugins: [],
};
export default config;
