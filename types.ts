
export interface Project {
  id: number;
  title: string;
  tags: string[];
  image: string;
  description: string;
  // New fields for Case Study Detail
  client?: string;
  role?: string;
  product?: string;
  challenge?: string;
  challengeTitle?: string; // Custom heading for the challenge section (defaults to "The Challenge")
  challengeImages?: string[]; // Shown side by side under the challenge text
  challengeImagesCaption?: string;
  process?: string; // New field for the "The Process" section
  solution?: string;
  images?: string[]; // For a gallery inside the detail page
  tools?: string[];
  timeline?: string;
  team?: string;
  // New fields for detailed process breakdown
  processImage?: string;
  processSteps?: ProcessStep[];
  // Closing media shown after the last process step, before the footer
  closingImage?: string;
  // Optional external article link (e.g., Virgool) shown on the Work card
  articleUrl?: string;
  articleLabel?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
  image: string;
  caption?: string; // Optional caption shown under the step image
  wide?: boolean; // Render the image edge-to-edge (no container constraint)
  figmaEmbedUrl?: string;
  // Sub-headings rendered under the description (e.g., "Key Learnings" items)
  subsections?: { title: string; description: string }[];
  // Extra images rendered side by side instead of a single image (e.g., "Project Outcome")
  images?: string[];
}

export interface Service {
  title: string;
  description: string;
  tags: string[];
  // New specific fields for About section customization
  backgroundImage?: string;
  spotifyEmbedUrl?: string;
  linkedinUrl?: string;
  dribbbleUrl?: string;
  latestDribbbleProject?: {
    title: string;
    image: string;
    url: string;
  };
  audioUrl?: string;
  certificate?: {
    title: string;
    issuer: string;
    year?: string;
    link?: string;
    logo?: string;
  };
  volunteer?: {
    role: string;
    organization: string;
    year: string;
    logo?: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}