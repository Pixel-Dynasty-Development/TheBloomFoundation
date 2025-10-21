import { loadComponents } from "./load-components.js";

// UPDATED: Changed the glob import options to the new syntax
const pageModules = import.meta.glob("/src/pages/*.html", {
	query: "?raw",
	import: "default",
	eager: true,
});

const pageContent = document.getElementById("page-content");

// Create the pages object directly from the imported modules
const pages = {
	home: pageModules["/src/pages/home.html"],
	"about-us": pageModules["/src/pages/about-us.html"],
	"contact-us": pageModules["/src/pages/contact-us.html"],
};

const showPage = (pageName) => {
	const html = pages[pageName];
	if (html) {
		pageContent.innerHTML = html;
		window.scrollTo({ top: 0, behavior: "smooth" });
		lucide.createIcons();
		loadComponents();
	} else {
		// Fallback to home page if route is invalid
		pageContent.innerHTML = pages.home;
		window.scrollTo({ top: 0, behavior: "smooth" });
		lucide.createIcons();
		loadComponents();
	}
};

const handleRouting = () => {
	const hash = window.location.hash.slice(1);
	showPage(hash || "home");
};

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);

// Simple mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
});

// Initialize Lucide icons
lucide.createIcons();

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Function to set the theme
const setTheme = (theme) => {
	if (theme === "dark") {
		htmlElement.classList.add("dark");
		localStorage.setItem("theme", "dark");
	} else {
		htmlElement.classList.remove("dark");
		localStorage.setItem("theme", "light");
	}
};

// Check for saved theme preference or system preference
const currentTheme =
	localStorage.getItem("theme") ||
	(window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light");

setTheme(currentTheme);

themeToggle.addEventListener("click", () => {
	if (htmlElement.classList.contains("dark")) {
		setTheme("light");
	} else {
		setTheme("dark");
	}
});
