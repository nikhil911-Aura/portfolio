export const profile = {
  name: "Nikhil Singh",
  role: "Full Stack Engineer",
  location: "Indore, India",
  current: { title: "Assistant Software Engineer", company: "Walkover Web Solutions" },
  email: "baghelnikhil911@gmail.com",
  phone: "+91 97557 16505",
  phoneHref: "tel:+919755716505",
  resume: "/resume.pdf",
};

export const socials = [
  { label: "GitHub", handle: "Nick-ui911", href: "https://github.com/Nick-ui911" },
  { label: "LinkedIn", handle: "nikhil-singh", href: "https://www.linkedin.com/in/nikhil-singh-318515308" },
  { label: "LeetCode", handle: "NikhilSingh01", href: "https://leetcode.com/u/NikhilSingh01/" },
];

export const sections = [
  { id: "about", num: "01", label: "About" },
  { id: "expertise", num: "02", label: "Expertise" },
  { id: "work", num: "03", label: "Selected Work" },
  { id: "experience", num: "04", label: "Experience" },
  { id: "open-source", num: "05", label: "Open Source" },
  { id: "contact", num: "06", label: "Contact" },
] as const;

export const disciplines = [
  {
    title: "Frontend",
    desc: "Responsive, accessible interfaces with a focus on clarity and performance.",
    skills: ["React", "Next.js", "TypeScript", "Redux", "Recoil", "React Query", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend & Data",
    desc: "APIs and real-time services designed to stay fast and predictable as they grow.",
    skills: ["Node.js", "Express", "REST", "GraphQL", "WebSockets", "MongoDB", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    title: "DevOps & Cloud",
    desc: "Automated pipelines and container platforms that make shipping routine.",
    skills: ["Docker", "Kubernetes", "Helm", "ArgoCD", "AWS", "GitHub Actions"],
  },
  {
    title: "AI & Automation",
    desc: "LLM features and workflow automation wired into real products and operations.",
    skills: ["OpenAI API", "GenAI APIs", "LangChain", "n8n", "Prompt Engineering"],
  },
];

export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  live: string;
  source?: string;
}

export const projects: Project[] = [
  {
    title: "DevWorld",
    category: "Developer community platform",
    description:
      "A community platform for developers with real-time chat over Socket.io, JWT and OAuth sign-in, Razorpay payments and a connections feed.",
    tech: ["Next.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    live: "https://www.devworld.in/",
    source: "https://github.com/Nick-ui911/Dev-World",
  },
  {
    title: "NovaChat AI",
    category: "Generative AI product",
    description:
      "A streaming AI chat application built on the Gemini API, with multi-session context and conversations that pick up where you left off.",
    tech: ["React", "Node.js", "Express", "Gemini API"],
    live: "https://nova-ai-lyart-pi.vercel.app/",
    source: "https://github.com/Nick-ui911/NovaChat-Ai",
  },
  {
    title: "Book Your Event",
    category: "Booking & payments",
    description:
      "Event booking and management with real-time seat selection, Stripe checkout and an admin dashboard for organisers.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
    live: "https://book-your-event.vercel.app/",
    source: "https://github.com/Nick-ui911/Book-Your-Event",
  },
  {
    title: "MotoPulse",
    category: "Server-rendered community app",
    description:
      "A home for motorcycle enthusiasts — ride tracking, community forums and route planning, rendered on the server for speed.",
    tech: ["Next.js", "Node.js", "MongoDB", "Mapbox"],
    live: "https://moto-pulse.vercel.app/",
    source: "https://github.com/Nick-ui911/MotoPulse",
  },
  {
    title: "Karya",
    category: "Project management",
    description: "A project management tool for organising projects, tracking tasks and keeping teams in step.",
    tech: [],
    live: "https://karya.ibrcloud.com/",
  },
];

export const experience = [
  {
    period: "May 2026 — Present",
    role: "Assistant Software Engineer",
    company: "Walkover Web Solutions",
    location: "Indore",
    points: ["Working across the full stack on production products."],
  },
  {
    period: "Feb 2026 — Apr 2026",
    role: "Junior MERN Stack & Automation Developer",
    company: "IBR Infotech LLP",
    location: "Indore · On-site",
    points: [
      "Built scalable full-stack applications on the MERN stack.",
      "Developed AI-assisted automation workflows with n8n and GenAI APIs.",
      "Designed CI/CD pipelines with GitHub Actions.",
      "Deployed with Docker, Kubernetes, Helm and ArgoCD on AWS.",
    ],
  },
  {
    period: "Jan 2025 — Jun 2025",
    role: "Software Engineer Intern",
    company: "Alphawizz Pvt Ltd",
    location: "Indore",
    points: [
      "Improved React app performance by 20% through memoisation and lazy loading.",
      "Built Redux state management for complex multi-step flows.",
      "Integrated secure REST APIs with proper authentication and validation.",
    ],
  },
];
