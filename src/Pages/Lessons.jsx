import React, { useEffect, useRef } from "react";
import { BookOpen, GraduationCap, Clock, Award } from "lucide-react";
import gsap from "gsap";

export default function Lessons() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const courses = [
    { title: "UI/UX Advanced Masterclass", category: "UI/UX Design", lessons: 8, progress: 25, color: "border-l-brand-primary" },
    { title: "Visual Branding & Identity Systems", category: "Branding", lessons: 8, progress: 37.5, color: "border-l-ruby" },
    { title: "Modern Front-End Development", category: "Front End", lessons: 12, progress: 50, color: "border-l-brand-primary-soft" },
    { title: "Introduction to Motion Graphics", category: "Design", lessons: 10, progress: 0, color: "border-l-magenta" },
  ];

  return (
    <div ref={containerRef} className="p-8 max-w-5xl bg-canvas-soft min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[16px] font-semibold text-ink">My Lessons</h1>
          <p className="text-xs text-ink-muted">Track and jump back into your online training programs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className={`bg-white border-l-4 ${course.color} border border-hairline rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-0.5 text-[8px] font-bold rounded uppercase tracking-widest bg-canvas-soft text-ink-muted">
                {course.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-ink-muted font-normal">
                <BookOpen className="w-3.5 h-3.5" />
                {course.lessons} Chapters
              </span>
            </div>
            <h3 className="text-[14px] font-semibold text-ink mb-6 hover:text-brand-primary transition-colors duration-150">
              {course.title}
            </h3>
            
            <div>
              <div className="flex justify-between items-center text-[11px] font-medium text-ink-muted mb-2 tnum">
                <span>Course Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-canvas-soft h-1.5 rounded-full overflow-hidden border border-hairline">
                <div
                  className="bg-brand-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
