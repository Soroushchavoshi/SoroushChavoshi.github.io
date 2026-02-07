
import { Project, Service } from './types';

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
    id: 2,
    title: "CardToCard:",
    tags: ["MVP Design", "Solo Project", "1-Week Timeline"],
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
  },
  {
    id: 1,
    title: "Zeero:",
    tags: ["Redesign", "Mobility App"],
    image: "/images/Project1-1.jpg", // Main Cover Image
    description: "Enhancing the City Ride with Better User Experience",
    
    // --- Detail Page Content ---
    client: "Zeero, Mobility App",
    role: "Product Designer",
    product: "Zeero, Mobility App",
    tools: ["Figma", "Figjam", "Pen & Paper"],
    challenge: "I, along with my friend and colleague Kimia, as regular users of Zeero (an electric bike and motorcycle rental service), loved the idea but noticed several UX issues. We mapped the user journey to identify pain points and turned our assumptions into key questions.",
    process: "We kicked off with a series of stakeholder workshops to align on the core KPIs. Following this, I led a card-sorting session with 15 active traders to understand their mental models regarding asset categorization.\n\nMoving from low-fidelity sketches on Figjam to high-fidelity prototypes in Figma, we iterated based on weekly feedback loops, focusing heavily on reducing the cognitive load for new users while retaining speed for power users.",
    
    // New Process Image (appears after process text)
    processImage: "https://picsum.photos/id/3/1200/800",

    // New 5 Steps
    processSteps: [
      {
        title: "01. Discovery & Audit",
        description: "We began by auditing the existing platform to identify friction points. Heatmaps revealed that 60% of clicks were concentrated on just 10% of the features, indicating a need to declutter.",
        image: "https://picsum.photos/id/201/800/600"
      },
      {
        title: "02. User Interviews",
        description: "I conducted in-depth interviews with 10 power users and 5 novices. The key insight was that novices felt overwhelmed by data density, while power users wanted customization.",
        image: "https://picsum.photos/id/445/800/600"
      },
      {
        title: "03. Information Architecture",
        description: "Using the card sorting results, we restructured the navigation tree. We moved from a deep hierarchy to a broader, shallower structure to reduce the number of clicks to key actions.",
        image: "https://picsum.photos/id/6/800/600"
      },
      {
        title: "04. Wireframing & Prototyping",
        description: "Low-fidelity wireframes allowed us to test the new navigation flow without getting distracted by UI details. We validated the 'Quick Trade' feature placement early on.",
        image: "https://picsum.photos/id/119/800/600"
      },
      {
        title: "05. Validation & Handoff",
        description: "Final usability testing showed a 40% reduction in time-to-task. The design system was updated, and assets were handed off to developers via Zeplin with detailed documentation.",
        image: "https://picsum.photos/id/180/800/600"
      }
    ],

    timeline: "1 Month and 2 Weeks",
    
    // Additional images for the case study grid
    images: [
      "https://picsum.photos/id/1/1200/900",   // Full width image
      "https://picsum.photos/id/180/1200/800", // Grid image 1
      "https://picsum.photos/id/20/1200/800"   // Grid image 2
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
