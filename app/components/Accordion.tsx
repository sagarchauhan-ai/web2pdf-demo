"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is Veeva Web2PDF?",
    answer:
      "Veeva Web2PDF is a cloud service that converts web pages — including dynamically rendered, JavaScript-heavy pages — into high-fidelity PDFs. It uses a headless browser under the hood and a declarative Hint system to capture every interactive UI state: dropdowns, carousels, accordions, and forms.",
  },
  {
    id: 2,
    question: "How do Hint attributes work?",
    answer:
      "Hints are plain HTML data attributes (data-vv-action, data-vv-seq, data-vv-snapshot, etc.) that you embed directly in your markup. The Web2PDF crawler reads them before rendering and executes the described interactions in order. For example, data-vv-seq=\"1\" on an accordion header tells the crawler: \"click this first, then snapshot.\" No JavaScript glue code required.",
  },
  {
    id: 3,
    question: "Which actions does the Hint system support?",
    answer:
      "The Hint system currently supports: hover (simulate mouse-over), click (simulate a mouse click, with optional data-vv-count for repeated clicks), fill (type a value into an input, paired with data-vv-fillvalue), and fillSubmit (fill + submit a form in one step). Each action can be paired with data-vv-snapshot=\"before\" or \"after\" to control when the page screenshot is taken relative to the action.",
  },
  {
    id: 4,
    question: "Can I capture multiple states of the same element?",
    answer:
      "Yes. Use data-vv-count on a click Hint to repeat the action. For example, data-vv-count=\"3\" on a carousel's next button will click it three times, capturing a separate page snapshot before (or after) each click. Combined with data-vv-seq on sibling elements, you can fully control the order in which multi-element sequences are captured.",
  },
  {
    id: 5,
    question: "Does Web2PDF work with Next.js / React apps?",
    answer:
      "Absolutely. Web2PDF's crawler waits for the JavaScript hydration to complete before executing Hints, so it works equally well with server-rendered pages, SPAs, and hybrid frameworks like Next.js. Just ensure your interactive components are mounted and visible before the crawler starts the Hint sequence.",
  },
];

export default function Accordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          /*
            Veeva Hint: click action on each accordion header.
            data-vv-action="click" → simulate a click to expand this section.
            data-vv-seq            → the crawl ORDER in which sections are expanded.
                                     Assigned dynamically via faq.id (1, 2, 3 …).
                                     This mirrors the accordion example in Veeva's
                                     docs: sections are expanded and captured one at
                                     a time in a defined sequence rather than all at once.
          */
          <div key={faq.id}>
            <button
              onClick={() => toggle(faq.id)}
              data-vv-action="click"
              data-vv-seq={String(faq.id)}
              className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <svg
                className={`w-5 h-5 flex-shrink-0 text-indigo-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className="accordion-content"
              style={{ maxHeight: isOpen ? "600px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <p className="px-6 py-5 text-gray-600 bg-gray-50 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
