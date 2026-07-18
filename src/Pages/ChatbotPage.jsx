import React from "react";
import Chatbot from "../components/Chatbot";

export default function ChatbotPage() {
  return (
    /* Outer padded shell — gives breathing room from the page edges */
    <div className="h-full p-6 bg-canvas-soft flex items-stretch">
      {/* Floating card with curved edges and layered shadow */}
      <div
        className="flex-1 rounded-xl overflow-hidden flex flex-col border border-hairline bg-white"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.03) 0px 2px 5px 0px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0px",
        }}
      >
        <Chatbot />
      </div>
    </div>
  );
}
