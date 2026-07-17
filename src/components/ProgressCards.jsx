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
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "hover:border-indigo-200"
    },
    {
      watched: "3/8 watched",
      title: "Branding",
      icon: Palette,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "hover:border-pink-200"
    },
    {
      watched: "6/12 watched",
      title: "Front End",
      icon: Code,
      iconColor: "text-sky-600",
      bgColor: "bg-sky-50",
      borderColor: "hover:border-sky-200"
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
            className={`bg-white border border-slate-100/80 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer transition-all duration-200 ${data.borderColor} hover:shadow-md`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${data.bgColor} ${data.iconColor} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-semibold">{data.watched}</span>
                <h4 className="text-sm font-bold text-slate-700 truncate">{data.title}</h4>
              </div>
            </div>
            
            <button className="text-slate-300 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors duration-150 cursor-pointer">
              <MoreVertical className="w-4 h-4 shrink-0" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
