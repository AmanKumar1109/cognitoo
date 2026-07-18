import React, { useEffect, useRef } from "react";
import PromoBanner from "../components/PromoBanner";
import ProgressCards from "../components/ProgressCards";
import ContinueWatching from "../components/ContinueWatching";
import YourLessons from "../components/YourLessons";
import Statistics from "../components/Statistics";
import MentorsList from "../components/MentorsList";
import ExploreCourses from "../components/ExploreCourses";
import gsap from "gsap";

export default function Dashboard() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Staggered entry animation for all widgets in the dashboard
    const elements = containerRef.current.querySelectorAll(".dashboard-widget");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 h-full bg-canvas-soft"
    >
      {/* Left Columns: Core dashboard materials */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        <div className="dashboard-widget">
          <PromoBanner />
        </div>
        <div className="dashboard-widget">
          <ProgressCards />
        </div>
        <div className="dashboard-widget">
          <ContinueWatching />
        </div>
        <div className="dashboard-widget">
          <YourLessons />
        </div>
        <div className="dashboard-widget">
          <ExploreCourses />
        </div>
      </div>

      {/* Right Column: Statistics, Profile, Mentors */}
      <div className="w-full lg:w-[320px] xl:w-[350px] flex flex-col gap-8 shrink-0">
        <div className="dashboard-widget">
          <Statistics />
        </div>
        <div className="dashboard-widget">
          <MentorsList />
        </div>
      </div>
    </div>
  );
}
