import React, { useEffect, useRef } from "react";
import ExploreCourses from "../components/ExploreCourses";
import gsap from "gsap";
import { Compass } from "lucide-react";

export default function CoursesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="p-6 md:p-8 flex flex-col gap-8 bg-canvas-soft min-h-full">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center shadow-sm shrink-0">
          <Compass className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h1 className="text-[16px] font-semibold text-ink leading-tight">Explore Courses</h1>
          <p className="text-xs text-ink-muted font-normal mt-0.5">
            Discover world-class fitness &amp; wellness programs — click any card for full details
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <ExploreCourses />
    </div>
  );
}
