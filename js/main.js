import { loadComponents } from "./load-components.js";

// Simple client-side router
const pageContent = document.getElementById("page-content");

const pages = {
  home: "pages/home.html",
  "about-us": "pages/about-us.html",
  "contact-us": "pages/contact-us.html",
};

const showPage = (pageName) => {
  const pagePath = pages[pageName];
  if (pagePath) {
    fetch(pagePath)
      .then((response) => response.text())
      .then((html) => {
        pageContent.innerHTML = html;
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Re-initialize Lucide icons for newly loaded content
        lucide.createIcons();
        // Load components within the newly loaded page
        loadComponents();
      })
      .catch((error) =>
        console.error(`Error loading ${pageName} page:`, error)
      );
  } else {
    // Load home page if the requested page doesn't exist
    fetch(pages.home)
      .then((response) => response.text())
      .then((html) => {
        pageContent.innerHTML = html;
        window.scrollTo({ top: 0, behavior: "smooth" });
        lucide.createIcons();
        loadComponents();
      })
      .catch((error) => console.error(`Error loading home page:`, error));
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

// Initialize Lucide icons (for initial load, subsequent loads handled by showPage)
lucide.createIcons();

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
const moonIcon = themeToggle.querySelector('svg[data-lucide="moon"]');
const sunIcon = themeToggle.querySelector('svg[data-lucide="sun"]');

// Function to set the theme
const setTheme = (theme) => {
  if (theme === "dark") {
    htmlElement.classList.add("dark");
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    localStorage.setItem("theme", "dark");
  } else {
    htmlElement.classList.remove("dark");
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
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
