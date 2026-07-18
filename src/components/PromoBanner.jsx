import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PromoBanner() {
  const buttonRef = useRef(null);
  const sparkle1Ref = useRef(null);
  const sparkle2Ref = useRef(null);

  useEffect(() => {
    // Subtle float animation for the decorative sparkles
    gsap.to([sparkle1Ref.current, sparkle2Ref.current], {
      y: -6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.4
    });
  }, []);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, { scale: 1.05, duration: 0.2, ease: "power1.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: "power1.out" });
  };

  return (
    <div className="relative stripe-mesh-gradient rounded-2xl p-8 text-white overflow-hidden shadow-sm">
      {/* Background Decorative Sparkles */}
      <div 
        ref={sparkle1Ref} 
        className="absolute right-[15%] top-[25%] text-white/10 pointer-events-none"
      >
        <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L15.5 8.5L24 12L15.5 15.5L12 24L8.5 15.5L0 12L8.5 8.5L12 0Z" />
        </svg>
      </div>
      <div 
        ref={sparkle2Ref} 
        className="absolute right-[8%] bottom-[20%] text-white/5 pointer-events-none"
      >
        <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
          <path d="M12 0L15.5 8.5L24 12L15.5 15.5L12 24L8.5 15.5L0 12L8.5 8.5L12 0Z" />
        </svg>
      </div>
      <div className="absolute right-[28%] bottom-[30%] w-2 h-2 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute right-[22%] top-[40%] w-1.5 h-1.5 rounded-full bg-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-lg">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          Online Course
        </span>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight leading-tight mt-5 mb-6 text-white">
          Sharpen Your Skills with Professional Online Courses
        </h2>
        <button
          ref={buttonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-brand-primary text-xs font-semibold rounded-full shadow-md transition-all duration-150 hover:bg-brand-primary-light cursor-pointer"
        >
          <span>Join Now</span>
          <span className="w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-[10px]">
            &gt;
          </span>
        </button>
      </div>
    </div>
  );
}
