export interface ResumeUI {
  availableForHire: string;
  role: string;
  emailBtn: string;
  githubBtn: string;
  portfolioBtn: string;
  downloadBtn: string;
  downloadUrl: string;
  beginQuest: string;
  sections: {
    experience: string;
    skills: string;
    education: string;
    projects: string;
    contact: string;
  };
  activeJob: string;
  skillCategories: {
    frontend: string;
    design: string;
    uiFrameworks: string;
    tools: string;
    backend: string;
    languages: string;
  };
  playground: {
    title: string;
    instructions: string;
  };
  footer: string;
}

export interface Resume {
  name: string;
  title: string;
  summary: string;
  contacts: {
    location: string;
    phone: string;
    whatsapp: boolean;
    email: string;
    website: string;
    github: string;
  };
  experience: {
    company: string;
    location: string;
    role: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    responsibilities: string[];
  }[];
  skills: {
    frontend: string[];
    design: string[];
    uiFrameworks: string[];
    tools: string[];
    backend: string[];
  };
  languages: { language: string; level: string }[];
  education: {
    institution: string;
    location: string;
    degree: string;
    startDate: string;
    endDate: string | null;
    note: string | null;
  }[];
  projects: {
    name: string;
    url: string;
    description: string;
  }[];
  ui: ResumeUI;
}
