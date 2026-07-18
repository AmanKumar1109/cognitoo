import React, { useEffect, useRef, useState } from "react";
import { Plus, UserPlus, UserCheck } from "lucide-react";
import gsap from "gsap";

export default function MentorsList() {
  const listRef = useRef(null);
  const [following, setFollowing] = useState([false, false, true]);

  useEffect(() => {
    // Staggered list fade-in
    const children = listRef.current.children;
    gsap.fromTo(
      children,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const mentors = [
    { name: "Padhang Satrio", role: "Mentor", initial: "PS", bgColor: "bg-lemon/10 text-lemon" },
    { name: "Zakir Horizontal", role: "Mentor", initial: "ZH", bgColor: "bg-ruby/10 text-ruby" },
    { name: "Leonardo Samsul", role: "Mentor", initial: "LS", bgColor: "bg-brand-primary-light text-brand-primary" },
  ];

  const handleFollowToggle = (idx) => {
    const updated = [...following];
    updated[idx] = !updated[idx];
    setFollowing(updated);
  };

  return (
    <div className="bg-white border border-hairline rounded-xl p-6 shadow-sm flex flex-col select-none">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-ink">Your Mentors</h3>
        <button 
          onClick={() => alert("Add mentor dialogue...")}
          className="w-7 h-7 rounded-lg bg-canvas-soft border border-hairline flex items-center justify-center text-ink-muted hover:text-ink hover:bg-white transition-all duration-150 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* List */}
      <div ref={listRef} className="space-y-4 mb-5">
        {mentors.map((mentor, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            {/* Avatar & Name */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8.5 h-8.5 rounded-lg ${mentor.bgColor} flex items-center justify-center font-bold text-xs shrink-0 border border-hairline`}>
                {mentor.initial}
              </div>
              <div className="min-w-0">
                <h4 className="text-[12px] font-semibold text-ink truncate leading-tight">{mentor.name}</h4>
                <p className="text-[10px] text-ink-muted font-normal">Mentor</p>
              </div>
            </div>

            {/* Follow/Following Button */}
            <button
              onClick={() => handleFollowToggle(idx)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-150 cursor-pointer shrink-0 border ${
                following[idx]
                  ? "bg-brand-primary-light border-brand-primary/20 text-brand-primary hover:bg-brand-primary-soft hover:text-white"
                  : "bg-white border-hairline text-ink-secondary hover:text-brand-primary hover:border-brand-primary/45"
              }`}
            >
              {following[idx] ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Follow</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <button 
        onClick={() => alert("Mentors list expanding...")}
        className="w-full py-2 bg-brand-primary-light hover:bg-brand-primary/10 text-brand-primary text-[12px] font-semibold rounded-lg border border-brand-primary/15 transition-all duration-150 text-center cursor-pointer shadow-sm"
      >
        See All
      </button>
    </div>
  );
}
