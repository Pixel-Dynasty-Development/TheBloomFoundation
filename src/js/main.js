import { loadComponents } from "./load-components.js";

// Import all HTML pages as raw strings
const pageModules = import.meta.glob("/src/pages/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});

const pageContent = document.getElementById("page-content");

// ---------------------------------------------------------
// 👥 TEAM DATA CONFIGURATION
// ---------------------------------------------------------
const boardMembers = [
  {
    id: 1,
    name: "Isaiah Blevins",
    title: "CEO/Chairman",
    image: "https://placehold.co/400x400/png?text=Isaiah",
    bio: "<p>Jane has been leading non-profits for over 15 years. Her passion for community service started when she organized local food drives in high school. Under her leadership, The Bloom Foundation has grown from a small initiative to a county-wide support system.</p><p>In her free time, Jane enjoys hiking in the Smokies and gardening.</p>",
  },
  {
    id: 2,
    name: "Ashton Loomis",
    title: "COO/President",
    image: "https://placehold.co/400x400/png?text=Ashton",
    bio: "<p>John brings over 20 years of financial expertise to the board. As a certified CPA, he ensures transparency and efficiency in all our operations.</p><p>He is dedicated to ensuring every dollar donated goes directly to helping families in need.</p>",
  },
  {
    id: 3,
    name: "Shawn Miller",
    title: "Vice President",
    image: "https://placehold.co/400x400/png?text=Shawn",
    bio: "<p>Sarah is a local educator with a deep understanding of the challenges our youth face. She documents our journey and keeps our mission on track.</p><p>She believes that education and basic needs go hand in hand.</p>",
  },
  {
    id: 4,
    name: "Nicolas Bennett",
    title: "Treasurer",
    image: "https://placehold.co/400x400/png?text=Nicolas",
    bio: "Roots & Background: I am Nicolas Bennett and I grew up in Dandridge 🏡 in the home my parents still live in now. Growing up in the area and attending Jefferson County High School rooted my deep commitment to this community.<br><br>Education: My educational journey continued at Bryan College 🎓, where I earned three distinct degrees:<br>Associate's in Business<br>Bachelor's in Business Management<br>Master's in Sports Management<br><br>This diverse background has equipped me with a strong blend of business acumen and a specialized understanding of community engagement through the lens of sports ⚾.<br><br>My Mission My primary focus now is to leverage this experience and my dedication to the place I call home. I am actively helping to launch a foundation with the singular goal of giving back.",
  },
  {
    id: 5,
    name: " Debilliam Delgado",
    title: "Secretary",
    image: "https://placehold.co/400x400/png?text=Debilliam",
    bio: "About Me: Hi there! 👋 My name is Debbie and I am from Ponce, Puerto Rico 🇵🇷. I moved to central Florida when I was only 6 years old, and even at such a young age, family has always been super important to me.<br><br>The Mission: When I moved to East Tennessee ⛰️ a little over three years ago, something about the growth of the Hispanic community really stuck out to me. With the noticeable development and amazing expansion of Hispanic families in counties like Jefferson and Hamblen, it is evident that a lot of families don’t have enough resources to meet their basic needs.<br><br>My Commitment:  I have always wanted to be a part of something bigger than myself and I truly believe that The Bloom Foundation is just that.<br>As Secretary of the Board 📝, I plan to serve this community with an unwavering commitment to help address these needs and create a lasting impact. It is a privilege to be able to join my colleagues in making the hopeful future everyone deserves a reality for every family.",
  },
];

// ---------------------------------------------------------
// 🧭 ROUTING LOGIC
// --------------------------------------------------------->

const pages = {
  home: pageModules["/src/pages/home.html"],
  "about-us": pageModules["/src/pages/about-us.html"],
  "contact-us": pageModules["/src/pages/contact-us.html"],
  "board-member": pageModules["/src/pages/board-member.html"],
};

// Map URL paths to page keys
const routes = {
  "/": "home",
  "/index.html": "home",
  "/about": "about-us",
  "/contact": "contact-us",
};

// Function to render content based on the current path
const handleRouting = () => {
  const path = window.location.pathname;

  // 1. Check for Board Member Dynamic Route (e.g., /about/board/1)
  if (path.startsWith("/about/board/")) {
    const memberId = parseInt(path.split("/").pop());
    renderBoardMember(memberId);
    return;
  }

  // 2. Standard Page Routing
  const pageKey = routes[path] || "home"; // Default to home if unknown
  const html = pages[pageKey];

  if (html) {
    pageContent.innerHTML = html;
    loadComponents();

    // Check if we need to render the board grid (for the About Us page)
    renderBoardGrid();

    // Only scroll to top if not just navigating back
    window.scrollTo({ top: 0, behavior: "smooth" });
    lucide.createIcons();
  } else {
    // 404 handling could go here, for now default to home
    pageContent.innerHTML = pages.home;
    loadComponents();
    renderBoardGrid();
    lucide.createIcons();
  }
};

// Function to render the list of board members on the About Us page
const renderBoardGrid = () => {
  const gridContainer = document.getElementById("board-grid");
  if (gridContainer) {
    const gridHtml = boardMembers
      .map(
        (member) => `
        <a href="/about/board/${member.id}" class="group">
          <div class="relative mx-auto mb-4 h-40 w-40">
            <img
              src="${member.image}"
              alt="${member.name}"
              class="h-full w-full rounded-full object-cover shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
            />
          </div>
          <h3
            class="group-hover:text-brand-green text-xl font-bold text-gray-800 transition-colors dark:text-gray-100"
          >
            ${member.name}
          </h3>
          <p class="text-brand-brown dark:text-brand-orange font-medium">
            ${member.title}
          </p>
        </a>
      `,
      )
      .join("");
    gridContainer.innerHTML = gridHtml;
  }
};

// Function to render a specific board member
const renderBoardMember = (id) => {
  const memberIndex = boardMembers.findIndex((m) => m.id === id);
  const member = boardMembers[memberIndex];
  let template = pages["board-member"];

  if (member && template) {
    // Calculate Next and Prev IDs (looping)
    const prevIndex =
      memberIndex === 0 ? boardMembers.length - 1 : memberIndex - 1;
    const nextIndex =
      memberIndex === boardMembers.length - 1 ? 0 : memberIndex + 1;

    const prevId = boardMembers[prevIndex].id;
    const nextId = boardMembers[nextIndex].id;

    // Replace placeholders with actual data
    const filledHtml = template
      .replace(/{{name}}/g, member.name)
      .replace(/{{title}}/g, member.title)
      .replace(/{{image}}/g, member.image)
      .replace(/{{bio}}/g, member.bio)
      .replace(/{{prevLink}}/g, `/about/board/${prevId}`)
      .replace(/{{nextLink}}/g, `/about/board/${nextId}`);

    pageContent.innerHTML = filledHtml;
    loadComponents();
    window.scrollTo({ top: 0, behavior: "smooth" });
    lucide.createIcons();
  } else {
    // If member not found, redirect to about page
    navigateTo("/about");
  }
};

// Function to handle navigation without page reload
const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  handleRouting();
};

// Event listener for Back/Forward browser buttons
window.addEventListener("popstate", handleRouting);

// Event listener for Initial Load
window.addEventListener("DOMContentLoaded", handleRouting);

// Intercept all clicks on <a> tags to use the router
document.body.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  // If clicked element is a link and internal (starts with /)
  if (link && link.getAttribute("href")?.startsWith("/")) {
    e.preventDefault();
    navigateTo(link.getAttribute("href"));
  }
  // Allow anchor links (e.g., #contact) to work normally if needed
});
