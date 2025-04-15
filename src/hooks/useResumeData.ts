
import { useState, useEffect } from "react";

// Define types for resume data
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  linkedin: string;
  website: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Summary {
  professionalSummary: string;
  careerObjective: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  summary: Summary;
  selectedTemplate: string;
}

// Default empty values
const defaultResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    linkedin: "",
    website: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  summary: {
    professionalSummary: "",
    careerObjective: "",
  },
  selectedTemplate: "classic",
};

// Demo data
const demoResumeData: ResumeData = {
  personalInfo: {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
  },
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2018-09",
      endDate: "2022-05",
      location: "Berkeley, CA",
      gpa: "3.8/4.0",
      description: "Focus on Machine Learning and Data Structures",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tech Innovations Inc.",
      position: "Software Engineer",
      startDate: "2022-06",
      endDate: "",
      location: "San Francisco, CA",
      current: true,
      description: "Full-stack development of client-facing applications",
      bullets: [
        "Developed and maintained RESTful APIs for customer portal serving 50,000+ users",
        "Improved application loading time by 40% through code optimization",
        "Collaborated with UX team to redesign interface resulting in 25% increase in user satisfaction",
      ],
    },
    {
      id: "exp-2",
      company: "Digital Solutions LLC",
      position: "Software Developer Intern",
      startDate: "2021-05",
      endDate: "2021-08",
      location: "San Jose, CA",
      current: false,
      description: "Summer internship focused on front-end development",
      bullets: [
        "Built responsive UI components using React and TypeScript",
        "Participated in daily stand-ups and bi-weekly sprint planning",
        "Implemented automated testing improving code coverage by 15%",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Personal Portfolio Website",
      link: "github.com/alexj/portfolio",
      startDate: "2022-01",
      endDate: "2022-02",
      description: "Responsive portfolio website built with React and Tailwind CSS",
      bullets: [
        "Implemented light/dark mode with context API",
        "Integrated contact form with email service",
        "Optimized for all device sizes with responsive design",
      ],
    },
  ],
  skills: [
    {
      id: "cat-1",
      name: "Programming Languages",
      skills: [
        { id: "skill-1", name: "JavaScript", level: 5 },
        { id: "skill-2", name: "TypeScript", level: 4 },
        { id: "skill-3", name: "Python", level: 4 },
        { id: "skill-4", name: "Java", level: 3 },
      ],
    },
    {
      id: "cat-2",
      name: "Frameworks & Libraries",
      skills: [
        { id: "skill-5", name: "React", level: 5 },
        { id: "skill-6", name: "Node.js", level: 4 },
        { id: "skill-7", name: "Express", level: 4 },
        { id: "skill-8", name: "TailwindCSS", level: 5 },
      ],
    },
  ],
  summary: {
    professionalSummary:
      "Results-driven Software Engineer with a strong foundation in full-stack development. Passionate about creating efficient, user-friendly applications with clean, maintainable code. Experienced in agile environments and collaborative teamwork.",
    careerObjective:
      "Seeking a challenging position in a forward-thinking technology company where I can leverage my skills in software development to create innovative solutions and grow as a professional.",
  },
  selectedTemplate: "modern",
};

// LocalStorage key
const STORAGE_KEY = "resumeBuilderData";

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : defaultResumeData;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  // Update any part of the resume data
  const updateResumeData = (key: keyof ResumeData, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Load demo data
  const loadDemoData = () => {
    setResumeData(demoResumeData);
  };

  // Clear all data
  const clearResumeData = () => {
    setResumeData(defaultResumeData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    resumeData,
    updateResumeData,
    loadDemoData,
    clearResumeData,
  };
};
