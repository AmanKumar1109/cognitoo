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
  Briefcase
} from "lucide-react";
import FriendChat from "./FriendChat";

export default function Sidebar() {
  const [activeFriend, setActiveFriend] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Inbox", path: "/inbox", icon: Mail },
    { name: "Lesson", path: "/lessons", icon: BookOpen },
    { name: "Task", path: "/tasks", icon: CheckSquare },
    { name: "Group", path: "/groups", icon: Users },
    { name: "Explore Courses", path: "/courses", icon: Compass, badge: "New" },
    { name: "Hire Freelancer", path: "/hire", icon: Briefcase, badge: "Pro", badgeColor: "#f59e0b" },
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
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-full py-6 select-none shrink-0">
        {/* Brand Header */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Coursue</span>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-4 space-y-7 overflow-y-scroll">
          {/* Overview Group */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Overview
            </span>
            <nav className="mt-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                        isActive
                          ? "text-brand-primary bg-indigo-50/40"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-brand-primary" />
                        )}
                        <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                          isActive ? "text-brand-primary" : "text-slate-400 group-hover:text-slate-600"
                        }`} />
                        <span className="flex-1">{item.name}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-full text-white leading-none flex items-center gap-1 ${item.badgePulse ? "bg-emerald-500" : ""}`}
                            style={!item.badgePulse && !item.badgeColor ? { background: "linear-gradient(135deg, #5e5ce6, #807df6)" } : item.badgeColor ? { background: item.badgeColor } : {}}
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
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Friends
            </span>
            <div className="mt-2 space-y-1">
              {friends.map((friend) => {
                const isActive = activeFriend?.name === friend.name;
                return (
                  <button
                    key={friend.name}
                    onClick={() => handleFriendClick(friend)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 text-left group ${
                      isActive
                        ? "bg-indigo-50/60"
                        : "hover:bg-slate-50/70"
                    }`}
                  >
                    {/* Avatar + online dot */}
                    <div className="relative shrink-0">
                      <div className={`w-8 h-8 rounded-full ${friend.avatarColor} flex items-center justify-center text-xs font-bold transition-transform duration-150 group-hover:scale-105`}>
                        {friend.initial}
                      </div>
                      {friend.online && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                          style={{ background: "#34d399", boxShadow: "0 0 5px #34d399" }}
                        />
                      )}
                    </div>

                    {/* Name + role */}
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-semibold truncate transition-colors ${isActive ? "text-brand-primary" : "text-slate-700"}`}>
                        {friend.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {friend.online ? "Online" : friend.role}
                      </p>
                    </div>

                    {/* Chat bubble icon hint */}
                    <MessageSquareMore
                      className={`w-3.5 h-3.5 shrink-0 transition-all duration-150 ${
                        isActive ? "text-brand-primary" : "text-slate-300 group-hover:text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Group */}
          <div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Settings
            </span>
            <nav className="mt-2 space-y-1">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                    isActive
                      ? "text-brand-primary bg-indigo-50/40"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-brand-primary" />
                    )}
                    <Settings className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? "text-brand-primary" : "text-slate-400 group-hover:text-slate-600"
                    }`} />
                    <span>Setting</span>
                  </>
                )}
              </NavLink>
              <button
                onClick={() => alert("Logged out!")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50/50 transition-all duration-200 group text-left cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
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
