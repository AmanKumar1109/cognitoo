import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../components/ThemeContext";
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  X,
  Send,
  Plus,
  CheckCircle2,
  Building,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BriefcaseBusiness,
  AlertCircle,
  Award,
  Shield,
  MessageSquare
} from "lucide-react";
import gsap from "gsap";

const CATEGORIES = ["All", "Web Dev", "AI / ML", "UI/UX", "Marketing", "Management"];
const JOB_TYPES = ["All", "Full-time", "Part-time", "Remote", "Contract", "Internship"];

const DEFAULT_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer (React)",
    company: "PixelPerfect",
    logoBg: "from-violet-500 to-indigo-600",
    category: "Web Dev",
    location: "Remote (India)",
    salary: "₹12 - ₹18L / yr",
    type: "Remote",
    skills: ["React.js", "Tailwind CSS", "TypeScript", "Redux"],
    description: "We are looking for a passionate Senior Frontend Engineer to craft stunning user experiences for our next-generation web platforms. You will collaborate closely with product design teams to build scalable applications.",
    duties: [
      "Develop responsive and high-performance Web apps using React and TypeScript",
      "Collaborate with UI/UX designers to translate Figma mockups to pixel-perfect code",
      "Optimize applications for maximum speed and load efficiency",
      "Write comprehensive unit and integration tests"
    ],
    requirements: [
      "4+ years of professional web development experience with React",
      "Expert knowledge of Tailwind CSS, CSS Grid/Flexbox, and motion libraries",
      "Strong understanding of state management (Redux, Zustand, Context API)",
      "Excellent communication and collaboration skills"
    ],
    postedDate: "2026-07-15"
  },
  {
    id: 2,
    title: "Generative AI Specialist",
    company: "NeuralLabs AI",
    logoBg: "from-pink-500 to-rose-600",
    category: "AI / ML",
    location: "Bangalore, IN",
    salary: "₹18 - ₹28L / yr",
    type: "Full-time",
    skills: ["Python", "PyTorch", "LLMs", "LangChain", "RAG"],
    description: "Join the core AI team at NeuralLabs. You will help build and fine-tune large language models and integrate them into enterprise systems through intelligent agents and retrieval frameworks.",
    duties: [
      "Fine-tune pre-trained models (e.g. Llama-3, Mistral) for custom industry use cases",
      "Build robust Retrieval-Augmented Generation (RAG) vector pipelines",
      "Optimize model inference and deploy LLMs to AWS/GCP infrastructures",
      "Stay updated on the latest generative AI research and techniques"
    ],
    requirements: [
      "Solid experience with Python, PyTorch, and deep learning architectures",
      "Proven track record building LLM apps using LangChain or LlamaIndex",
      "Experience with Vector Databases like Pinecone, Milvus, or Qdrant",
      "BS/MS in Computer Science, Data Science, or related engineering field"
    ],
    postedDate: "2026-07-16"
  },
  {
    id: 3,
    title: "Lead UI/UX Product Designer",
    company: "CreativeFlow",
    logoBg: "from-amber-400 to-orange-500",
    category: "UI/UX",
    location: "Mumbai, IN",
    salary: "₹14 - ₹20L / yr",
    type: "Full-time",
    skills: ["Figma", "Design Systems", "Prototyping", "UX Research"],
    description: "CreativeFlow is looking for a Lead UI/UX Designer to own our product design lifecycle. You will shape visual style guides, build intuitive dashboards, and mentor junior design teammates.",
    duties: [
      "Lead design brainstorming, workshops, and user journeys",
      "Create high-fidelity mockups, UI components, and click-through prototypes in Figma",
      "Establish and maintain a scalable cross-platform design system",
      "Conduct user interviews and run usability tests to iterate layouts"
    ],
    requirements: [
      "5+ years of product design experience (SaaS/B2B dashboard design is a plus)",
      "An exceptional portfolio showing end-to-end design thinking and execution",
      "Mastery of Figma, Framer, and modern asset production tools",
      "Deep understanding of design guidelines and accessibility standards"
    ],
    postedDate: "2026-07-14"
  },
  {
    id: 4,
    title: "Backend Engineer (Node.js & Go)",
    company: "StackScale",
    logoBg: "from-teal-400 to-emerald-600",
    category: "Web Dev",
    location: "Remote (Global)",
    salary: "$65,000 - $90,000 / yr",
    type: "Contract",
    skills: ["Node.js", "Go", "PostgreSQL", "Redis", "Docker"],
    description: "StackScale builds cloud infrastructure tooling. We are hiring a backend engineer who excels at building reliable APIs and highly concurrent background job processors.",
    duties: [
      "Design, implement, and maintain high-performance microservices in Node/Go",
      "Optimize SQL query plans and caching layers in Postgres and Redis",
      "Integrate third-party API providers and secure webhooks",
      "Collaborate with Devops team on containerized microservices deployment"
    ],
    requirements: [
      "3+ years building backend systems using Node.js or Go",
      "Strong database knowledge, especially PostgreSQL schema design and scaling",
      "Familiarity with Docker, Kubernetes, and AWS infrastructure basics",
      "Comfortable working async in a fully distributed remote team"
    ],
    postedDate: "2026-07-12"
  },
  {
    id: 5,
    title: "Product Manager Intern",
    company: "LaunchPad Tech",
    logoBg: "from-sky-400 to-blue-600",
    category: "Management",
    location: "Hyderabad, IN",
    salary: "₹40k - ₹50k / mo",
    type: "Internship",
    skills: ["Agile", "Product Analytics", "Jira", "Market Research"],
    description: "We are looking for a high-energy Product Manager Intern. This is a hands-on learning role where you will coordinate directly between engineering, design, and marketing to launch new features.",
    duties: [
      "Gather feature requests, draft product requirements documents (PRDs)",
      "Analyze user behavior data using Mixpanel or Google Analytics",
      "Manage sprint backlogs, document release notes, and run QA reviews",
      "Conduct research on competitive landscape and customer needs"
    ],
    requirements: [
      "Currently pursuing or recently finished a degree in Tech/Business",
      "High curiosity for software products and digital business models",
      "Strong analytical mindset and familiarity with analytical tools",
      "Exceptional written communication skills to write clear specs"
    ],
    postedDate: "2026-07-17"
  },
  {
    id: 6,
    title: "Senior Data Analyst",
    company: "InsightCore",
    logoBg: "from-fuchsia-500 to-purple-600",
    category: "Marketing",
    location: "Pune, IN",
    salary: "₹10 - ₹13L / yr",
    type: "Part-time",
    skills: ["SQL", "Python", "Tableau", "Stats"],
    description: "InsightCore helps enterprise retail brands interpret user behavior patterns. We need a Senior Data Analyst to build dynamic customer segment tables and executive reporting systems.",
    duties: [
      "Write complex SQL queries to extract data across multi-tenant warehouse systems",
      "Design interactive dashboards in Tableau to display growth metrics",
      "Perform A/B testing statistical checks and draft recommendation slide-decks",
      "Train cross-functional users to access self-serve analytics engines"
    ],
    requirements: [
      "4+ years of data analysis or business intelligence experience",
      "Expert SQL proficiency (Window functions, CTEs, performance tuning)",
      "Strong experience building clear, intuitive dashboards in Tableau or PowerBI",
      "Familiarity with Python (Pandas, Numpy) for cohort studies"
    ],
    postedDate: "2026-07-10"
  }
];

function JobCard({ job, index, onClick }) {
  const cardRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.07, ease: "power2.out" }
    );
  }, [job.id]);

  const handleHover = (enter) => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      y: enter ? -3 : 0,
      scale: enter ? 1.005 : 1,
      boxShadow: enter
        ? "rgba(50, 50, 93, 0.04) 0px 6px 12px -2px, rgba(0, 0, 0, 0.02) 0px 3px 7px -3px"
        : "rgba(50, 50, 93, 0.02) 0px 2px 5px 0px, rgba(0, 0, 0, 0.01) 0px 1px 1px 0px",
      borderColor: enter ? "var(--color-brand-primary-soft)" : "var(--color-hairline)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const initial = job.company.substring(0, 2).toUpperCase();

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="bg-white rounded-xl border border-hairline overflow-hidden shadow-sm flex flex-col justify-between h-full transition-all duration-150"
    >
      <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3.5">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          {/* Avatar */}
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${job.logoBg} flex items-center justify-center text-[16px] font-semibold text-white shrink-0 shadow-sm`}>
            {initial}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Company Name at the top next to the square box */}
            <p className="text-[11px] text-ink-muted font-semibold uppercase tracking-wider truncate mb-0.5">{job.company}</p>
            {/* Job Title / Role */}
            <h3 className="text-[14px] font-semibold text-ink leading-tight truncate pr-1">
              {job.title}
            </h3>
            {/* Location where the remote tag was */}
            <p className="text-[11px] text-ink-muted font-normal mt-1 flex items-center gap-1">
              <MapPin style={{ width: 12, height: 12 }} className="text-ink-muted shrink-0" />
              <span className="truncate">{job.location}</span>
            </p>
          </div>
        </div>

        {/* Remote tag at top right */}
        <button className="text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider text-brand-primary bg-brand-primary-light border border-brand-primary-soft/15 hover:bg-brand-primary/10 transition-colors duration-150 cursor-pointer shrink-0 mt-0.5">
          {job.type}
        </button>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-hairline" />

      {/* Bio */}
      <div className="px-5 pt-3 pb-3">
        <p className="text-[12px] text-ink-secondary leading-relaxed line-clamp-2">{job.description}</p>
      </div>

      {/* Skills tags */}
      <div className="px-5 pb-3 flex flex-wrap gap-1.5">
        {job.skills.map((s) => (
          <span key={s} className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-canvas-soft border border-hairline text-ink-secondary">
            {s}
          </span>
        ))}
      </div>

      {/* Footer stats in separate buttons */}
      <div className="mx-5 mb-4 mt-1 flex gap-2">
        {/* Highlighted Wages button with high contrast green */}
        <button 
          style={{
            backgroundColor: isDark ? "rgba(15, 81, 50, 0.2)" : "#ffffff",
            color: isDark ? "#34d399" : "#15803d",
            borderColor: isDark ? "rgba(163, 207, 187, 0.2)" : "var(--color-hairline)"
          }}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-[12px] hover:opacity-90 transition-all duration-150 cursor-pointer min-w-[100px] font-bold tnum truncate"
        >
          <svg 
            style={{ color: isDark ? "#34d399" : "#15803d" }}
            className="w-3.5 h-3.5 shrink-0" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
            <rect x="16" y="8" width="6" height="8" rx="1" />
          </svg>
          <span className="truncate">{job.salary}</span>
        </button>
      </div>

      {/* CTA Buttons */}
      <div className="px-5 pb-5 flex gap-2">
        <button
          onClick={onClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer"
        >
          Apply Now
        </button>
        <button
          onClick={onClick}
          className="w-8.5 h-8.5 rounded-lg border border-hairline bg-white flex items-center justify-center text-ink-muted hover:border-hairline-strong hover:text-ink transition-all duration-150 cursor-pointer shrink-0"
        >
          <ChevronRight style={{ width: 14, height: 14 }} />
        </button>
      </div>
    </div>
  );
}

function PostJobModal({ onClose, onAddJob }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  // Form Fields State
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("Web Dev");
  const [type, setType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [duties, setDuties] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState("");

  const logoGradients = [
    "from-violet-500 to-indigo-600",
    "from-pink-500 to-rose-600",
    "from-amber-400 to-orange-500",
    "from-teal-400 to-emerald-600",
    "from-sky-400 to-blue-600",
    "from-fuchsia-500 to-purple-600",
  ];

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    gsap.fromTo(cardRef.current, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.4)" });
  }, []);

  const handleClose = () => {
    gsap.to(cardRef.current, { opacity: 0, y: 24, scale: 0.96, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in", onComplete: onClose });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !location.trim() || !salary.trim() || !description.trim()) {
      setError("Please fill in all required fields marked with *");
      return;
    }

    const skillsArray = skills
      ? skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : ["General"];

    const dutiesArray = duties
      ? duties.split("\n").map((d) => d.trim()).filter((d) => d.length > 0)
      : ["Collaborate with engineering team", "Maintain quality assurance standard checkmarks"];

    const reqsArray = requirements
      ? requirements.split("\n").map((r) => r.trim()).filter((r) => r.length > 0)
      : ["Relevant educational or portfolio experience", "Good soft skills and proactive problem solving"];

    const randomGradient = logoGradients[Math.floor(Math.random() * logoGradients.length)];

    const newJob = {
      id: Date.now(),
      title,
      company,
      logoBg: randomGradient,
      category,
      location,
      salary,
      type,
      skills: skillsArray,
      description,
      duties: dutiesArray,
      requirements: reqsArray,
      postedDate: new Date().toISOString().split("T")[0]
    };

    onAddJob(newJob);
    handleClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#0d253d]/40 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={cardRef}
        className="bg-white rounded-xl w-full max-w-[620px] overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh] border border-hairline"
      >
        {/* Header */}
        <div
          className="px-6 py-5 relative shrink-0 stripe-mesh-gradient"
        >
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-white">Post a Job Opening</h2>
                <p className="text-[11px] text-white/70 font-normal mt-0.5">Publish your requirements to Cognitoo learners</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-7.5 h-7.5 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Body Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {error && (
            <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-[12px] font-semibold">
              <AlertCircle style={{ width: 16, height: 16 }} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Job Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior React Developer"
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Company Name *</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal cursor-pointer pr-8"
              >
                {CATEGORIES.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-3 top-[36px] pointer-events-none text-ink-muted">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Job Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="appearance-none w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal cursor-pointer pr-8"
              >
                {JOB_TYPES.slice(1).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="absolute right-3 top-[36px] pointer-events-none text-ink-muted">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Location *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bangalore, IN or Remote"
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Salary Range *</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. ₹10-15L / yr"
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, TypeScript, Git, Tailwind"
              className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Job Description *</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the company, product, and scope of this role..."
              className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light resize-none transition-all duration-150 leading-relaxed font-normal"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Key Duties (One per line)</label>
              <textarea
                rows={3}
                value={duties}
                onChange={(e) => setDuties(e.target.value)}
                placeholder="Write code cleanly&#10;Implement layout structures&#10;Mentor junior devs"
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light resize-none transition-all duration-150 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Requirements (One per line)</label>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="3+ years React experience&#10;Bachelor in CS or equivalent&#10;Strong GitHub profile"
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light resize-none transition-all duration-150 leading-relaxed font-normal"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4 text-white" />
            Publish Job Listing
          </button>
        </form>
      </div>
    </div>
  );
}

function JobDetailModal({ job, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  // Application flow state
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicantName, setApplicantName] = useState("Jason Ranti");
  const [applicantEmail, setApplicantEmail] = useState("jason.ranti@example.com");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(cardRef.current, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.2)" });
  }, []);

  const handleClose = () => {
    gsap.to(cardRef.current, { opacity: 0, y: 30, scale: 0.95, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in", onComplete: onClose });
  };

  const handleApply = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const initial = job.company.substring(0, 2).toUpperCase();

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d253d]/40 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      {/* Clean single-column layout, perfectly aligned matching CourseModal/FreelancerModal */}
      <div
        ref={cardRef}
        className="bg-white rounded-xl w-full max-w-[580px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh] border border-hairline"
      >
        {/* Header */}
        <div
          className="px-6 py-5 relative shrink-0 stripe-mesh-gradient"
        >
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${job.logoBg} flex items-center justify-center text-[16px] font-semibold text-white shadow-sm border border-white/15`}>
                {initial}
              </div>
              <div>
                <span className="text-[8px] font-bold uppercase tracking-widest bg-white/15 text-white px-2 py-0.5 rounded leading-none inline-block">
                  {job.category}
                </span>
                <h2 className="text-[16px] font-semibold text-white mt-1 leading-snug">{job.title}</h2>
                <p className="text-[11px] text-white/70 font-normal mt-0.5">{job.company}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-7.5 h-7.5 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Content (Single Column) */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-[15px] font-semibold text-ink">Application Submitted!</h3>
              <p className="text-[13px] text-ink-muted mt-1 max-w-[280px]">
                Jason, your application has been successfully sent to {job.company}.
              </p>
            </div>
          ) : !showApplyForm ? (
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-3 bg-canvas-soft border border-hairline rounded-lg p-4">
                <div className="text-center border-r border-hairline">
                  <span className="text-[9px] text-ink-muted font-semibold uppercase tracking-wider block">Location</span>
                  <span className="text-[13px] text-ink font-semibold mt-0.5 block">{job.location}</span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-ink-muted font-semibold uppercase tracking-wider block">Job Type</span>
                  <span className="text-[13px] text-ink font-semibold mt-0.5 block">{job.type}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-[11.5px] font-semibold text-ink uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-brand-primary" />
                  About The Role
                </h4>
                <p className="text-[12.5px] text-ink-secondary leading-relaxed font-normal">
                  {job.description}
                </p>
              </div>

              {/* Duties */}
              {job.duties && job.duties.length > 0 && (
                <div>
                  <h4 className="text-[11.5px] font-semibold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2.5">
                    {job.duties.map((duty, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-ink-secondary font-normal leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h4 className="text-[11.5px] font-semibold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-brand-primary" />
                    Requirements
                  </h4>
                  <ul className="space-y-2.5">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-ink-secondary font-normal leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Tags */}
              <div>
                <h4 className="text-[9.5px] font-semibold text-ink-muted uppercase tracking-wider mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill) => (
                    <span key={skill} className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-canvas-soft border border-hairline text-ink-secondary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Money Written directly in Apply CTA Button */}
              <div className="pt-4 border-t border-hairline">
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer shadow-sm"
                >
                  Apply Now • {job.salary}
                </button>
              </div>
            </div>
          ) : (
            /* Quick Apply Form View */
            <form onSubmit={handleApply} className="space-y-4">
              <div className="pb-1 border-b border-hairline flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-semibold text-ink">Submit Application</h4>
                  <p className="text-[10px] text-ink-muted font-normal mt-0.5">Fill out your credentials to apply</p>
                </div>
                <span className="text-[12px] font-semibold text-brand-primary">{job.salary}</span>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-wide block mb-1">Your Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-[12.5px] text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-wide block mb-1">Email Address</label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-[12.5px] text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-wide block mb-1">Portfolio or GitHub URL</label>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-[12.5px] text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-ink-muted uppercase tracking-wide block mb-1">Introduce Yourself</label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell the team why you are a great fit..."
                  className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2.5 text-[12.5px] text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light resize-none transition-all duration-150 leading-relaxed font-normal"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="text-[12px] font-semibold text-ink-muted hover:text-ink py-2 cursor-pointer"
                >
                  Back to details
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-soft text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
                >
                  Submit Application
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Jobs() {
  const pageContainerRef = useRef(null);
  const headerRef = useRef(null);

  // Core Listings State
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");

  // Modal display states
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  // Initialize from storage or defaults
  useEffect(() => {
    const stored = localStorage.getItem("cognitoo_jobs");
    if (stored) {
      try {
        setJobs(JSON.parse(stored));
      } catch (err) {
        setJobs(DEFAULT_JOBS);
      }
    } else {
      setJobs(DEFAULT_JOBS);
      localStorage.setItem("cognitoo_jobs", JSON.stringify(DEFAULT_JOBS));
    }
  }, []);

  // Entrance & Sparkle Floating Animations
  useEffect(() => {
    gsap.fromTo(pageContainerRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
    gsap.fromTo(headerRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
  }, []);

  const handleAddJob = (newJob) => {
    const updated = [newJob, ...jobs];
    setJobs(updated);
    localStorage.setItem("cognitoo_jobs", JSON.stringify(updated));
  };

  // Filter listings
  const filtered = jobs.filter((job) => {
    const matchesCategory = activeCategory === "All" || job.category === activeCategory;
    const matchesType = activeType === "All" || job.type === activeType;

    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.skills.some((s) => s.toLowerCase().includes(query));

    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div ref={pageContainerRef} className="min-h-full bg-canvas-soft flex flex-col">
      {/* Hero Header (Exact visual layout of Freelancer Hero Header) */}
      <div
        ref={headerRef}
        className="relative overflow-hidden px-8 pt-8 pb-8 shrink-0 stripe-mesh-gradient"
      >
        <div className="relative">
          {/* Title Row */}
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-sm">
              <BriefcaseBusiness style={{ width: 18, height: 18 }} className="text-white" />
            </div>
            <div>
              <h1 className="text-[20px] font-semibold text-white leading-tight tracking-tight">Jobs Board</h1>
              <p className="text-[11px] text-white/70 font-normal">Explore career opportunities or hire top talent for your team</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-4 mt-4 mb-5">
            {[
              { icon: Shield, label: "Verified Listings" },
              { icon: CheckCircle2, label: "Secure Applications" },
              { icon: Award, label: "Top Tech Companies" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon style={{ width: 13, height: 13 }} className="text-white/85" />
                <span className="text-[11px] font-medium text-white/85">{label}</span>
              </div>
            ))}
          </div>

          {/* Search bar & Post Job Button (Beside Search bar, White theme) */}
          <div className="flex flex-row items-center gap-3 max-w-xl mt-4">
            <div
              className="flex-1 flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-4 py-2.5"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              <Search style={{ width: 16, height: 16 }} className="text-white/60 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title, company, or skills..."
                className="flex-1 bg-transparent text-[13px] text-white placeholder-white/50 outline-none font-normal min-w-0"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-white/60 hover:text-white cursor-pointer shrink-0">
                  <X style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="flex items-center justify-center gap-1.5 bg-white text-brand-primary px-3.5 py-2.5 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-all duration-150 shadow-sm cursor-pointer shrink-0"
            >
              <Plus style={{ width: 14, height: 14 }} className="text-brand-primary" />
              Post Job
            </button>
          </div>
        </div>
      </div>

      {/* Filters (Exact structural match of Freelancer Page) */}
      <div className="shrink-0 px-8 py-3.5 bg-white border-b border-hairline flex items-center justify-between gap-4 flex-wrap">
        {/* Category Pills on the Left */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 cursor-pointer"
              style={
                activeCategory === cat
                  ? { background: "var(--color-brand-primary)", color: "white", boxShadow: "0 2px 6px rgba(83,58,253,0.2)" }
                  : { background: "var(--color-canvas-soft)", color: "var(--color-ink-muted)", border: "1px solid var(--color-hairline)" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right side controls: Job Type dropdown */}
        <div className="flex items-center gap-3">
          {/* Job Type Dropdown Filter */}
          <div className="relative flex items-center bg-canvas-soft border border-hairline rounded-lg px-3 py-1.5">
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="appearance-none bg-transparent text-[12px] font-semibold text-ink outline-none pr-6 cursor-pointer"
            >
              <option value="All">All Types</option>
              {JOB_TYPES.slice(1).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="absolute right-2 pointer-events-none text-ink-muted">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Jobs Listing Grid (Exact match of Freelancer Grid) */}
      <div className="flex-1 px-8 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white/40 border border-hairline rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-white border border-hairline flex items-center justify-center mb-4 shadow-sm">
              <Search style={{ width: 22, height: 22 }} className="text-ink-muted" />
            </div>
            <h3 className="text-[14px] font-semibold text-ink">No listings found</h3>
            <p className="text-[12px] text-ink-muted mt-1">Try a different category, type, or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((job, idx) => (
              <JobCard key={job.id} job={job} index={idx} onClick={() => setSelectedJob(job)} />
            ))}
          </div>
        )}
      </div>

      {/* Post Modal Form Dialog */}
      {showPostModal && (
        <PostJobModal onClose={() => setShowPostModal(false)} onAddJob={handleAddJob} />
      )}

      {/* Details Apply Sheet Dialog */}
      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
}
