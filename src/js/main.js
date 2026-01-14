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
    bio: "<p>My name is Isaiah. I am one of the only members not originally from Tennessee, but my time here has made me realize there are specific needs in my community that I am eager to meet. I come from a small town in West Virginia, raised by a widowed grandmother, and taught the values and meaning of hard work. This hard work has fueled my passion for community service and bettering the lives of others around me. I graduated from Southern WV Community College with my Associates in Business Administration, where I remained on the Dean’s List. I then continued my education with Western Governors University where I graduated with my BS in Business Management. I have now been exploring my options for obtaining my MBA. My love for continued knowledge and growth have allowed me to research my community and pinpoint the needs they require. As CEO, it is my responsibility, duty, and goal to ensure that The Bloom Foundation is taking every step to positively reach and teach our mission. As a group, whole, and community, we will decrease the poverty and food insecurity in Jefferson and Hamblen County.</p>",
  },
  {
    id: 2,
    name: "Ashton Loomis",
    title: "COO/President",
    image: "https://placehold.co/400x400/png?text=Ashton",
    bio: "<p>My name is Ashton Loomis and I am a relatively new resident to Hamblen County. I was born at the University of Tennessee Hospital in Knoxville, but grew up in Washington, Pennsylvania close to the city of Pittsburgh. I achieved a Bachelor of Arts degree at Waynesburg University in Waynesburg, Pennsylvania and am currently working on my Masters in Criminal Justice and Criminology at ETSU. My daughter has been my driving force for doing more for the community. She is full of love and joy, and she has the kindest heart of any five year old I have ever encountered. Her enjoyment at being kind is something that I hope to share with the community, myself. My husband and I have been fortunate enough to provide our daughter the things she needs. He is a native of Jefferson County, and has discussed the struggles many go through, from hunger, mental health struggles, to homelessness and addiction. This made me stop and think about the things that would benefit the communities we know and love. The Bloom Foundation is a labor of love created by two friends and coworkers who want to give back to their community. Isaiah and I have recruited trustworthy, passionate people who share our vision for a better tomorrow for the youth and families of Hamblen and Jefferson Counties. Our hope is to do as much for our community as we can, and give back more and more as the years go on.</p>",
  },
  {
    id: 3,
    name: "Shawn Miller",
    title: "Vice President",
    image: "https://placehold.co/400x400/png?text=Shawn",
    bio: "<p>My name is Shawn. I am originally from Knoxville, TN, but have lived in Sevier County, TN for over 40 years now. I love East Tennessee and the people that live here. I firmly believe that charity begins at home, and I feel that means within our own community and our neighboring counties. I know what it is like to need help. From the time I was 10 years old until I finished high school, it was just me and my mom at home. She raised me alone, and I watched her work 2 jobs to provide for us. This also came with a lot of help and support from other people and organizations within the community. I am thankful for that experience, and want to pay it forward by helping The Bloom Foundation grow and help others in need. I attended Memphis State University and Walters State Community College before heading into the workforce. Throughout my career I have also had the pleasure of being a part of Leadership Tomorrow & Leadership Sevier. These programs include specialized training to increase the skills and talents of individuals currently working in leadership roles. It also increases awareness of the community by developing programs which address the issues affecting our county. I look forward to using these skills, resources and experience to help our community.</p>",
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
