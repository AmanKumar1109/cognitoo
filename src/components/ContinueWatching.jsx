import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import gsap from "gsap";

export default function ContinueWatching() {
  const cardsRef = useRef([]);
  const [favorites, setFavorites] = useState([false, true, false]);

  useEffect(() => {
    // Elegant slide-up staggered transition
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const toggleFavorite = (idx, e) => {
    e.stopPropagation();
    const updated = [...favorites];
    updated[idx] = !updated[idx];
    setFavorites(updated);
  };

  const cardsData = [
    {
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=80",
      tag: "Front End",
      tagStyles: "bg-brand-primary-light text-brand-primary",
      title: "Beginner's Guide to Becoming a Professional Front-End Developer",
      mentor: "Leonardo samsul",
      mentorInitial: "LS"
    },
    {
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&auto=format&fit=crop&q=80",
      tag: "UI/UX Design",
      tagStyles: "bg-magenta/10 text-magenta",
      title: "Optimizing User Experience with the Best UI/UX Design",
      mentor: "Bayu Salto",
      mentorInitial: "BS"
    },
    {
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80",
      tag: "Branding",
      tagStyles: "bg-ruby/10 text-ruby",
      title: "Reviving and Refreshing Company Image",
      mentor: "Padhang Satrio",
      mentorInitial: "PS"
    }
  ];

  const handleCardHover = (idx, enter) => {
    const card = cardsRef.current[idx];
    if (card) {
      const img = card.querySelector(".course-img");
      gsap.to(card, {
        y: enter ? -3 : 0,
        boxShadow: enter ? "rgba(50, 50, 93, 0.04) 0px 6px 12px -2px, rgba(0, 0, 0, 0.02) 0px 3px 7px -3px" : "rgba(50, 50, 93, 0.02) 0px 2px 5px 0px, rgba(0, 0, 0, 0.01) 0px 1px 1px 0px",
        borderColor: enter ? "#d8deeb" : "var(--color-hairline)",
        duration: 0.2,
        ease: "power1.out"
      });
      gsap.to(img, {
        scale: enter ? 1.03 : 1,
        duration: 0.25,
        ease: "power1.out"
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-ink">Continue Watching</h3>
        <div className="flex items-center gap-1.5">
          <button className="w-7.5 h-7.5 rounded-lg border border-hairline bg-white flex items-center justify-center text-ink-muted hover:text-ink hover:border-hairline-strong transition-all duration-150 cursor-pointer shadow-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-7.5 h-7.5 rounded-lg bg-brand-primary flex items-center justify-center text-white hover:bg-brand-primary-soft transition-all duration-150 cursor-pointer shadow-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cardsData.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            onMouseEnter={() => handleCardHover(idx, true)}
            onMouseLeave={() => handleCardHover(idx, false)}
            className="bg-white border border-hairline rounded-xl p-3 flex flex-col shadow-sm cursor-pointer select-none overflow-hidden transition-all duration-150"
          >
            {/* Image Thumbnail */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
              <img
                src={card.image}
                alt={card.title}
                className="course-img w-full h-full object-cover transition-transform duration-300"
              />
              {/* Heart Button Overlay */}
              <button
                onClick={(e) => toggleFavorite(idx, e)}
                className="absolute top-2 right-2 w-7.5 h-7.5 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center text-ink-muted hover:text-ruby transition-colors duration-150 shadow-sm cursor-pointer"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${favorites[idx] ? "fill-ruby text-ruby" : ""}`}
                />
              </button>
            </div>

            {/* Tag */}
            <div className="px-1">
              <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${card.tagStyles}`}>
                {card.tag}
              </span>
              {/* Title */}
              <h4 className="text-[12px] font-semibold text-ink mt-2.5 mb-4 leading-snug line-clamp-2 h-8">
                {card.title}
              </h4>
            </div>

            {/* Divider */}
            <div className="border-t border-hairline my-2" />

            {/* Mentor Info */}
            <div className="flex items-center gap-2.5 px-1 py-1">
              <div className="w-6.5 h-6.5 rounded-lg bg-brand-primary-light flex items-center justify-center text-[10px] font-bold text-brand-primary shrink-0 border border-hairline">
                {card.mentorInitial}
              </div>
              <div className="min-w-0">
                <h5 className="text-[10px] font-semibold text-ink-secondary truncate">{card.mentor}</h5>
                <p className="text-[9px] text-ink-muted font-normal leading-none">Mentor</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
