import React, { useEffect, useRef } from "react";
import { Sparkles, Palette, Code, MoreVertical } from "lucide-react";
import gsap from "gsap";

export default function ProgressCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Staggered entrance animation for cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const progressData = [
    {
      watched: "2/8 watched",
      title: "UI/UX Design",
      icon: Sparkles,
      iconColor: "text-brand-primary",
      bgColor: "bg-brand-primary-light",
      borderColor: "hover:border-brand-primary/30"
    },
    {
      watched: "3/8 watched",
      title: "Branding",
      icon: Palette,
      iconColor: "text-magenta",
      bgColor: "bg-magenta/10",
      borderColor: "hover:border-magenta/30"
    },
    {
      watched: "6/12 watched",
      title: "Front End",
      icon: Code,
      iconColor: "text-ruby",
      bgColor: "bg-ruby/10",
      borderColor: "hover:border-ruby/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {progressData.map((data, idx) => {
        const Icon = data.icon;
        return (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className={`bg-white border border-hairline rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer transition-all duration-150 ${data.borderColor} hover:shadow-md`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${data.bgColor} ${data.iconColor} flex items-center justify-center shrink-0`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-ink-muted font-normal">{data.watched}</span>
                <h4 className="text-[13px] font-semibold text-ink truncate">{data.title}</h4>
              </div>
            </div>
            
            <button className="text-ink-muted hover:text-ink-secondary p-1 rounded-md hover:bg-canvas-soft transition-all duration-150 cursor-pointer">
              <MoreVertical className="w-4 h-4 shrink-0" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
