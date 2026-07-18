import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FloatingChatbot from "./FloatingChatbot";
import gsap from "gsap";

export default function Layout() {
  const containerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Elegant entrance animation for the dashboard shell
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.98, y: 15 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        onComplete: () => {
          // Clear transform/gsap properties to prevent viewport coordinate bugs on mobile browsers
          gsap.set(containerRef.current, { clearProps: "all" });
        }
      }
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-dvh bg-white flex overflow-hidden relative"
    >
      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-[#0d253d]/30 backdrop-blur-xs lg:hidden transition-all duration-150"
        />
      )}

      {/* Sidebar navigation */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Main panel */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-canvas-soft">
        {/* Header bar */}
        <Header onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMenuOpen={isMobileMenuOpen} />

        {/* Content area */}
        <main className="flex-1 overflow-y-scroll min-h-0 bg-canvas-soft">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Bot Assistant */}
      <FloatingChatbot />
    </div>
  );
}
