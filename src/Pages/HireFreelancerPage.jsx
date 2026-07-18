import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Briefcase,
  MessageSquare,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Send,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import gsap from "gsap";

const CATEGORIES = ["All", "Web Dev", "AI / ML", "Mobile", "UI/UX", "Data Science", "Content"];

const FREELANCERS = [
  {
    id: 1,
    name: "Arjun Mehta",
    title: "Full Stack React & Node.js Developer",
    avatar: "AM",
    avatarBg: "from-violet-500 to-indigo-600",
    category: "Web Dev",
    location: "Bangalore, IN",
    rating: 4.9,
    reviews: 148,
    rate: 2500,
    currency: "₹",
    unit: "/ hr",
    completedJobs: 87,
    responseTime: "< 1 hr",
    skills: ["React.js", "Node.js", "MongoDB", "TypeScript", "AWS"],
    bio: "Senior full-stack developer with 6+ years building production-grade MERN applications. Delivered 80+ projects across startups and enterprises.",
    verified: true,
    topRated: true,
    available: true,
  },
  {
    id: 2,
    name: "Priya Nair",
    title: "AI / ML Engineer & Data Scientist",
    avatar: "PN",
    avatarBg: "from-pink-500 to-rose-600",
    category: "AI / ML",
    location: "Hyderabad, IN",
    rating: 4.8,
    reviews: 93,
    rate: 3200,
    currency: "₹",
    unit: "/ hr",
    completedJobs: 54,
    responseTime: "< 2 hrs",
    skills: ["Python", "TensorFlow", "PyTorch", "LLM Fine-tuning", "MLOps"],
    bio: "ML engineer specialising in NLP, computer vision, and deploying LLM-powered products. Kaggle Expert with published research.",
    verified: true,
    topRated: true,
    available: true,
  },
  {
    id: 3,
    name: "Rahul Sharma",
    title: "UI/UX Designer & Figma Expert",
    avatar: "RS",
    avatarBg: "from-amber-400 to-orange-500",
    category: "UI/UX",
    location: "Mumbai, IN",
    rating: 4.9,
    reviews: 201,
    rate: 1800,
    currency: "₹",
    unit: "/ hr",
    completedJobs: 132,
    responseTime: "< 30 min",
    skills: ["Figma", "Framer", "Prototyping", "Design Systems", "Webflow"],
    bio: "Award-winning UI/UX designer who has worked with 50+ brands. Specialises in SaaS dashboards, mobile apps, and design system creation.",
    verified: true,
    topRated: false,
    available: true,
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    title: "React Native & Flutter Developer",
    avatar: "SK",
    avatarBg: "from-teal-400 to-emerald-600",
    category: "Mobile",
    location: "Pune, IN",
    rating: 4.7,
    reviews: 67,
    rate: 2200,
    currency: "₹",
    unit: "/ hr",
    completedJobs: 41,
    responseTime: "< 3 hrs",
    skills: ["React Native", "Flutter", "Firebase", "REST APIs", "App Store"],
    bio: "Cross-platform mobile developer with expertise in building high-performance apps published on both Google Play and App Store.",
    verified: true,
    topRated: false,
    available: false,
  },
  {
    id: 5,
    name: "Dev Anand Pillai",
    title: "Data Scientist & Analytics Engineer",
    avatar: "DP",
    avatarBg: "from-sky-400 to-blue-600",
    category: "Data Science",
    location: "Chennai, IN",
    rating: 4.8,
    reviews: 112,
    rate: 2800,
    currency: "₹",
    unit: "/ hr",
    completedJobs: 73,
    responseTime: "< 1 hr",
    skills: ["Python", "SQL", "Tableau", "Power BI", "Spark", "dbt"],
    bio: "Data scientist and analytics engineer with experience in building end-to-end data pipelines, dashboards, and predictive models for e-commerce and fintech.",
    verified: true,
    topRated: true,
    available: true,
  },
  {
    id: 6,
    name: "Ananya Reddy",
    title: "Technical Content Writer & SEO Strategist",
    avatar: "AR",
    avatarBg: "from-fuchsia-500 to-purple-600",
    category: "Content",
    location: "Delhi, IN",
    rating: 4.6,
    reviews: 88,
    rate: 900,
    currency: "₹",
    unit: "/ hr",
    completedJobs: 158,
    responseTime: "< 2 hrs",
    skills: ["Technical Writing", "SEO", "Blog Content", "React Docs", "Copy"],
    bio: "Technical writer and SEO strategist with bylines in major dev publications. Creates documentation, tutorials, and growth-driven blog content for SaaS products.",
    verified: true,
    topRated: false,
    available: true,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{ width: 11, height: 11 }}
          className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
        />
      ))}
    </div>
  );
}

function HireModal({ freelancer, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    gsap.fromTo(cardRef.current, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" });
  }, []);

  const close = () => {
    gsap.to(cardRef.current, { opacity: 0, y: 24, scale: 0.96, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.in", onComplete: onClose });
  };

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(close, 2000);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d253d]/40 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && close()}
    >
      <div ref={cardRef} className="bg-white rounded-xl w-full max-w-[480px] overflow-hidden shadow-2xl border border-hairline">
        {/* Header */}
        <div
          className="px-6 pt-6 pb-5 relative overflow-hidden stripe-mesh-gradient"
        >
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${freelancer.avatarBg} flex items-center justify-center text-[13px] font-bold text-white shadow-sm`}>
                {freelancer.avatar}
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-white">{freelancer.name}</h2>
                <p className="text-[11px] text-white/70 font-normal mt-0.5">{freelancer.title}</p>
              </div>
            </div>
            <button onClick={close} className="w-7.5 h-7.5 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors text-white">
              <X style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>

        {/* Body */}
        {sent ? (
          <div className="px-6 py-10 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 style={{ width: 28, height: 28 }} className="text-emerald-500" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-ink">Request Sent!</h3>
              <p className="text-[13px] text-ink-muted mt-1">{freelancer.name} will respond within {freelancer.responseTime}.</p>
            </div>
          </div>
        ) : (
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Rate info */}
            <div className="flex items-center justify-between bg-canvas-soft rounded-lg px-4 py-2 border border-hairline">
              <div>
                <p className="text-[10px] text-ink-muted font-semibold uppercase tracking-wider">Hourly Rate</p>
                <p className="text-[18px] font-semibold text-ink leading-tight mt-0.5 tnum">
                  {freelancer.currency}{freelancer.rate.toLocaleString()}
                  <span className="text-[11px] font-normal text-ink-muted ml-1">{freelancer.unit}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-ink-muted font-semibold uppercase tracking-wider">Avg. Response</p>
                <p className="text-[13px] font-semibold text-emerald-600 mt-0.5">{freelancer.responseTime}</p>
              </div>
            </div>

            {/* Budget input */}
            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Your Budget (₹)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide block mb-1.5">Describe your project</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi ${freelancer.name.split(" ")[0]}, I need help with...`}
                className="w-full rounded-lg border border-hairline bg-canvas-soft px-3.5 py-2 text-sm text-ink outline-none focus:border-brand-primary-soft focus:bg-white focus:ring-4 focus:ring-brand-primary-light resize-none transition-all duration-150 leading-relaxed font-normal"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer disabled:opacity-40"
            >
              <Send style={{ width: 14, height: 14 }} />
              Send Hire Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FreelancerCard({ f, index }) {
  const cardRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.07, ease: "power2.out" }
    );
  }, [index]);

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
      duration: 0.2, ease: "power2.out",
    });
  };

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        className="bg-white rounded-xl border border-hairline overflow-hidden shadow-sm flex flex-col transition-all duration-150"
      >
        {/* Top bar */}
        <div className="px-5 pt-5 pb-4 flex items-start gap-3.5">
          {/* Avatar */}
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-tr ${f.avatarBg} flex items-center justify-center text-[16px] font-semibold text-white shrink-0 shadow-sm`}>
            {f.avatar}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-[14px] font-semibold text-ink leading-tight">{f.name}</h3>
              {f.verified && (
                <CheckCircle2 style={{ width: 13, height: 13 }} className="text-brand-primary shrink-0" />
              )}
              {f.topRated && (
                <span className="text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest text-white bg-ruby shrink-0">
                  Top Rated
                </span>
              )}
            </div>
            <p className="text-[11px] text-ink-muted font-normal mt-0.5 leading-snug line-clamp-1">{f.title}</p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-1.5">
              <StarRating rating={f.rating} />
              <span className="text-[11px] font-semibold text-ink tnum">{f.rating}</span>
              <span className="text-[10px] text-ink-muted font-normal">({f.reviews})</span>
            </div>
          </div>

          {/* Rate */}
          <div className="text-right shrink-0">
            <p className="text-[16px] font-semibold text-ink leading-tight tnum">
              {f.currency}{f.rate.toLocaleString()}
            </p>
            <p className="text-[10px] text-ink-muted font-normal mt-0.5">{f.unit}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-hairline" />

        {/* Bio */}
        <div className="px-5 pt-3 pb-3">
          <p className="text-[12px] text-ink-secondary leading-relaxed line-clamp-2">{f.bio}</p>
        </div>

        {/* Skills */}
        <div className="px-5 pb-3 flex flex-wrap gap-1.5">
          {f.skills.map((s) => (
            <span key={s} className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-canvas-soft border border-hairline text-ink-secondary">
              {s}
            </span>
          ))}
        </div>

        {/* Footer stats */}
        <div className="mx-5 mb-4 mt-1 bg-canvas-soft rounded-lg px-4 py-2 flex items-center justify-between border border-hairline">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted font-normal">
            <Briefcase style={{ width: 12, height: 12 }} className="text-ink-muted" />
            <span className="tnum">{f.completedJobs}</span> jobs done
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted font-normal">
            <Clock style={{ width: 12, height: 12 }} className="text-ink-muted" />
            Replies <span className="tnum">{f.responseTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold">
            <span
              className={`w-1.5 h-1.5 rounded-full ${f.available ? "bg-emerald-400" : "bg-slate-300"}`}
              style={f.available ? { boxShadow: "0 0 4px #34d399" } : {}}
            />
            <span className={f.available ? "text-emerald-600" : "text-ink-muted"}>
              {f.available ? "Available" : "Busy"}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="px-5 pb-5 flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            disabled={!f.available}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer disabled:opacity-40"
          >
            <Zap style={{ width: 13, height: 13 }} />
            Hire Now
          </button>
          <button className="w-8.5 h-8.5 rounded-lg border border-hairline bg-white flex items-center justify-center text-ink-muted hover:border-hairline-strong hover:text-ink transition-all duration-150 cursor-pointer">
            <MessageSquare style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>

      {showModal && <HireModal freelancer={f} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default function HireFreelancerPage() {
  const headerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" });
  }, []);

  const filtered = FREELANCERS.filter((f) => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchSearch =
      !search.trim() ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-full bg-canvas-soft flex flex-col">
      {/* ── Hero Header ─────────────────────────────── */}
      <div
        ref={headerRef}
        className="relative overflow-hidden px-8 pt-8 pb-8 shrink-0 stripe-mesh-gradient"
      >
        <div className="relative">
          {/* Title row */}
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-sm">
              <Briefcase style={{ width: 18, height: 18 }} className="text-white" />
            </div>
            <div>
              <h1 className="text-[20px] font-semibold text-white leading-tight tracking-tight">Hire a Freelancer</h1>
              <p className="text-[11px] text-white/70 font-normal">Connect with top verified professionals</p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex gap-4 mt-4 mb-5">
            {[
              { icon: Shield, label: "Verified Profiles" },
              { icon: CheckCircle2, label: "Secure Payments" },
              { icon: Award, label: "Top Rated Talent" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon style={{ width: 13, height: 13 }} className="text-white/85" />
                <span className="text-[11px] font-medium text-white/85">{label}</span>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-4 py-2.5 max-w-xl"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <Search style={{ width: 16, height: 16 }} className="text-white/60 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill, or expertise..."
              className="flex-1 bg-transparent text-[13px] text-white placeholder-white/50 outline-none font-normal"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-white/60 hover:text-white cursor-pointer">
                <X style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────── */}
      <div className="shrink-0 px-8 py-3.5 bg-white border-b border-hairline flex items-center justify-between gap-4">
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
        <div className="flex items-center gap-1.5 text-[12px] text-ink-muted font-normal shrink-0">
          <SlidersHorizontal style={{ width: 14, height: 14 }} className="text-ink-muted" />
          <span className="tnum">{filtered.length}</span> found
        </div>
      </div>

      {/* ── Freelancer Grid ──────────────────────────── */}
      <div className="flex-1 px-8 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white/40 border border-hairline rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-white border border-hairline flex items-center justify-center mb-4 shadow-sm">
              <Search style={{ width: 22, height: 22 }} className="text-ink-muted" />
            </div>
            <h3 className="text-[14px] font-semibold text-ink">No freelancers found</h3>
            <p className="text-[12px] text-ink-muted mt-1">Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((f, i) => (
              <FreelancerCard key={f.id} f={f} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
