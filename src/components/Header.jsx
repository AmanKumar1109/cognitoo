import React from "react";
import { Search, Mail, Bell, Menu } from "lucide-react";
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
  "/jobs": { title: "Jobs Board", subtitle: "Explore career opportunities or hire top talent for your team" },
  "/settings": { title: "Settings", subtitle: "Manage your preferences" },
};

export default function Header({ onToggleMenu, isMenuOpen }) {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard" || pathname === "/";
  const page = PAGE_TITLES[pathname] || { title: "Dashboard", subtitle: "" };

  return (
    <header className="flex items-center justify-between px-4 lg:px-8 py-3.5 lg:py-4 bg-canvas-soft border-b border-hairline shrink-0 gap-4 lg:gap-6">

      {/* Left — Hamburger & Page Title / Greeting */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onToggleMenu}
          className="lg:hidden w-8.5 h-8.5 rounded-lg bg-white border border-hairline flex items-center justify-center text-ink-muted hover:text-ink hover:border-hairline-strong transition-all duration-150 cursor-pointer shrink-0 shadow-sm"
        >
          <Menu className="w-4.5 h-4.5" />
        </button>
        
        <div className="min-w-0">
          {isDashboard ? (
            <div>
              <h2 className="text-[15px] lg:text-[16px] font-semibold text-ink leading-tight truncate">
                Good Morning, Jason! 👋
              </h2>
              <p className="text-[11px] lg:text-[12px] text-ink-muted font-normal mt-0.5 hidden sm:block">
                Here's what's happening with your learning today.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-[15px] lg:text-[16px] font-semibold text-ink leading-tight truncate">
                {page.title}
              </h2>
              <p className="text-[11px] lg:text-[12px] text-ink-muted font-normal mt-0.5 truncate hidden sm:block">
                {page.subtitle}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Center — Search bar */}
      <div className="relative w-48 sm:w-64 md:w-72 xl:w-96 shrink-0 hidden sm:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <Search className="h-4 w-4 text-ink-muted" />
        </span>
        <input
          type="text"
          placeholder="Search courses, tasks, people…"
          className="w-full pl-10 pr-4 py-2 bg-white text-[13px] text-ink placeholder-ink-muted/70 rounded-lg border border-hairline outline-none transition-all duration-150 focus:border-brand-primary-soft focus:ring-4 focus:ring-brand-primary-light font-normal"
        />
      </div>

      {/* Right — Actions + Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Mail (Hidden on narrow mobile screens) */}
        <button className="w-8.5 h-8.5 rounded-lg bg-white border border-hairline hidden md:flex items-center justify-center text-ink-muted hover:text-ink hover:border-hairline-strong transition-all duration-150 shadow-sm cursor-pointer">
          <Mail className="w-4 h-4" />
        </button>

        {/* Bell (Notification Option - Kept Pinned) */}
        <button className="relative w-8.5 h-8.5 rounded-lg bg-white border border-hairline flex items-center justify-center text-ink-muted hover:text-ink hover:border-hairline-strong transition-all duration-150 shadow-sm cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-ruby ring-2 ring-white" />
        </button>

        {/* Profile (Kept Pinned) */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-hairline">
          <div className="w-8.5 h-8.5 rounded-lg bg-brand-primary-light text-brand-primary font-bold flex items-center justify-center overflow-hidden border border-hairline cursor-pointer shrink-0">
            <svg className="w-6 h-6 mt-1 text-ink-muted" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Name + role — ONLY on dashboard */}
          {isDashboard && (
            <div className="hidden lg:block text-left cursor-pointer">
              <h4 className="text-[13px] font-semibold text-ink leading-tight hover:text-brand-primary transition-colors duration-150">
                Jason Ranti
              </h4>
              <p className="text-[10px] text-ink-muted font-normal leading-tight">Student</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
