"use client";

import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Automate PDF Generation",
    subtitle: "Convert any web page into a pixel-perfect PDF with a single API call.",
    bg: "from-indigo-600 to-indigo-800",
    icon: "📄",
  },
  {
    id: 2,
    title: "Hint-Sequenced Interactions",
    subtitle: "Teach the crawler to hover, click, and fill forms — capturing every UI state.",
    bg: "from-violet-600 to-violet-800",
    icon: "🎯",
  },
  {
    id: 3,
    title: "Veeva CRM Ready",
    subtitle: "Built for life-sciences field teams. Push approved PDFs directly to Veeva CRM.",
    bg: "from-sky-600 to-sky-800",
    icon: "🏥",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
      {/* Slides */}
      <div
        className="carousel-track flex"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full bg-gradient-to-br ${slide.bg} text-white flex flex-col items-center justify-center py-24 px-8 text-center`}
          >
            <span className="text-6xl mb-6">{slide.icon}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">{slide.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/*
        Veeva Hint: click action on the carousel "next" control.
        data-vv-action="click"   → simulate a click.
        data-vv-count="2"        → repeat the click 2 times (advances 2 slides).
        data-vv-snapshot="before" → take a snapshot BEFORE each click so every
                                    slide is captured in its pre-advance state.
      */}
      <button
        onClick={goNext}
        data-vv-action="click"
        data-vv-count="2"
        data-vv-snapshot="before"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
