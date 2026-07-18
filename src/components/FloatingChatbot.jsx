import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Bot,
  User,
  X,
  Maximize2,
  Sparkles,
  HelpCircle,
  Code2,
  Zap,
} from "lucide-react";
import gsap from "gsap";

// ─── Bot responses knowledge base ─────────────────────────────────────────────
const BOT_RESPONSES = {
  greet: {
    triggers: ["hi", "hello", "hey", "good morning", "good evening", "start", "hii"],
    reply: () =>
      `Hello! I'm **StudyBot** — your personal learning assistant.\n\nI can help you with:\n- Course recommendations and pricing\n- Concept explanations for React, AI/ML, Physics and Math\n- Clearing your doubts step by step\n- Enrollment and access info\n\nWhat would you like to explore?`,
  },
  react: {
    triggers: ["react", "reactjs", "react.js", "hooks", "jsx", "redux", "component", "usestate", "useeffect", "context api"],
    reply: () =>
      `**React.js — Core Concepts**\n\n**useState** — Manages local component state. Triggers re-render when state changes.\n\n**useEffect** — Handles side effects like API calls, subscriptions, and DOM manipulations.\n\n**useContext** — Shares state globally without prop drilling through the component tree.\n\nOur *Complete React.js Developer Course* covers all of this with 186 videos and 10 real-world projects. Do you have a specific concept you want explained?`,
  },
  ml: {
    triggers: ["machine learning", "ml", "ai", "artificial intelligence", "deep learning", "neural", "python ml", "tensorflow", "pytorch", "nlp", "llm", "gpt", "model", "dataset", "training"],
    reply: () =>
      `**Artificial Intelligence and Machine Learning**\n\n**Supervised Learning** — The model trains on labeled data to predict outputs for new inputs. Used for classification and regression.\n\n**Unsupervised Learning** — Finds patterns in unlabeled data.\n\nOur *AI and ML Zero to Hero* course covers all of this with TensorFlow, PyTorch, and 15 hands-on project builds.`,
  },
  physics: {
    triggers: ["physics", "class 12 physics", "electrostatics", "magnetism", "optics", "modern physics", "jee physics", "neet physics", "capacitor", "current", "circuit", "wave", "lens", "refraction", "photoelectric"],
    reply: () =>
      `**Class 12 Physics — Key Topics**\n\n**Electrostatics** — Coulomb's law, Electric field lines, Potential, Gauss's law, Capacitors and dielectrics.\n\n**Current Electricity** — Ohm's law, Kirchhoff's laws (KVL and KCL), Wheatstone bridge, Potentiometer.\n\nOur course has 420 chapter-wise videos and 5000 solved problems covering full JEE and NEET syllabi.`,
  },
  math: {
    triggers: ["math", "maths", "mathematics", "calculus", "integration", "differentiation", "vectors", "matrix", "probability", "class 12 math", "limits", "derivative", "integral"],
    reply: () =>
      `**Class 12 Mathematics — Quick Reference**\n\n**Differentiation** — d/dx(sin x) = cos x, d/dx(e^x) = e^x, Chain rule: d/dx[f(g(x))] = f'(g(x)) \u00b7 g'(x)\n\n**Integration** — Standard forms: integral of sin x = -cos x + C, integral of e^x = e^x + C.`,
  },
  price: {
    triggers: ["price", "cost", "fee", "how much", "pricing", "discount", "offer", "rupees", "inr", "cheap", "affordable", "enroll", "buy"],
    reply: () =>
      `**Course Pricing — All Plans**\n\n**React.js Complete** — Rs. 799 (was Rs. 2,999)\n**AI and ML Zero to Hero** — Rs. 1,299 (was Rs. 4,999)\n**Class 12 Physics** — Rs. 599 (was Rs. 2,499)\n**Python Mastery** — Rs. 699 (was Rs. 2,499)\n**Class 12 Mathematics** — Rs. 499 (was Rs. 1,999)\n**MERN Full Stack Bootcamp** — Rs. 999 (was Rs. 3,999)\n\nLifetime access, downloadable resources, and a certificate of completion. Click any course card in the Explore Courses section to enroll directly.`,
  },
  default: {
    reply: () =>
      `I am StudyBot! You can ask me things like:\n- "What topics are covered in the React course?"\n- "Explain how neural networks learn"\n- "What is the price of the AI and ML course?"\n- "I am stuck on integration in Class 12 Math"\n\nType your question and I will do my best to answer it clearly.`,
  },
};

const QUICK_PROMPTS = [
  { label: "React Hooks", icon: Code2, query: "Explain React hooks like useEffect and useState" },
  { label: "AI / ML Basics", icon: Sparkles, query: "What topics are covered in the AI and ML course?" },
  { label: "Course Pricing", icon: Zap, query: "What are the course prices and discounts?" },
];

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const key of Object.keys(BOT_RESPONSES)) {
    if (key === "default") continue;
    const { triggers, reply } = BOT_RESPONSES[key];
    if (triggers && triggers.some((t) => lower.includes(t))) return reply(input);
  }
  return BOT_RESPONSES.default.reply(input);
}

function parseMarkdown(text) {
  let html = text;
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(
    /`(.*?)`/g,
    '<code style="background:var(--color-brand-primary-light);color:var(--color-brand-primary);padding:1.5px 4px;border-radius:4px;font-family:monospace;font-size:11.5px;border:1px solid rgba(83,58,253,0.12)">$1</code>'
  );
  html = html.replace(/^- (.+)$/gm, '<li class="list-item">$1</li>');
  html = html.replace(/(<li class="list-item">.*?<\/li>\n?)+/gs, (match) => `<ul class="chat-list">${match}</ul>`);
  html = html.replace(/\n/g, "<br/>");
  return html;
}

export default function FloatingChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: `Hello! I'm **StudyBot** 👋\nHow can I help you with your courses today?`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg = { id: Date.now(), role: "user", text: trimmed, time: now };
    
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed);
      const botMsg = {
        id: Date.now() + 1,
        role: "bot",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 700 + Math.random() * 400);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleMaximize = () => {
    setIsOpen(false);
    navigate("/chatbot");
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Panel */}
      {isOpen && (
        <div
          ref={containerRef}
          className="w-80 sm:w-92 h-[460px] bg-white border border-hairline rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 mr-0.5 select-none"
        >
          {/* Header */}
          <div className="shrink-0 px-4 py-3 stripe-mesh-gradient flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-white" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white tracking-tight leading-tight">StudyBot AI</h3>
                <p className="text-[10px] text-white/70 font-normal mt-0.5">Online Helper</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleMaximize}
                className="w-6.5 h-6.5 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Full Screen Chat"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6.5 h-6.5 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-canvas-soft">
            <style>{`
              .chat-list { margin: 6px 0; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }
              .chat-list .list-item { display: flex; gap: 6px; }
              .chat-list .list-item::before { content: ""; width: 4.5px; height: 4.5px; border-radius: 50%; background: var(--color-brand-primary); flex-shrink: 0; margin-top: 6px; }
            `}</style>

            {messages.map((msg) => {
              const isBot = msg.role === "bot";
              return (
                <div key={msg.id} className={`flex gap-2.5 ${isBot ? "items-start" : "items-end flex-row-reverse"}`}>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                      isBot
                        ? "bg-brand-primary border-brand-primary text-white shadow-sm"
                        : "bg-white border-hairline text-ink-muted shadow-sm"
                    }`}
                  >
                    {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[76%] px-3 py-2 rounded-lg text-xs leading-[1.65] ${
                      isBot
                        ? "bg-white border border-hairline shadow-xs text-ink-secondary rounded-tl-none"
                        : "text-white rounded-br-none shadow-xs"
                    }`}
                    style={!isBot ? { backgroundColor: "var(--color-brand-primary)" } : {}}
                  >
                    {isBot ? (
                      <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }} />
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    <span className={`block text-[8px] mt-1.5 font-normal ${isBot ? "text-ink-muted" : "text-white/70"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center shrink-0 border border-brand-primary text-white shadow-sm">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-hairline shadow-xs px-3 py-2.5 rounded-lg rounded-tl-none flex items-center gap-1.5">
                  <span className="text-[10px] text-ink-muted mr-0.5">Typing</span>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full bg-brand-primary/50 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="shrink-0 bg-white border-t border-hairline px-3 py-2 flex gap-1.5 overflow-x-auto">
            {QUICK_PROMPTS.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.label}
                  onClick={() => sendMessage(p.query)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-canvas-soft border border-hairline text-[10px] font-semibold text-ink-secondary hover:text-brand-primary hover:border-brand-primary/30 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Icon className="w-3 h-3 text-ink-muted shrink-0" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input box */}
          <div className="shrink-0 bg-white border-t border-hairline p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask StudyBot a doubt..."
              className="flex-1 px-3 py-1.5 bg-canvas-soft border border-hairline text-xs rounded-lg outline-none focus:bg-white focus:border-brand-primary-soft transition-all duration-100 font-normal"
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-8 h-8 rounded-lg bg-brand-primary hover:bg-brand-primary-soft flex items-center justify-center text-white transition-all cursor-pointer shadow-sm shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-brand-primary hover:bg-brand-primary-soft flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer relative group"
        style={{ boxShadow: "0 8px 30px rgba(94,92,230,0.35)" }}
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-brand-primary/20 animate-ping opacity-75 pointer-events-none group-hover:animate-none" />
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6.5 h-6.5" />}
      </button>
    </div>
  );
}
