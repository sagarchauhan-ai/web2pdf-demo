"use client";

import { useState } from "react";

const tabs = [
  {
    id: "web",
    label: "Web Apps",
    icon: "🌐",
    heading: "Capture any modern web application",
    body: "Web2PDF handles React, Vue, Angular and vanilla JS — full hydration awaited before capture. Dynamic routes, lazy-loaded images, and CSS-in-JS all render faithfully.",
    stats: [
      { label: "Frameworks supported", value: "All" },
      { label: "JS wait strategy", value: "networkidle" },
      { label: "Avg capture time", value: "0.8 s" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Views",
    icon: "📱",
    heading: "Responsive PDF at any viewport",
    body: "Set a custom viewport width and device pixel ratio to produce mobile-first PDFs. Perfect for capturing responsive breakpoints as separate pages in the same job.",
    stats: [
      { label: "Viewport presets", value: "10+" },
      { label: "DPR support", value: "1×–3×" },
      { label: "Orientation", value: "Portrait / Landscape" },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: "🏢",
    heading: "Scale to millions of pages",
    body: "Dedicated worker fleets, SLA-backed uptime, private cloud deployment, and a full audit trail for regulated industries. SOC 2 Type II certified.",
    stats: [
      { label: "Pages / hour", value: "500 k+" },
      { label: "Uptime SLA", value: "99.9 %" },
      { label: "Compliance", value: "SOC 2 · HIPAA" },
    ],
  },
];

export default function TabSwitcher() {
  const [activeId, setActiveId] = useState("web");
  const active = tabs.find((t) => t.id === activeId)!;

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-2 border-b border-gray-200 mb-8">
        {tabs.map((tab, i) => (
          /*
            Veeva Hint: click action on each tab button.
            data-vv-action="click" → simulate a click to switch to this tab.
            data-vv-seq            → order in which tabs are activated and
                                     captured: "1" (Web), "2" (Mobile), "3" (Enterprise).
                                     This mirrors the accordion sequencing pattern —
                                     each tab is activated and snapshotted in turn.
          */
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            data-vv-action="click"
            data-vv-seq={String(i + 1)}
            className={`px-5 py-3 text-sm font-semibold rounded-t-lg border-b-2 transition-colors -mb-px ${
              activeId === tab.id
                ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            aria-selected={activeId === tab.id}
            role="tab"
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start" role="tabpanel">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{active.heading}</h3>
          <p className="text-gray-500 leading-relaxed">{active.body}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {active.stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm"
            >
              <span className="text-sm text-gray-500">{s.label}</span>
              <span className="font-bold text-indigo-700">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
