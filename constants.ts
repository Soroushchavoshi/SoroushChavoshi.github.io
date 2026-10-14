
import { Project, Service } from './types';

// Visibility toggle for the About section (and its "About" link in the header/menu).
// Set to true whenever you want the About section back.
export const SHOW_ABOUT = false;

// The header Resume link downloads this file directly.
export const RESUME_URL = '/Soroush_Chavoshi_Resume.pdf';

// ==========================================
// PROJECT DATA (CASE STUDIES)
// ==========================================
// To add a new project, copy one of the objects below enclosed in {} 
// and paste it at the top of the list.
//
// Field Guide:
// id: Unique number for the project.
// title: The main headline on the card and detail page.
// tags: An array of exactly two strings (e.g., ["Fintech App", "2024"]).
// image: The main cover image (Hero image).
// description: Short summary shown on the home page card.
// client: (Detail Page) Name of the client.
// role: (Detail Page) Your specific role (e.g., Lead Designer).
// product: (Detail Page) Name of the specific product worked on.
// challenge: (Detail Page) Text describing the problem.
// process: (Detail Page) Text describing the methodology/process.
// solution: (Detail Page) Text describing your approach.
// images: (Detail Page) An array of extra images shown in the grid.

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "From Scattered Orders to a Structured Ordering System",
    tags: [],
    image: "/images/Zeero-Cover.jpg", // Main Cover Image
    description: "Designing an Ordering App for Torreh Bakery",
    
    // --- Detail Page Content ---
    client: "Torreh Bakery & Café",
    role: "Product Designer",
    product: "Torreh Bakery Ordering App",
    tools: ["Figma", "Figjam", "Pen & Paper"],
    challengeTitle: "The Problem",
    challenge: "This project started with a real problem in my workplace.\n\nIn Khordad 1405 (June 2026), amid challenging conditions in the design job market, I started working as a sales associate at Torreh Bakery & Café.\n\nAt the central branch, my colleagues and I were responsible for preparing bread and pastry orders for the other branches.\n\nEvery morning, orders from the other branches were sent to us through messages and recorded on a handwritten sheet. The inconsistent handwriting and lack of structure made the orders difficult to read, especially during busy hours.\n\nAs someone directly involved in this process, I decided to find a way to make order management simpler and more structured.",
    challengeImages: [
      "/images/Torreh-orders-1.jpg",
      "/images/Torreh-orders-2.jpg"
    ],
    challengeImagesCaption: "Alongside serving customers and packaging products, we had to use these sheets to identify which products each branch had ordered and in what quantities — a task that required considerable time and concentration during busy hours.",

    processSteps: [
      {
        title: "Was This Really a Problem?",
        description: "Although my colleagues and I encountered difficulties when working with handwritten order sheets, I wanted to explore whether structuring the information more clearly could actually improve the process.\n\nTo test this idea, I created a simple table without changing the order-entry process itself. Orders were still recorded manually, and my goal was to see whether employees would prefer the new table to the previous method.",
        image: "/images/Torreh-table.jpg",
        caption: "Experimental Ordering Table: In this version, each row represented a product, while each of the three gray columns represented a branch."
      },
      {
        title: "From a Simple Table to a Systemized Process",
        description: "The new table made orders easier to read, but recording the information was still a manual process that took employees time every morning and left room for errors.\n\nI wanted to go beyond improving the appearance of the order list and systemize the entire process, allowing branches to submit their orders directly and the central branch staff to receive the information in an organized, structured format.",
        image: "/images/Torreh-app-first-version.png",
        wide: true,
        caption: "I built the initial version of the app with the help of AI tools and made it available to the employees."
      },
      {
        title: "Observe, Iterate, Improve",
        description: "After building the initial version, I observed my colleagues as they used the app and gathered feedback about their experience.\n\nBased on these observations, I made small changes and shared updated versions with them.\n\nI worked through this process with two colleagues, gradually improving the user interface and adding new features along the way.",
        image: "/images/Torreh-app-iterations.png",
        wide: true,
        caption: "AI tools helped me quickly address the small issues I observed and see how those changes affected my colleagues’ behavior as they used the app."
      },
      {
        title: "The Final Solution",
        description: "After several rounds of iteration, we arrived at a more mature version of the ordering app.\n\nInstead of sending messages and having the central branch manually record orders, other branches could now submit orders directly through the app.\n\nAt the central branch, the person who previously had to collect messages and manually record every order each morning could now view orders from all branches in a structured table, review them, and print them with a single click.\n\nMy colleagues then received the printed sheet and used it to pick the items for each order.",
        image: "/images/Torreh-app-final-solution.png",
        wide: true,
        caption: "Each branch submitted its orders through its own interface, while the central branch could view all orders in one place and print them with a single click."
      },
      {
        title: "Key Learnings",
        description: "",
        image: "",
        subsections: [
          {
            title: "Iterative Improvements Over Major Redesigns",
            description: "Small, rapid iterations helped me identify problems during actual use and gradually improve the product experience without needing major redesigns."
          },
          {
            title: "Designing in the Real World, with Real Constraints",
            description: "This project taught me that getting started doesn’t always require ideal research processes or extensive resources. Even carefully observing a few users in their actual work environment can provide valuable insights, as long as the limitations of those observations are also acknowledged."
          }
        ]
      },
      {
        title: "Project Outcome",
        description: "",
        image: "",
        images: [
          "/images/Torreh-printed-orders.jpg",
          "/images/Torreh-handwritten-orders.jpg"
        ],
        caption: "The ordering process shifted from collecting messages and recording orders manually to digital order submission and printing a structured table."
      }
    ],
    closingImage: "/images/Torreh-bakery-animation.gif",
    articleUrl: "https://virgool.io/@Soroushchavoshi/%D8%A7%D8%B2-%D8%B3%D9%81%D8%A7%D8%B1%D8%B4-%D9%87%D8%A7%DB%8C-%D9%BE%D8%B1%D8%A7%DA%A9%D9%86%D8%AF%D9%87-%D8%AA%D8%A7-%D8%B3%D9%81%D8%A7%D8%B1%D8%B4-%DA%AF%DB%8C%D8%B1%DB%8C-%D8%B3%D8%A7%D8%AE%D8%AA%D8%A7%D8%B1%DB%8C%D8%A7%D9%81%D8%AA%D9%87-%D8%A8%DB%8C%D9%86-%D8%B4%D8%B9%D8%A8-%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%A7%D9%BE%D9%84%DB%8C%DA%A9%DB%8C%D8%B4%D9%86-%D8%B3%D9%81%D8%A7%D8%B1%D8%B4-%DA%AF%DB%8C%D8%B1%DB%8C-%D8%B4%D8%B9%D8%A8-%D9%86%D8%A7%D9%86%D9%88%D8%A7%DB%8C%DB%8C-%D9%88-%D9%82%D9%86%D8%A7%D8%AF%DB%8C-%D8%B7%D8%B1%D9%87-cmxvt1r1cxuw",
    articleLabel: "خواندن به فارسی در ویرگول"
  },
  {
    id: 2,
    title: "CardToCard:",
    tags: [],
    image: "/images/Project2-1.jpg",
    description: "Designing a Persian-language card-to-card transfer MVP.",
    
    // --- Detail Page Content ---
    client: "CardToCard, Persian-language card-to-card transfer app",
    role: "Product Designer (Solo)",
    tools: ["Figma", "Pen & Paper"],
    challenge: "Designing a Minimum Viable Product (MVP) from scratch for a Persian-language card-to-card transfer app.",
    process: "Selected direct competitors and reviewed their features. Applied MoSCoW (Must-Have) to map features and determine essential elements for the MVP, reaching theoretical saturation.",
    
    // New Process Image
    processImage: "/images/Project2-3.jpg",

    // New 5 Steps
    processSteps: [
      {
        title: "Sketching",
        description: "First, after defining the MVP must-haves, I created quick paper sketches to outline the structure.",
        image: "/images/Project2-4.jpg"
      },
      {
        title: "5-Second Test",
        description: "Conducted 5-second tests on the main card-to-card flow with 5 participants. The goal was to ensure the MVP clearly conveys the core operation.",
        image: "/images/Project2-5.jpg"
      },
      {
        title: "Low-Fidelity Prototype & Usability Testing",
        description: "Converted the paper sketches into a low-fidelity prototype to conduct clearer usability tests.",
        image: "",
        figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FGD5Stoz7wl6diKJn7MXm3U%2FCarTbeCartT-CaseStudy%3Fnode-id%3D0-1%26p%3Df%26viewport%3D458%252C-841%252C0.09%26t%3D7NI7rqsHj7yxavU5-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D76%253A674%26show-proto-sidebar%3D1"
      },
      {
        title: "Key Insights",
        description: "Usability testing with 5 participants revealed the key insights, as they thought aloud, reported issues, and rated task difficulty on a 1–5 scale.",
        image: "/images/Project2-6.jpg"
      },
      {
        title: "Design System",
        description: "Used the Yoko Space RTL design system as the foundation for crafting the high-fidelity screens.",
        image: "/images/Project2-7.jpg"
      },
      {
        title: "Final Design",
        description: "Refined the UI based on the proposed solutions and usability insights",
        image: "/images/Project2-8.jpg"
      },
      {
        title: "Interactive Prototype",
        description: "Watch and interact with the final flow directly in Figma.",
        image: "",
        figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FGD5Stoz7wl6diKJn7MXm3U%2FCarTbeCartT-CaseStudy%3Fnode-id%3D157-5217%26viewport%3D907%252C-4011%252C0.17%26t%3DEISObYzGUvSkiYd8-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26starting-point-node-id%3D157%253A5217%26show-proto-sidebar%3D1"
      }
    ],

    timeline: "1 Week",
    team: "Solo Project",
    
    images: [
      "/images/Project2-2.jpg",
      "https://picsum.photos/id/48/1200/800",
      "https://picsum.photos/id/59/1200/800"
    ]
  }
];

// ==========================================
// SERVICES & ABOUT DATA
// ==========================================

export const SERVICES: Service[] = [
  {
    title: "Latest Accomplishments",
    description: "For a closer look at my accomplishments, ",
    tags: ["Discovery", "Research"],
    linkedinUrl: "https://www.linkedin.com/in/soroushchavoshi/",
    volunteer: {
        role: "Peer Reviewer",
        organization: "UXPA International Conference",
        year: "2026",
        logo: "https://conveyux.com/wp-content/uploads/uxpaINTERN_web150x260px.png"
    }
  },
  {
    title: "Design as a Daily Practice",
    description: "You can follow my ongoing creative journey, ",
    tags: ["Design", "Dribbble"],
    dribbbleUrl: "https://dribbble.com/soroushchavoshi",
    latestDribbbleProject: {
      title: "Mascot Logo Design",
      image: "https://cdn.dribbble.com/userupload/46124320/file/feb8e14ede1d3732b455bc107d65e537.jpg?format=webp&resize=700x525&vertical=center",
      url: "https://dribbble.com/shots/26903786-Mascot-Logo-Design"
    }
  },
  {
    title: "The Team Catalyst",
    description: "I love encouraging people to keep moving.",
    tags: ["Community", "Cycling"], 
    backgroundImage: "/images/bike-group.jpg" 
  }
];
