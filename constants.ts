
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
    challengeImagesCaption: "Alongside serving customers and packaging products, we had to use these sheets to identify which products each branch had ordered and in what quantities — a task that required considerable time and concentration during busy hours."
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
