import React, { useEffect, useRef } from "react";
import { Mail, Send, Trash2, ShieldAlert } from "lucide-react";
import gsap from "gsap";

export default function Inbox() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const messages = [
    { id: 1, sender: "Leonardo Samsul", subject: "Reviewing your CSS layouts", time: "10:25 AM", content: "Great progress on the layouts! Let's review the final flex grids in our next session.", unread: true },
    { id: 2, sender: "Bayu Salto", subject: "Branding materials feedback", time: "Yesterday", content: "The logos are looking crisp. Let's make sure the color scheme scales well on darker cards.", unread: false },
    { id: 3, sender: "Padhang Satrio", subject: "New course materials released", time: "June 15", content: "I have uploaded the new lessons for the UI/UX workshop. Please check them out.", unread: false },
  ];

  return (
    <div ref={containerRef} className="p-8 max-w-5xl bg-canvas-soft min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[16px] font-semibold text-ink">Inbox</h1>
          <p className="text-xs text-ink-muted">Keep in touch with your course mentors and friends</p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer shadow-sm">
          <Send className="w-4 h-4" />
          Compose
        </button>
      </div>

      <div className="bg-white border border-hairline rounded-xl overflow-hidden shadow-sm">
        <div className="border-b border-hairline px-6 py-3 bg-canvas-soft flex gap-5 text-[12px] font-medium text-ink-muted">
          <button className="text-brand-primary cursor-pointer">All Messages</button>
          <button className="hover:text-ink cursor-pointer">Unread</button>
          <button className="hover:text-ink cursor-pointer">Archived</button>
        </div>
        <div className="divide-y divide-hairline">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 flex items-start gap-4 hover:bg-canvas-soft/50 transition-colors duration-150 cursor-pointer relative ${
                msg.unread ? "bg-brand-primary-light/20" : ""
              }`}
            >
              {msg.unread && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary" />
              )}
              <div className="w-8.5 h-8.5 rounded-lg bg-brand-primary-light border border-hairline text-brand-primary flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className={`text-[13px] ${msg.unread ? "font-semibold text-ink" : "font-medium text-ink-secondary"}`}>
                    {msg.sender}
                  </h3>
                  <span className="text-[11px] text-ink-muted">{msg.time}</span>
                </div>
                <h4 className={`text-[12px] mb-0.5 ${msg.unread ? "font-medium text-ink" : "text-ink-secondary"}`}>
                  {msg.subject}
                </h4>
                <p className="text-[12px] text-ink-muted truncate">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
