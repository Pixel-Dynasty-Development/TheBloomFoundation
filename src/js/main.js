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
    loadComponents();
    window.scrollTo({ top: 0, behavior: "smooth" });
    lucide.createIcons();
  } else {
    // Fallback to home page if route is invalid

    pageContent.innerHTML = pages.home;
    loadComponents();
    window.scrollTo({ top: 0, behavior: "smooth" });

    lucide.createIcons();
  }
};

const handleRouting = () => {
  const hash = window.location.hash.slice(1);
  showPage(hash || "home");
};

window.addEventListener("hashchange", handleRouting);
window.addEventListener("DOMContentLoaded", handleRouting);
