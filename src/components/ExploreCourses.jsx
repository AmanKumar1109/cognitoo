import React, { useEffect, useRef, useState } from "react";
import {
  X,
  PlayCircle,
  Star,
  Clock,
  Users,
  BookOpen,
  Zap,
  Award,
  ChevronRight,
  Video,
  Lock,
} from "lucide-react";
import gsap from "gsap";

const COURSES = [
  {
    id: 1,
    tag: "React.js",
    tagColor: "bg-sky-50 text-sky-600",
    title: "Complete React.js Developer Course — Hooks, Redux & Projects",
    instructor: "Harkirat Singh",
    instructorInitial: "HS",
    instructorBg: "bg-sky-100 text-sky-700",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    students: 18400,
    duration: "42h 10m",
    price: 799,
    originalPrice: 2999,
    totalVideos: 186,
    level: "Beginner → Advanced",
    levelColor: "text-sky-600 bg-sky-50",
    description:
      "The most comprehensive React.js course on the internet. Learn React 18, Hooks, Context API, Redux Toolkit, React Router, and build 10+ real-world projects. Industry-ready curriculum designed by senior engineers.",
    highlights: [
      "186 HD video lessons with subtitles",
      "10+ full-stack project builds included",
      "Redux Toolkit, Zustand & Context API covered",
      "Certificate of completion + LinkedIn badge",
    ],
    curriculum: [
      { section: "JavaScript Refresher & ES6+", videos: 22 },
      { section: "React Core — JSX, Components, Props", videos: 38 },
      { section: "Hooks Deep Dive & State Management", videos: 46 },
      { section: "Real-World Projects & Deployment", videos: 80 },
    ],
    badge: "Bestseller",
    badgeBg: "#fbbf24",
  },
  {
    id: 2,
    tag: "AI / ML",
    tagColor: "bg-violet-50 text-violet-600",
    title: "Artificial Intelligence & Machine Learning — Zero to Hero",
    instructor: "Dr. Andrew Patel",
    instructorInitial: "AP",
    instructorBg: "bg-violet-100 text-violet-700",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad979?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    students: 24100,
    duration: "58h 30m",
    price: 1299,
    originalPrice: 4999,
    totalVideos: 240,
    level: "Beginner → Pro",
    levelColor: "text-violet-600 bg-violet-50",
    description:
      "Master Machine Learning, Deep Learning, NLP, Computer Vision, and Generative AI. Covers Python, NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch, and LLM fine-tuning with hands-on notebooks.",
    highlights: [
      "240 videos + Jupyter notebook downloads",
      "Covers LLMs, Transformers & Diffusion models",
      "15 real ML projects with deployed demos",
      "Doubt-clearing live sessions every week",
    ],
    curriculum: [
      { section: "Python & Math for ML", videos: 40 },
      { section: "Classical ML Algorithms", videos: 60 },
      { section: "Deep Learning & Neural Nets", videos: 80 },
      { section: "NLP, CV & Generative AI", videos: 60 },
    ],
    badge: "Top Rated",
    badgeBg: "#7c3aed",
  },
  {
    id: 3,
    tag: "Class 12 Physics",
    tagColor: "bg-orange-50 text-orange-600",
    title: "Class 12 Physics — NCERT + JEE/NEET Complete Prep",
    instructor: "Pradeep Kshetrapal",
    instructorInitial: "PK",
    instructorBg: "bg-orange-100 text-orange-700",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    students: 51200,
    duration: "120h 00m",
    price: 599,
    originalPrice: 2499,
    totalVideos: 420,
    level: "Class 12 / JEE / NEET",
    levelColor: "text-orange-600 bg-orange-50",
    description:
      "India's most trusted Class 12 Physics course. Covers all 15 NCERT chapters with concept videos, solved examples, PYQs, and mock tests. Perfect for Board exams, JEE Mains, JEE Advanced & NEET.",
    highlights: [
      "420 chapter-wise lecture videos",
      "5000+ solved numericals & PYQs",
      "Full chapter PDFs & formula sheets",
      "Weekly live doubt sessions",
    ],
    curriculum: [
      { section: "Electrostatics & Current Electricity", videos: 110 },
      { section: "Magnetism & Electromagnetic Induction", videos: 90 },
      { section: "Optics & Modern Physics", videos: 120 },
      { section: "Mock Tests & PYQ Solutions", videos: 100 },
    ],
    badge: "New",
    badgeBg: "#0ea5e9",
  },
  {
    id: 4,
    tag: "Python",
    tagColor: "bg-emerald-50 text-emerald-600",
    title: "Python Mastery — From Basics to Backend APIs",
    instructor: "Corey Schafer",
    instructorInitial: "CS",
    instructorBg: "bg-emerald-100 text-emerald-700",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&auto=format&fit=crop&q=80",
    rating: 4.9,
    students: 43700,
    duration: "36h 45m",
    price: 699,
    originalPrice: 2499,
    totalVideos: 154,
    level: "All Levels",
    levelColor: "text-emerald-600 bg-emerald-50",
    description:
      "The definitive Python course — start from zero and build REST APIs, web scrapers, automation scripts, and data pipelines. Covers Python 3.12, Flask, Django basics, FastAPI, and OOP in depth.",
    highlights: [
      "154 structured video lessons",
      "Build 8 real projects including a REST API",
      "OOP, decorators & advanced Python mastery",
      "Downloadable code files for every lesson",
    ],
    curriculum: [
      { section: "Python Fundamentals", videos: 35 },
      { section: "OOP & Advanced Concepts", videos: 42 },
      { section: "File I/O, APIs & Automation", videos: 40 },
      { section: "Flask / FastAPI Projects", videos: 37 },
    ],
    badge: "Hot 🔥",
    badgeBg: "#e11d48",
  },
  {
    id: 5,
    tag: "Class 12 Math",
    tagColor: "bg-rose-50 text-rose-600",
    title: "Class 12 Mathematics — NCERT + Board + JEE Mains",
    instructor: "RD Sharma Online",
    instructorInitial: "RD",
    instructorBg: "bg-rose-100 text-rose-700",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=80",
    rating: 4.7,
    students: 38900,
    duration: "95h 00m",
    price: 499,
    originalPrice: 1999,
    totalVideos: 380,
    level: "Class 12 / JEE",
    levelColor: "text-rose-600 bg-rose-50",
    description:
      "Complete Class 12 Mathematics course covering all 13 NCERT chapters with step-by-step solutions. Ideal for CBSE Board exams and JEE Mains preparation. Includes tricky problems and shortcut techniques.",
    highlights: [
      "380 chapter-wise concept videos",
      "NCERT solutions + RD Sharma problems",
      "Integration, Vectors, 3D Geometry mastery",
      "Mock tests with detailed analysis reports",
    ],
    curriculum: [
      { section: "Relations, Functions & Matrices", videos: 80 },
      { section: "Calculus — Diff & Integration", videos: 140 },
      { section: "Vectors, 3D & Linear Programming", videos: 90 },
      { section: "Probability & Stats", videos: 70 },
    ],
    badge: "Staff Pick",
    badgeBg: "#0284c7",
  },
  {
    id: 6,
    tag: "Full Stack",
    tagColor: "bg-teal-50 text-teal-600",
    title: "Full Stack Web Dev — MERN Stack Bootcamp 2025",
    instructor: "Brad Traversy",
    instructorInitial: "BT",
    instructorBg: "bg-teal-100 text-teal-700",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=80",
    rating: 4.8,
    students: 29600,
    duration: "65h 20m",
    price: 999,
    originalPrice: 3999,
    totalVideos: 270,
    level: "Intermediate → Pro",
    levelColor: "text-teal-600 bg-teal-50",
    description:
      "Master the complete MERN stack — MongoDB, Express.js, React 18, and Node.js. Build production-ready apps with authentication (JWT/OAuth), REST & GraphQL APIs, cloud deployment, and CI/CD pipelines.",
    highlights: [
      "270 in-depth video lessons",
      "Build 6 production-grade MERN apps",
      "Auth, GraphQL, Docker & AWS deployment",
      "Resume & portfolio project included",
    ],
    curriculum: [
      { section: "Node.js & Express Fundamentals", videos: 60 },
      { section: "MongoDB & Mongoose ORM", videos: 50 },
      { section: "React Frontend Integration", videos: 80 },
      { section: "Deployment, Auth & Advanced APIs", videos: 80 },
    ],
    badge: null,
    badgeBg: null,
  },
];

function CourseModal({ course, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { opacity: 0, y: 20, scale: 0.98, duration: 0.18, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: "power2.in", onComplete: onClose });
  };

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(13, 37, 61, 0.4)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-[600px] max-h-[90vh] overflow-y-scroll shadow-2xl border border-hairline"
      >
        {/* Hero Image */}
        <div className="relative w-full h-52 shrink-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(13,37,61,0.8) 0%, transparent 60%)" }}
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8.5 h-8.5 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          {course.badge && (
            <span
              className="absolute top-4 left-4 px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: course.badgeBg }}
            >
              {course.badge}
            </span>
          )}
          <div className="absolute bottom-4 left-5 right-5">
            <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest mb-1.5 ${course.tagColor}`}>
              {course.tag}
            </span>
            <h2 className="text-white font-semibold text-[15px] leading-snug drop-shadow-sm">{course.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Video className="w-4 h-4" />, value: course.totalVideos, label: "Videos", color: "text-brand-primary bg-brand-primary-light" },
              { icon: <Clock className="w-4 h-4" />, value: course.duration, label: "Duration", color: "text-brand-primary bg-brand-primary-light" },
              { icon: <Users className="w-4 h-4" />, value: `${(course.students / 1000).toFixed(1)}k`, label: "Students", color: "text-ruby bg-ruby/10" },
              { icon: <Star className="w-4 h-4" />, value: course.rating, label: "Rating", color: "text-lemon bg-lemon/10" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 bg-white border border-hairline rounded-lg p-3 text-center">
                <span className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center ${stat.color}`}>{stat.icon}</span>
                <span className="text-sm font-semibold text-ink tnum">{stat.value}</span>
                <span className="text-[9px] font-semibold text-ink-muted uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Instructor + Level */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${course.instructorBg}`}>
              {course.instructorInitial}
            </div>
            <div>
              <p className="text-[12px] font-semibold text-ink">{course.instructor}</p>
              <p className="text-[10px] text-ink-muted font-normal">Course Instructor</p>
            </div>
            <div className="ml-auto">
              <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${course.levelColor}`}>{course.level}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider mb-2">About this course</h3>
            <p className="text-xs text-ink-secondary leading-relaxed">{course.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-brand-primary" />
              What you'll get
            </h3>
            <ul className="flex flex-col gap-2">
              {course.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                  <span className="w-4 h-4 rounded-lg bg-brand-primary-light flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronRight className="w-2.5 h-2.5 text-brand-primary" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Curriculum */}
          <div>
            <h3 className="text-[10px] font-bold text-ink uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-primary" />
              Curriculum
            </h3>
            <div className="flex flex-col gap-2">
              {course.curriculum.map((sec, i) => (
                <div key={i} className="flex items-center justify-between bg-white border border-hairline rounded-lg px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded bg-brand-primary-light flex items-center justify-center text-[9px] font-semibold text-brand-primary">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold text-ink-secondary">{sec.section}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-ink-muted font-normal">
                    <PlayCircle className="w-3 h-3" />
                    {sec.videos} videos
                    {i > 0 && <Lock className="w-3 h-3 ml-1 text-ink-muted" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing CTA */}
          <div className="stripe-mesh-gradient rounded-xl p-5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-end gap-2 mb-0.5">
                <span className="text-2xl font-semibold text-white tnum">₹{course.price}</span>
                <span className="text-sm text-white/50 line-through mb-0.5 tnum">₹{course.originalPrice}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded">
                  {discount}% OFF
                </span>
                <span className="text-[10px] text-white/60 font-normal">Limited time</span>
              </div>
            </div>
            <button className="bg-white text-brand-primary text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-primary-light transition-all duration-150 cursor-pointer shadow whitespace-nowrap flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExploreCourses() {
  const cardsRef = useRef([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  const handleCardHover = (idx, enter) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, {
      y: enter ? -3 : 0,
      boxShadow: enter
        ? "rgba(50, 50, 93, 0.04) 0px 6px 12px -2px, rgba(0, 0, 0, 0.02) 0px 3px 7px -3px"
        : "rgba(50, 50, 93, 0.02) 0px 2px 5px 0px, rgba(0, 0, 0, 0.01) 0px 1px 1px 0px",
      borderColor: enter ? "#d8deeb" : "var(--color-hairline)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[15px] font-semibold text-ink">Explore Courses</h3>
            <p className="text-[11px] text-ink-muted font-normal mt-0.5">
              Click any course to see pricing &amp; details
            </p>
          </div>
          <button className="text-[11px] font-semibold text-brand-primary flex items-center gap-1 hover:text-brand-primary-soft transition-colors duration-150 cursor-pointer">
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {COURSES.map((course, idx) => (
            <div
              key={course.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseEnter={() => handleCardHover(idx, true)}
              onMouseLeave={() => handleCardHover(idx, false)}
              onClick={() => setSelectedCourse(course)}
              className="bg-white border border-hairline rounded-xl overflow-hidden cursor-pointer select-none group shadow-sm transition-all duration-150"
            >
              {/* Thumbnail */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={course.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(13,37,61,0.5) 0%, transparent 55%)" }}
                />
                {course.badge && (
                  <span
                    className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: course.badgeBg }}
                  >
                    {course.badge}
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <PlayCircle className="w-5.5 h-5.5 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded px-2 py-0.5 shadow-sm">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-semibold text-ink-secondary">{course.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${course.tagColor}`}>
                    {course.tag}
                  </span>
                  <span className="text-[9px] text-ink-muted font-normal">{course.level}</span>
                </div>
                <h4 className="text-[12px] font-semibold text-ink leading-snug line-clamp-2 mb-3 min-h-[32px]">
                  {course.title}
                </h4>
                <div className="flex items-center gap-3 text-[10px] text-ink-muted font-normal mb-3">
                  <span className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    {course.totalVideos} videos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {(course.students / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="border-t border-hairline pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold shrink-0 ${course.instructorBg}`}>
                      {course.instructorInitial}
                    </div>
                    <span className="text-[10px] font-medium text-ink-secondary inline-block truncate max-w-[80px] sm:max-w-[100px]">
                      {course.instructor}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] text-ink-muted line-through">₹{course.originalPrice}</span>
                    <span className="text-sm font-semibold text-brand-primary tnum">₹{course.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  );
}
