import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function YourLessons() {
  const rowRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      rowRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-ink">Your Lesson</h3>
        <button 
          onClick={() => alert("Redirecting to all lessons...")}
          className="text-xs font-semibold text-brand-primary hover:text-brand-primary-soft transition-colors duration-150 cursor-pointer"
        >
          See all
        </button>
      </div>

      {/* Table Structure */}
      <div className="bg-white border border-hairline rounded-xl p-4 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-hairline pb-3">
              <th className="text-[10px] font-bold text-ink-muted uppercase tracking-wider pb-3">Mentor</th>
              <th className="text-[10px] font-bold text-ink-muted uppercase tracking-wider pb-3">Type</th>
              <th className="text-[10px] font-bold text-ink-muted uppercase tracking-wider pb-3">Desc</th>
              <th className="text-[10px] font-bold text-ink-muted uppercase tracking-wider pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              ref={rowRef} 
              className="group hover:bg-canvas-soft/80 transition-colors duration-150"
            >
              {/* Mentor */}
              <td className="py-3.5 flex items-center gap-3">
                <div className="w-7.5 h-7.5 rounded-lg bg-lemon/10 flex items-center justify-center font-bold text-lemon text-xs shrink-0 border border-hairline">
                  PS
                </div>
                <div>
                  <h4 className="text-[12px] font-semibold text-ink leading-tight">Padhang Satrio</h4>
                  <span className="text-[10px] text-ink-muted">2/16/2004</span>
                </div>
              </td>

              {/* Type Badge */}
              <td className="py-3.5">
                <span className="inline-block px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest rounded-full border border-brand-primary/20 bg-brand-primary-light text-brand-primary">
                  ✦ UI/UX Design
                </span>
              </td>

              {/* Description */}
              <td className="py-3.5">
                <p className="text-[12px] text-ink-secondary max-w-xs truncate">
                  Understand Of UI/UX Design fundamentals and typography
                </p>
              </td>

              {/* Action Trigger */}
              <td className="py-3.5 text-right">
                <button className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-hairline bg-white text-ink-muted hover:text-brand-primary hover:border-hairline-strong hover:shadow-sm transition-all duration-150 cursor-pointer group-hover:scale-105">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
