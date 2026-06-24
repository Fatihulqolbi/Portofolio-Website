// ============================================
// SITE CONFIGURATION
// Edit this file to update your portfolio data
// ============================================

export const siteConfig = {
  // Personal Information
  name: "Muhammad Fatihul Qolbi Ash Shiddiqi",
  shortName: "Obi",
  brand: "Obi",
  brandDev: "Obi.dev",
  role: "AI Engineer | Fullstack Developer | IoT Enthusiast",
  location: "Surabaya, Indonesia",
  university: "Institut Teknologi Sepuluh Nopember",
  major: "Information Technology",

  // Hero Section
  hero: {
    greeting: "Hello There!",
    badge: "Hi, I'm Obi",
    headline:
      "I'm Obi — Muhammad Fatihul Qolbi, AI Engineer, Fullstack Developer & IoT Enthusiast Based in Indonesia.",
    subheadline:
      "Information Technology student at Institut Teknologi Sepuluh Nopember, passionate about building intelligent systems, scalable web applications, and IoT solutions.",
    ctaButtons: [
      { label: "View My Portfolio", href: "#projects", variant: "primary" as const },
      { label: "Hire Me", href: "#contact", variant: "secondary" as const },
      { label: "Download CV", href: "/cv.pdf", variant: "outline" as const },
    ],
    badges: [
      "AI Engineer",
      "Fullstack Developer",
      "IoT Developer",
      "Web Developer",
      "Software Engineer",
      "ITS Student",
    ],
  },

  // About Section
  about: {
    description:
      "Saya adalah Muhammad Fatihul Qolbi Ash Shiddiqi, biasa dipanggil Obi. Saya merupakan Mahasiswa Teknologi Informasi di Institut Teknologi Sepuluh Nopember yang memiliki ketertarikan besar pada AI Engineering, Fullstack Development, dan Internet of Things. Saya fokus membangun solusi digital yang cerdas, fungsional, scalable, dan memiliki dampak nyata.",
    highlights: [
      "Information Technology Student at ITS",
      "AI Engineer",
      "Fullstack Developer",
      "IoT Enthusiast",
      "Problem Solver",
      "Tech Product Builder",
    ],
    tagline: "Driven by technology, design, and problem solving.",
    subTagline: "Focused on building impactful digital products.",
    stats: [
      { label: "Tech Focus Areas", value: "3+" },
      { label: "Specialization", value: "AI, Web, IoT" },
      { label: "Location", value: "Indonesia" },
      { label: "University", value: "ITS" },
    ],
  },

  // Social Links - Easy to edit
  socials: {
    linkedin: "https://www.linkedin.com/in/muhammad-fatihul-qolbi-ash-shiddiqi/",
    github: "https://github.com/Fatihulqolbi",
    instagram: "https://www.instagram.com/fatihulqolbi.js/",
    email: "fatihulqolbi02@gmail.com",
    whatsapp: "https://wa.me/6287759765892",
  },

  // Navigation
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievements", href: "#achievements" },
    { label: "Writing", href: "#writing" },
    { label: "Detail Contact", href: "#contact" },
  ],
};

// ============================================
// SKILLS DATA
// ============================================

export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Language",
    items: [
      { name: "Python", icon: "/Skills/python.png" },
      { name: "C", icon: "/Skills/c.png" },
      { name: "C++", icon: "/Skills/c++.png" },
      { name: "JavaScript", icon: "/Skills/javascript.png" },
      { name: "HTML", icon: "/Skills/html.png" },
      { name: "CSS", icon: "/Skills/Css.png" },
    ],
  },
  {
    category: "Framework & Library",
    items: [
      { name: "Next.js", icon: "/Skills/next.png" },
      { name: "React", icon: "/Skills/react.png" },
      { name: "Tailwind CSS", icon: "/Skills/tailwind.png" },
      { name: "TensorFlow", icon: "/Skills/tensorflow.png" },
    ],
  },
  {
    category: "DBMS",
    items: [
      { name: "MySQL", icon: "/Skills/mysql.png" },
      { name: "PostgreSQL", icon: "/Skills/Postgree.png" },
      { name: "MongoDB", icon: "/Skills/Mongodb.png" },
    ],
  },
  {
    category: "Hardware & IoT",
    items: [
      { name: "Arduino", icon: "/Skills/arduino.png" },
      { name: "MQTT", icon: "/Skills/mqtt.png" },
    ],
  },
  {
    category: "AI & Data",
    items: [
      { name: "Jupyter", icon: "/Skills/jupyter.png" },
      { name: "Kaggle", icon: "/Skills/kaggle.png" },
    ],
  },
  {
    category: "DevOps & Version Control",
    items: [
      { name: "Docker", icon: "/Skills/docker.png" },
      { name: "Git", icon: "/Skills/git.png" },
      { name: "GitHub", icon: "/Skills/github.png" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "VS Code", icon: "/Skills/vscode.png" },
      { name: "Apidog", icon: "/Skills/apidog.png" },
      { name: "Figma", icon: "/Skills/Figma.png" },
      { name: "Discord", icon: "/Skills/discord.png" },
    ],
  },
  {
    category: "Operating System",
    items: [
      { name: "Linux", icon: "/Skills/Linux.png" },
      { name: "Windows", icon: "/Skills/Windows.png" },
    ],
  },
  {
    category: "Game Dev",
    items: [
      { name: "Unity", icon: "/Skills/Unity.png" },
    ],
  },
];

// ============================================
// PROJECTS DATA
// ============================================

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  status?: "Completed" | "In Progress" | "Coming Soon";
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "AI-Based Smart Detection System",
    category: "AI Project",
    description:
      "An AI-powered system for automatic detection and data analysis using machine learning and computer vision techniques.",
    techStack: ["Python", "Machine Learning", "Computer Vision", "TensorFlow"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
  },
  {
    id: "2",
    title: "Personal Portfolio Website",
    category: "Web Development",
    description:
      "A modern, responsive personal portfolio website with smooth animations and an elegant dark theme design.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
  },
  {
    id: "3",
    title: "IoT Monitoring Dashboard",
    category: "IoT Project",
    description:
      "A real-time IoT sensor monitoring dashboard with interactive charts and live data streaming capabilities.",
    techStack: ["ESP32", "MQTT", "Node.js", "React"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
  },
  {
    id: "4",
    title: "Fullstack E-Commerce Platform",
    category: "Fullstack Application",
    description:
      "A complete e-commerce platform with payment integration, admin dashboard, and real-time inventory management.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "#",
    githubUrl: "#",
    status: "In Progress",
  },
  {
    id: "5",
    title: "Smart Home Automation System",
    category: "IoT Project",
    description:
      "An IoT-based smart home system with voice control, mobile app, and automated scheduling features.",
    techStack: ["ESP32", "Arduino", "React Native", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Coming Soon",
  },
  {
    id: "6",
    title: "NLP Sentiment Analysis Tool",
    category: "AI Project",
    description:
      "A natural language processing tool for analyzing sentiment in social media posts with real-time visualization.",
    techStack: ["Python", "NLP", "Flask", "React"],
    liveUrl: "#",
    githubUrl: "#",
    status: "Completed",
  },
];

// ============================================
// EDUCATION DATA
// ============================================

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  description: string;
  focusAreas: string[];
  logo?: string;
}

export const educationData: Education[] = [
  {
    id: "1",
    institution: "Institut Teknologi Sepuluh Nopember",
    degree: "Bachelor's Degree",
    field: "Information Technology",
    period: "2023 - Present",
    description:
      "Pursuing a degree in Information Technology with a focus on artificial intelligence, software engineering, and IoT systems.",
    focusAreas: [
      "Artificial Intelligence",
      "Software Engineering",
      "Web Development",
      "Internet of Things",
      "Database System",
      "Computer Network",
    ],
  },
];

// ============================================
// EXPERIENCE DATA
// ============================================

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: "Organization" | "Project" | "Freelance" | "Certification" | "Achievement" | "Bootcamp";
  description: string;
  highlights?: string[];
}

export const experienceData: Experience[] = [
  {
    id: "1",
    title: "AI Project Development",
    organization: "Personal Project",
    period: "2024 - Present",
    type: "Project",
    description:
      "Developed multiple AI-based projects including smart detection systems and NLP tools for various use cases.",
    highlights: [
      "Built machine learning models for data classification",
      "Implemented computer vision algorithms",
      "Deployed AI models for production use",
    ],
  },
  {
    id: "2",
    title: "Fullstack Web Application Development",
    organization: "Freelance & Personal",
    period: "2024 - Present",
    type: "Freelance",
    description:
      "Designed and developed modern web applications using React, Next.js, and Node.js for various clients and personal projects.",
    highlights: [
      "Built responsive web applications",
      "Integrated RESTful APIs and databases",
      "Implemented authentication and authorization",
    ],
  },
  {
    id: "3",
    title: "IoT System Prototype",
    organization: "Academic Project",
    period: "2024 - Present",
    type: "Project",
    description:
      "Developed IoT system prototypes using ESP32 and Arduino for smart monitoring and automation applications.",
    highlights: [
      "Designed sensor integration systems",
      "Built real-time monitoring dashboards",
      "Implemented MQTT communication protocols",
    ],
  },
  {
    id: "4",
    title: "Software Engineering Learning Journey",
    organization: "Self-Learning & Courses",
    period: "2023 - Present",
    type: "Bootcamp",
    description:
      "Continuous learning through online courses, bootcamps, and self-study in software engineering, AI, and IoT.",
    highlights: [
      "Completed multiple online certifications",
      "Participated in coding bootcamps",
      "Contributed to open-source projects",
    ],
  },
];

// ============================================
// PROJECT CATEGORIES FOR FILTER
// ============================================

export const projectCategories = [
  "All",
  "AI Project",
  "Web Development",
  "IoT Project",
  "Fullstack Application",
  "UI/UX Concept",
  "Game Dev",
];
