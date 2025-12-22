
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
  process?: string; // New field for the "The Process" section
  solution?: string;
  images?: string[]; // For a gallery inside the detail page
  tools?: string[];
  timeline?: string;
  team?: string;
  // New fields for detailed process breakdown
  processImage?: string;
  processSteps?: ProcessStep[];
}

export interface ProcessStep {
  title: string;
  description: string;
  image: string;
  figmaEmbedUrl?: string;
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