import React, { useEffect, useRef } from "react";
import { MoreHorizontal } from "lucide-react";
import gsap from "gsap";

export default function Statistics() {
  const circleRef = useRef(null);
  const barsRef = useRef([]);
  const textRef = useRef(null);

  // Circle calculations
  const radius = 42;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.32; // 32%
  const targetOffset = circumference - progress * circumference;

  useEffect(() => {
    // 1. Animate SVG circle progress draw-in
    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      { strokeDashoffset: targetOffset, duration: 1.2, ease: "power2.out" }
    );

    // 2. Animate bar chart heights from 0 to full
    barsRef.current.forEach((bar) => {
      if (bar) {
        const targetHeight = bar.getAttribute("data-height");
        gsap.fromTo(
          bar,
          { height: "0%" },
          { height: targetHeight, duration: 1, delay: 0.2, ease: "elastic.out(1, 0.75)" }
        );
      }
    });

    // 3. Greeting animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div className="bg-white border border-hairline rounded-xl p-6 shadow-sm flex flex-col items-center select-none relative">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-ink">Statistics</h3>
        <button className="text-ink-muted hover:text-ink-secondary transition-colors duration-150 cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
        {/* SVG Circle Progress */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Track Circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="var(--color-brand-primary-light)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            ref={circleRef}
            cx="48"
            cy="48"
            r={radius}
            stroke="var(--color-brand-primary)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Circular Avatar Center */}
        <div className="absolute w-[72px] h-[72px] rounded-full overflow-hidden border border-hairline flex items-center justify-center bg-brand-primary-light">
          <svg className="w-14 h-14 mt-1.5 text-brand-primary/60" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>

        {/* 32% Tag Badge overlay */}
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded bg-brand-primary text-white text-[8px] font-bold tracking-widest uppercase">
          32%
        </span>
      </div>

      {/* Greeting info */}
      <div ref={textRef} className="text-center mb-6">
        <h4 className="text-[13px] font-semibold text-ink flex items-center justify-center gap-1">
          Good Morning Jason 🔥
        </h4>
        <p className="text-[10px] text-ink-muted font-normal leading-normal mt-0.5">
          Continue your learning to achieve your target!
        </p>
      </div>

      {/* Bar Chart Activity Section */}
      <div className="w-full bg-canvas-soft border border-hairline rounded-lg p-4 flex flex-col">
        {/* Y Axis Grid lines container */}
        <div className="relative flex-1 flex flex-col justify-between h-20 mb-2">
          {/* Horizontal dotted grid lines */}
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-hairline w-full" />
          <div className="absolute inset-x-0 top-1/3 border-t border-dashed border-hairline w-full" />
          <div className="absolute inset-x-0 top-2/3 border-t border-dashed border-hairline w-full" />
          <div className="absolute inset-x-0 bottom-0 border-t border-dashed border-hairline w-full" />

          {/* Grid items and label rows */}
          <div className="flex h-full items-end justify-around relative z-10 px-6">
            {/* Bar 1: 1-10 Aug (35%) */}
            <div className="w-8 flex flex-col justify-end items-center h-full">
              <div
                ref={(el) => (barsRef.current[0] = el)}
                data-height="40%"
                className="w-4 bg-brand-primary-light hover:bg-brand-primary/20 rounded-t-md transition-colors duration-150 cursor-pointer"
                style={{ height: "40%" }}
              />
            </div>
            {/* Bar 2: 11-20 Aug (55%) */}
            <div className="w-8 flex flex-col justify-end items-center h-full">
              <div
                ref={(el) => (barsRef.current[1] = el)}
                data-height="55%"
                className="w-4 bg-brand-primary-light hover:bg-brand-primary/20 rounded-t-md transition-colors duration-150 cursor-pointer"
                style={{ height: "55%" }}
              />
            </div>
            {/* Bar 3: 21-30 Aug (85%) */}
            <div className="w-8 flex flex-col justify-end items-center h-full">
              <div
                ref={(el) => (barsRef.current[2] = el)}
                data-height="85%"
                className="w-4 bg-brand-primary hover:bg-brand-primary-soft rounded-t-md transition-colors duration-150 cursor-pointer"
                style={{ height: "85%" }}
              />
            </div>
          </div>
          
          {/* Y Axis labels inside (20, 40, 60) */}
          <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between text-[8px] font-bold text-ink-muted/50 tnum pointer-events-none">
            <span>60</span>
            <span>40</span>
            <span>20</span>
          </div>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-around text-[9px] font-bold text-ink-muted border-t border-hairline pt-1.5 px-4 tnum">
          <span>1-10 Aug</span>
          <span>11-20 Aug</span>
          <span>21-30 Aug</span>
        </div>
      </div>
    </div>
  );
}
