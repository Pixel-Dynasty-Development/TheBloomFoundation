// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import { glob } from "glob";
import tailwindcss from "@tailwindcss/vite";

// Find all HTML files to create a multi-page app input
const htmlFiles = glob
	.sync(["./*.html", "./src/pages/**/*.html"])
	.reduce((acc, file) => {
		const name =
			file.startsWith("./src/pages/") ?
				file.substring("./src/pages/".length, file.length - ".html".length)
			:	file.substring(2, file.length - ".html".length);

		// Use 'main' for the root index.html
		const key = name === "index" ? "main" : name;

		acc[key] = resolve(__dirname, file);
		return acc;
	}, {});

export default defineConfig({
	// Project root directory (where index.html is)
	root: "./",
	plugins: [tailwindcss()],

	build: {
		// Output directory for the build
		outDir: "dist",

		rollupOptions: {
			// Define the entry points for your multi-page app
			input: htmlFiles,
		},
	},

	// Directory for static assets
	publicDir: "public",
});
