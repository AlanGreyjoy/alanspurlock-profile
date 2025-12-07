// Database entity types
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string | null;
  description?: string | null;
  highlights: string[];
  technologies: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalInfo {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  linkedin: string;
  twitter: string;
  github: string;
  createdAt: string;
  updatedAt: string;
}

export interface DownloadStats {
  total: number;
  aiOptimized: number;
  traditional: number;
}
