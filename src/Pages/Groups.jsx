import React, { useEffect, useRef } from "react";
import { Users, Plus, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function Groups() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const groups = [
    { name: "Frontend Pioneers", members: 14, category: "Coding", active: true },
    { name: "UI/UX Case Study Squad", members: 8, category: "Design", active: true },
    { name: "Brand Visionaries", members: 6, category: "Creative", active: false },
  ];

  return (
    <div ref={containerRef} className="p-8 max-w-5xl bg-canvas-soft min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[16px] font-semibold text-ink">My Groups</h1>
          <p className="text-xs text-ink-muted">Join discussions, pair program, and complete group tasks</p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((group, idx) => (
          <div
            key={idx}
            className="bg-white border border-hairline rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="px-2 py-0.5 text-[8px] font-bold rounded uppercase tracking-widest bg-brand-primary-light text-brand-primary border border-brand-primary/10">
                  {group.category}
                </span>
                {group.active && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    Active Now
                  </span>
                )}
              </div>
              <h3 className="text-[14px] font-semibold text-ink group-hover:text-brand-primary transition-colors duration-150">
                {group.name}
              </h3>
              <p className="text-xs text-ink-muted mt-2 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-ink-muted" />
                <span className="tnum">{group.members}</span> participants
              </p>
            </div>
            
            <button className="mt-6 flex items-center justify-center gap-1 w-full py-2 bg-canvas-soft text-ink-secondary text-xs font-semibold rounded-lg hover:bg-brand-primary hover:text-white border border-hairline hover:border-brand-primary transition-all duration-150">
              Open Channel
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
