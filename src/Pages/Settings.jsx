import React, { useEffect, useRef } from "react";
import { Settings as SettingsIcon, Bell, Shield, Eye, Sun, Moon } from "lucide-react";
import gsap from "gsap";
import { useTheme } from "../components/ThemeContext";

export default function Settings() {
  const containerRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={containerRef} className="p-8 max-w-5xl bg-canvas-soft min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[16px] font-semibold text-ink">Settings</h1>
          <p className="text-xs text-ink-muted">Configure your learning profile and dashboard options</p>
        </div>
      </div>

      <div className="bg-white border border-hairline rounded-xl p-6 space-y-8 shadow-sm">
        {/* Profile Card settings */}
        <div>
          <h2 className="text-[13px] font-semibold text-ink mb-4 flex items-center gap-2">
            <SettingsIcon className="w-4.5 h-4.5 text-brand-primary" />
            General Profile Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-semibold text-ink-muted mb-2 uppercase tracking-wide">Display Name</label>
              <input
                type="text"
                defaultValue="Jason Ranti"
                className="w-full px-3.5 py-2 bg-canvas-soft border border-hairline text-sm text-ink rounded-lg outline-none focus:bg-white focus:border-brand-primary-soft focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-ink-muted mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                defaultValue="jason.ranti@coursue.com"
                className="w-full px-3.5 py-2 bg-canvas-soft border border-hairline text-sm text-ink rounded-lg outline-none focus:bg-white focus:border-brand-primary-soft focus:ring-4 focus:ring-brand-primary-light transition-all duration-150 font-normal"
              />
            </div>
          </div>
        </div>

        {/* Notifications and Security */}
        <div className="border-t border-hairline pt-6">
          <h2 className="text-[13px] font-semibold text-ink mb-4 flex items-center gap-2">
            <Bell className="w-4.5 h-4.5 text-brand-primary" />
            Notifications
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-brand-primary rounded border-hairline focus:ring-brand-primary cursor-pointer"
              />
              <span className="text-xs font-normal text-ink-secondary">Email notifications for new lessons and mentor updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-brand-primary rounded border-hairline focus:ring-brand-primary cursor-pointer"
              />
              <span className="text-xs font-normal text-ink-secondary">Popup alerts for direct messages and peer responses</span>
            </label>
          </div>
        </div>

        {/* Appearance Preferences */}
        <div className="border-t border-hairline pt-6">
          <h2 className="text-[13px] font-semibold text-ink mb-2 flex items-center gap-2">
            <Eye className="w-4.5 h-4.5 text-brand-primary" />
            Appearance Preferences
          </h2>
          <p className="text-xs text-ink-muted mb-5">Choose how Cognitoo looks on your device. Changes are saved automatically.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            {/* Light Mode Card */}
            <div 
              onClick={() => toggleTheme("light")}
              className={`border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 group relative overflow-hidden select-none ${
                theme === "light" 
                  ? "border-brand-primary ring-2 ring-brand-primary-light bg-white shadow-sm" 
                  : "border-hairline hover:border-ink-muted bg-canvas-soft"
              }`}
            >
              {/* Mini mock layout preview for light theme */}
              <div className="w-full h-24 bg-[#f6f9fc] rounded-lg border border-hairline p-2 mb-3.5 flex gap-1.5 overflow-hidden">
                {/* Sidebar */}
                <div className="w-8 bg-white border-r border-hairline h-full flex flex-col gap-1 p-1">
                  <div className="w-full h-1.5 rounded bg-brand-primary-light" />
                  <div className="w-full h-1 bg-[#f6f9fc] rounded" />
                  <div className="w-full h-1 bg-[#f6f9fc] rounded" />
                </div>
                {/* Content Area */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="h-3.5 bg-white border border-hairline rounded p-1 flex items-center">
                    <div className="w-6 h-0.5 bg-[#64748d] rounded" />
                  </div>
                  <div className="flex gap-1.5 flex-1">
                    <div className="flex-1 bg-white border border-hairline rounded p-1 flex flex-col gap-1">
                      <div className="w-8 h-0.5 bg-[#273951] rounded" />
                      <div className="w-12 h-0.5 bg-[#64748d] rounded" />
                    </div>
                    <div className="w-6 bg-white border border-hairline rounded p-1 flex flex-col gap-1">
                      <div className="w-4.5 h-0.5 bg-brand-primary rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className={`w-4 h-4 ${theme === "light" ? "text-brand-primary animate-spin-slow" : "text-ink-muted"}`} />
                  <span className={`text-[12.5px] font-semibold ${theme === "light" ? "text-brand-primary font-bold" : "text-ink"}`}>Light Theme</span>
                </div>
                {theme === "light" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                )}
              </div>
              <p className="text-[10px] text-ink-muted mt-1.5 leading-normal">
                Inspired by Stripe's financial canvas — clean off-white backgrounds, slate elements.
              </p>
            </div>

            {/* Dark Mode Card */}
            <div 
              onClick={() => toggleTheme("dark")}
              className={`border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 group relative overflow-hidden select-none ${
                theme === "dark" 
                  ? "border-brand-primary ring-2 ring-brand-primary-light bg-[#0f1013] shadow-sm" 
                  : "border-hairline hover:border-ink-muted bg-canvas-soft"
              }`}
            >
              {/* Mini mock layout preview for dark theme */}
              <div className="w-full h-24 bg-[#08090b] rounded-lg border border-[#222329] p-2 mb-3.5 flex gap-1.5 overflow-hidden">
                {/* Sidebar */}
                <div className="w-8 bg-[#0f1013] border-r border-[#222329] h-full flex flex-col gap-1 p-1">
                  <div className="w-full h-1.5 rounded bg-[#161726]" />
                  <div className="w-full h-1 bg-[#08090b] rounded" />
                  <div className="w-full h-1 bg-[#08090b] rounded" />
                </div>
                {/* Content Area */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="h-3.5 bg-[#0f1013] border border-[#222329] rounded p-1 flex items-center">
                    <div className="w-6 h-0.5 bg-[#64748b] rounded" />
                  </div>
                  <div className="flex gap-1.5 flex-1">
                    <div className="flex-1 bg-[#0f1013] border border-[#222329] rounded p-1 flex flex-col gap-1">
                      <div className="w-8 h-0.5 bg-[#cbd5e1] rounded" />
                      <div className="w-12 h-0.5 bg-[#64748b] rounded" />
                    </div>
                    <div className="w-6 bg-[#0f1013] border border-[#222329] rounded p-1 flex flex-col gap-1">
                      <div className="w-4.5 h-0.5 bg-[#807df6] rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className={`w-4 h-4 ${theme === "dark" ? "text-brand-primary" : "text-ink-muted"}`} />
                  <span className={`text-[12.5px] font-semibold ${theme === "dark" ? "text-brand-primary font-bold" : "text-ink"}`}>Dark Theme</span>
                </div>
                {theme === "dark" && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                )}
              </div>
              <p className="text-[10px] text-ink-muted mt-1.5 leading-normal">
                Inspired by Linear's nocturnal console — charcoal dark panels, electric indigo accents.
              </p>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="border-t border-hairline pt-6 flex justify-end">
          <button
            onClick={() => alert("Settings Saved!")}
            className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
