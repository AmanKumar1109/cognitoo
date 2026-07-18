import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  BookOpen,
  CheckSquare,
  Users,
  Settings,
  LogOut,
  Compass,
  MessageSquareMore,
  Briefcase,
  BriefcaseBusiness
} from "lucide-react";
import FriendChat from "./FriendChat";

export default function Sidebar({ isOpen, onClose }) {
  const [activeFriend, setActiveFriend] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Inbox", path: "/inbox", icon: Mail },
    { name: "Lesson", path: "/lessons", icon: BookOpen },
    { name: "Task", path: "/tasks", icon: CheckSquare },
    { name: "Group", path: "/groups", icon: Users },
    { name: "Explore Courses", path: "/courses", icon: Compass, badge: "New" },
    { name: "Hire Freelancer", path: "/hire", icon: Briefcase, badge: "Pro", badgeColor: "#f59e0b" },
    { name: "Jobs Board", path: "/jobs", icon: BriefcaseBusiness, badge: "Hot", badgePulse: true },
    { name: "StudyBot AI", path: "/chatbot", icon: MessageSquareMore, badge: "AI", badgePulse: true },
  ];

  const friends = [
    { name: "Bagas Mahpie", role: "Friend", avatarColor: "bg-pink-100 text-pink-600", initial: "BM", online: true },
    { name: "Sir Dandy", role: "Old Friend", avatarColor: "bg-indigo-100 text-indigo-600", initial: "SD", online: true },
    { name: "Jhon Tosan", role: "Friend", avatarColor: "bg-teal-100 text-teal-600", initial: "JT", online: false },
  ];

  const handleFriendClick = (friend) => {
    // Toggle: clicking the same friend closes the chat
    if (activeFriend?.name === friend.name) {
      setActiveFriend(null);
    } else {
      setActiveFriend(null); // unmount first for clean re-mount animation
      setTimeout(() => setActiveFriend(friend), 50);
    }
  };

  return (
    <>
      <aside className={`fixed lg:relative top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-hairline flex flex-col h-full py-6 select-none shrink-0 transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Brand Header */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-primary-soft flex items-center justify-center text-white shadow-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
            </svg>
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-ink">Cognitoo</span>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-4 space-y-7 overflow-y-scroll">
          {/* Overview Group */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-widest text-ink-muted uppercase">
              Overview
            </span>
            <nav className="mt-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 relative group ${isActive
                        ? "text-brand-primary bg-brand-primary-light"
                        : "text-ink-secondary hover:text-ink hover:bg-canvas-soft"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-r-md bg-brand-primary" />
                        )}
                        <Icon className={`w-4.5 h-4.5 transition-transform duration-150 group-hover:scale-105 ${isActive ? "text-brand-primary" : "text-ink-muted group-hover:text-ink-secondary"
                          }`} />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full leading-none flex items-center gap-1`}
                            style={
                              item.badgePulse 
                                ? { backgroundColor: "var(--color-ruby)", color: "#ffffff" }
                                : item.badgeColor 
                                  ? { backgroundColor: item.badgeColor + "20", color: item.badgeColor }
                                  : { backgroundColor: "var(--color-brand-primary)", color: "#ffffff" }
                            }
                          >
                            {item.badgePulse && <span className="w-1 h-1 rounded-full bg-white animate-pulse" />}
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Friends Group */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-widest text-ink-muted uppercase">
              Friends
            </span>
            <div className="mt-2 space-y-1">
              {friends.map((friend) => {
                const isActive = activeFriend?.name === friend.name;
                return (
                  <button
                    key={friend.name}
                    onClick={() => handleFriendClick(friend)}
                    className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-150 text-left group ${isActive
                        ? "bg-brand-primary-light"
                        : "hover:bg-canvas-soft"
                      }`}
                  >
                    {/* Avatar + online dot */}
                    <div className="relative shrink-0">
                      <div className={`w-7.5 h-7.5 rounded-full ${friend.avatarColor} flex items-center justify-center text-[11px] font-bold transition-transform duration-150 group-hover:scale-105`}>
                        {friend.initial}
                      </div>
                      {friend.online && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white"
                          style={{ background: "#34d399", boxShadow: "0 0 4px #34d399" }}
                        />
                      )}
                    </div>

                    {/* Name + role */}
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-[12px] font-medium truncate transition-colors ${isActive ? "text-brand-primary font-semibold" : "text-ink-secondary"}`}>
                        {friend.name}
                      </h4>
                      <p className="text-[10px] text-ink-muted truncate">
                        {friend.online ? "Online" : friend.role}
                      </p>
                    </div>

                    {/* Chat bubble icon hint */}
                    <MessageSquareMore
                      className={`w-3.5 h-3.5 shrink-0 transition-all duration-150 ${isActive ? "text-brand-primary" : "text-ink-muted group-hover:text-ink-secondary"
                        }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Group */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-widest text-ink-muted uppercase">
              Settings
            </span>
            <nav className="mt-2 space-y-1">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 relative group ${isActive
                    ? "text-brand-primary bg-brand-primary-light"
                    : "text-ink-secondary hover:text-ink hover:bg-canvas-soft"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-r-md bg-brand-primary" />
                    )}
                    <Settings className={`w-4.5 h-4.5 transition-transform duration-150 group-hover:scale-105 ${isActive ? "text-brand-primary" : "text-ink-muted group-hover:text-ink-secondary"
                      }`} />
                    <span>Setting</span>
                  </>
                )}
              </NavLink>
              <button
                onClick={() => alert("Logged out!")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-ruby hover:bg-ruby/5 transition-all duration-150 group text-left cursor-pointer"
              >
                <LogOut className="w-4.5 h-4.5 text-ruby/80 group-hover:text-ruby transition-transform duration-150 group-hover:translate-x-0.5 shrink-0" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Floating Friend Chat Panel */}
      {activeFriend && (
        <FriendChat
          key={activeFriend.name}
          friend={activeFriend}
          onClose={() => setActiveFriend(null)}
        />
      )}
    </>
  );
}
