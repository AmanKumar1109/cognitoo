import React from "react";
import { Search, Mail, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back, Jason!" },
  "/inbox": { title: "Inbox", subtitle: "Your messages and notifications" },
  "/lessons": { title: "Lessons", subtitle: "Continue your learning journey" },
  "/tasks": { title: "Tasks", subtitle: "Manage your assignments" },
  "/groups": { title: "Groups", subtitle: "Your study groups" },
  "/courses": { title: "Explore Courses", subtitle: "Find the perfect course for you" },
  "/chatbot": { title: "StudyBot AI", subtitle: "Ask anything about your courses" },
  "/hire": { title: "Hire a Freelancer", subtitle: "Connect with top professionals" },
  "/settings": { title: "Settings", subtitle: "Manage your preferences" },
};

export default function Header() {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard" || pathname === "/";
  const page = PAGE_TITLES[pathname] || { title: "Dashboard", subtitle: "" };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#f8fafc] border-b border-slate-100 shrink-0 gap-6">

      {/* Left — Page title (non-dashboard) OR greeting (dashboard) */}
      <div className="flex-1 min-w-0">
        {isDashboard ? (
          <div>
            <h2 className="text-[17px] font-black text-slate-800 leading-tight truncate">
              Good Morning, Jason! 👋
            </h2>
            <p className="text-[12px] text-slate-400 font-medium mt-0.5">
              Here's what's happening with your learning today.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-[17px] font-black text-slate-800 leading-tight truncate">
              {page.title}
            </h2>
            <p className="text-[12px] text-slate-400 font-medium mt-0.5 truncate">
              {page.subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Center — Search bar */}
      <div className="relative w-72 xl:w-96 shrink-0">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </span>
        <input
          type="text"
          placeholder="Search courses, tasks, people…"
          className="w-full pl-10 pr-4 py-2.5 bg-white text-[13px] text-slate-700 placeholder-slate-400 rounded-full border border-slate-200 outline-none transition-all duration-200 focus:border-brand-primary focus:ring-2 focus:ring-indigo-100 font-medium"
        />
      </div>

      {/* Right — Actions + Profile (profile name only on dashboard) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Mail */}
        <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors duration-200 shadow-sm cursor-pointer">
          <Mail className="w-4 h-4" />
        </button>

        {/* Bell */}
        <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-colors duration-200 shadow-sm cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* Profile — avatar always visible, name only on dashboard */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center overflow-hidden border border-slate-200 cursor-pointer shrink-0">
            <svg className="w-6 h-6 mt-1 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Name + role — ONLY on dashboard */}
          {isDashboard && (
            <div className="hidden sm:block text-left cursor-pointer">
              <h4 className="text-[13px] font-bold text-slate-800 leading-tight hover:text-brand-primary transition-colors duration-200">
                Jason Ranti
              </h4>
              <p className="text-[10px] text-slate-400 font-medium leading-tight">Student</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
