import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.07, ease: "power2.out" }
    );
  }, [job.id]);

  const handleHover = (enter) => {
    gsap.to(cardRef.current, {
      y: enter ? -5 : 0,
      scale: enter ? 1.01 : 1,
      boxShadow: enter
        ? "0 16px 40px -8px rgba(94,92,230,0.14), 0 4px 12px -4px rgba(0,0,0,0.06)"
        : "0 1px 3px 0 rgba(0,0,0,0.04)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const initial = job.company.substring(0, 2).toUpperCase();

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="bg-white rounded-[22px] border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between h-full"
    >
      {/* Top bar (Exact Freelancer layout match) */}
      <div className="px-5 pt-5 pb-4 flex items-start gap-3.5">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.logoBg} flex items-center justify-center text-[18px] font-black text-white shrink-0 shadow-md`}>
          {initial}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-[14px] font-black text-slate-800 leading-tight truncate pr-1">
              {job.title}
            </h3>
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background: "linear-gradient(135deg,#5e5ce6,#807df6)" }}>
              {job.type}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug truncate">{job.company}</p>
          <p className="text-[10px] text-brand-primary font-bold mt-1 uppercase tracking-wider">{job.category}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-slate-100" />

      {/* Bio */}
      <div className="px-5 pt-3 pb-3">
        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">{job.description}</p>
      </div>

      {/* Skills tags */}
      <div className="px-5 pb-3 flex flex-wrap gap-1.5">
        {job.skills.map((s) => (
          <span key={s} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600">
            {s}
          </span>
        ))}
      </div>

      {/* Footer stats (Compensation, Location) */}
      <div className="mx-5 mb-4 mt-1 bg-slate-50 rounded-2xl px-4 py-2.5 flex items-center justify-between border border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium truncate">
          <MapPin style={{ width: 12, height: 12 }} className="text-slate-400 shrink-0" />
          {job.location}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium shrink-0">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
            <rect x="16" y="8" width="6" height="8" rx="1" />
          </svg>
          {job.salary}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-5 pb-5 flex gap-2">
        <button
          onClick={onClick}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-black text-white transition-all duration-150 cursor-pointer hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #5e5ce6, #807df6)", boxShadow: "0 4px 14px rgba(94,92,230,0.28)" }}
        >
          Apply Now
        </button>
        <button
          onClick={onClick}
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-light transition-all cursor-pointer shrink-0"
        >
          <ChevronRight style={{ width: 15, height: 15 }} />
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: "rgba(15,23,42,0.4)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={cardRef}
        className="bg-white rounded-[28px] w-full max-w-[620px] overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div
          className="px-6 py-5 relative shrink-0"
          style={{ background: "linear-gradient(135deg, #4a48e0 0%, #7b78f7 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-black text-white">Post a Job Opening</h2>
                <p className="text-[11px] text-white/70 font-semibold mt-0.5">Publish your requirements to Cognitoo learners</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Form Body Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-[12px] font-bold">
              <AlertCircle style={{ width: 16, height: 16 }} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Job Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior React Developer"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Company Name *</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all cursor-pointer pr-8"
              >
                {CATEGORIES.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-[34px] pointer-events-none text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Job Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="appearance-none w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all cursor-pointer pr-8"
              >
                {JOB_TYPES.slice(1).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-[34px] pointer-events-none text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Location *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bangalore, IN or Remote"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Salary Range *</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. ₹10-15L / yr"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, TypeScript, Git, Tailwind"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Job Description *</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the company, product, and scope of this role..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-medium text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white resize-none transition-all leading-relaxed"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Key Duties (One per line)</label>
              <textarea
                rows={3}
                value={duties}
                onChange={(e) => setDuties(e.target.value)}
                placeholder="Write code cleanly&#10;Implement layout structures&#10;Mentor junior devs"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[12px] font-medium text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white resize-none transition-all leading-relaxed"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Requirements (One per line)</label>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="3+ years React experience&#10;Bachelor in CS or equivalent&#10;Strong GitHub profile"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[12px] font-medium text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 focus:bg-white resize-none transition-all leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[13px] font-black text-white hover:opacity-95 transition-all duration-200 cursor-pointer shadow-lg shadow-indigo-100"
            style={{ background: "linear-gradient(135deg, #5e5ce6, #807df6)" }}
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      {/* Clean single-column layout, perfectly aligned matching CourseModal/FreelancerModal */}
      <div
        ref={cardRef}
        className="bg-white rounded-[28px] w-full max-w-[580px] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div
          className="px-6 py-6 relative shrink-0"
          style={{ background: "linear-gradient(135deg, #4a48e0 0%, #7b78f7 100%)" }}
        >
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.logoBg} flex items-center justify-center text-[18px] font-black text-white shadow-lg border border-white/10`}>
                {initial}
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider bg-white/15 text-white px-2.5 py-0.5 rounded leading-none inline-block">
                  {job.category}
                </span>
                <h2 className="text-[17px] font-black text-white mt-1 leading-snug">{job.title}</h2>
                <p className="text-[11px] text-white/70 font-semibold mt-0.5">{job.company}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/25 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Scroll Content (Single Column) */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-[16px] font-black text-slate-800">Application Submitted!</h3>
              <p className="text-[13px] text-slate-400 mt-1 max-w-[280px]">
                Jason, your application has been successfully sent to {job.company}.
              </p>
            </div>
          ) : !showApplyForm ? (
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <div className="text-center border-r border-slate-200/60">
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Location</span>
                  <span className="text-[13px] text-slate-700 font-black mt-0.5 block">{job.location}</span>
                </div>
                <div className="text-center">
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Job Type</span>
                  <span className="text-[13px] text-slate-700 font-black mt-0.5 block">{job.type}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-[11.5px] font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-brand-primary" />
                  About The Role
                </h4>
                <p className="text-[12.5px] text-slate-500 leading-relaxed font-medium">
                  {job.description}
                </p>
              </div>

              {/* Duties */}
              {job.duties && job.duties.length > 0 && (
                <div>
                  <h4 className="text-[11.5px] font-black text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2.5">
                    {job.duties.map((duty, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-slate-500 font-medium leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h4 className="text-[11.5px] font-black text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-brand-primary" />
                    Requirements
                  </h4>
                  <ul className="space-y-2.5">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[12.5px] text-slate-500 font-medium leading-relaxed">
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Tags */}
              <div>
                <h4 className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill) => (
                    <span key={skill} className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Money Written directly in Apply CTA Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[14px] font-black text-white hover:opacity-95 transition-all shadow-md cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #5e5ce6, #807df6)", boxShadow: "0 4px 14px rgba(94,92,230,0.35)" }}
                >
                  Apply Now • {job.salary}
                </button>
              </div>
            </div>
          ) : (
            /* Quick Apply Form View */
            <form onSubmit={handleApply} className="space-y-4">
              <div className="pb-1 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] font-black text-slate-800">Submit Application</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Fill out your credentials to apply</p>
                </div>
                <span className="text-[12px] font-bold text-brand-primary">{job.salary}</span>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Your Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Portfolio or GitHub URL</label>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Introduce Yourself</label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell the team why you are a great fit..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[12.5px] font-medium text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-indigo-50 resize-none transition-all leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="text-[12px] font-bold text-slate-400 hover:text-slate-600 py-2 cursor-pointer"
                >
                  Back to details
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[12.5px] font-black text-white hover:opacity-95 transition-all cursor-pointer shadow-md"
                  style={{ background: "linear-gradient(135deg, #5e5ce6, #807df6)" }}
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
    <div ref={pageContainerRef} className="min-h-full bg-[#f8fafc] flex flex-col">
      {/* Hero Header (Exact visual layout of Freelancer Hero Header) */}
      <div
        ref={headerRef}
        className="relative overflow-hidden px-8 pt-8 pb-8 shrink-0"
        style={{ background: "linear-gradient(135deg, #4a48e0 0%, #6f6cf5 55%, #9b98ff 100%)" }}
      >
        {/* Orbs */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
        <div className="absolute -bottom-16 left-1/3 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.04)" }} />

        <div className="relative">
          {/* Title Row */}
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/20 border border-white/20">
              <BriefcaseBusiness style={{ width: 20, height: 20 }} className="text-white" />
            </div>
            <div>
              <h1 className="text-[22px] font-black text-white leading-tight tracking-tight">Jobs Board</h1>
              <p className="text-[12px] text-white/60 font-medium">Explore career opportunities or hire top talent for your team</p>
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
                <Icon style={{ width: 13, height: 13 }} className="text-white/70" />
                <span className="text-[11px] font-semibold text-white/70">{label}</span>
              </div>
            ))}
          </div>

          {/* Search bar & Post Job Button (Beside Search bar, White theme) */}
          <div className="flex flex-row items-center gap-3 max-w-xl mt-4">
            <div
              className="flex-1 flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2.5"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}
            >
              <Search style={{ width: 16, height: 16 }} className="text-white/60 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title, company, or skills..."
                className="flex-1 bg-transparent text-[13px] text-white placeholder-white/50 outline-none font-medium min-w-0"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-white/60 hover:text-white cursor-pointer shrink-0">
                  <X style={{ width: 14, height: 14 }} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="flex items-center justify-center gap-1.5 bg-white text-brand-primary px-4 py-2.5 rounded-2xl text-[12.5px] font-bold hover:bg-slate-50 transition-all duration-150 shadow-md cursor-pointer shrink-0"
            >
              <Plus style={{ width: 14, height: 14 }} className="text-brand-primary" />
              Post Job
            </button>
          </div>
        </div>
      </div>

      {/* Filters (Exact structural match of Freelancer Page) */}
      <div className="shrink-0 px-8 py-4 bg-white border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        {/* Category Pills on the Left */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-[12px] font-bold transition-all duration-150 cursor-pointer"
              style={
                activeCategory === cat
                  ? { background: "linear-gradient(135deg,#5e5ce6,#807df6)", color: "white", boxShadow: "0 3px 12px rgba(94,92,230,0.3)" }
                  : { background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right side controls: Job Type dropdown */}
        <div className="flex items-center gap-3">
          {/* Job Type Dropdown Filter */}
          <div className="relative flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5">
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="appearance-none bg-transparent text-[12px] font-semibold text-slate-600 outline-none pr-6 cursor-pointer"
            >
              <option value="All">All Types</option>
              {JOB_TYPES.slice(1).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div className="absolute right-2 pointer-events-none text-slate-400">
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
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Search style={{ width: 28, height: 28 }} className="text-slate-300" />
            </div>
            <h3 className="text-[15px] font-black text-slate-400">No listings found</h3>
            <p className="text-[13px] text-slate-400 mt-1">Try a different category, type, or search term</p>
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
