import Link from "next/link";
import Accordion from "../components/Accordion";

export const metadata = {
  title: "Products & FAQ — Web2PDF Demo",
  description: "Learn about Veeva Web2PDF features and Hint-sequencing via an interactive FAQ accordion.",
};

const products = [
  {
    id: "web2pdf",
    icon: "📄",
    name: "Web2PDF",
    tagline: "Headless browser PDF generation with Hint-sequencing.",
    bullets: [
      "Captures JavaScript-rendered content",
      "Declarative data-vv-* Hint attributes",
      "Parallel page workers — thousands of pages/hour",
      "Sitemap-driven crawl or single-URL mode",
    ],
  },
  {
    id: "edetailing",
    icon: "💊",
    name: "eDetailing",
    tagline: "Interactive slide decks for HCP field visits.",
    bullets: [
      "Offline-capable HTML5 presentations",
      "CLM integration with Veeva CRM",
      "Real-time engagement analytics",
      "Regulatory-compliant approval workflow",
    ],
  },
  {
    id: "crm",
    icon: "🔗",
    name: "CRM Integration",
    tagline: "Push PDF assets directly into Veeva CRM.",
    bullets: [
      "One-click publish to Approved Email",
      "Auto-version on source page change",
      "Role-based access control",
      "Full audit trail & e-signature support",
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-violet-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
            Products
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Built for Life Sciences
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            A focused suite of tools for automating regulated PDF content — from headless
            rendering to CRM delivery.
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              id={p.id}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{p.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{p.tagline}</p>
              <ul className="space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 mt-0.5 text-violet-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ section with Accordion */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-semibold text-violet-500 uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-sm text-gray-400 mb-8">
            Each accordion header carries{" "}
            <span className="font-mono bg-gray-200 px-1 rounded">data-vv-action=&quot;click&quot;</span>{" "}
            and{" "}
            <span className="font-mono bg-gray-200 px-1 rounded">data-vv-seq=&quot;1&quot;…&quot;5&quot;</span>
            {" "}— the crawler expands and captures them in order.
          </p>
          {/*
            Accordion headers carry:
            data-vv-action="click" data-vv-seq="1" (through "5")
          */}
          <Accordion />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-500 mb-6">
            Our team is happy to walk you through a live demo and answer technical integration
            questions.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 transition-colors"
          >
            Talk to Sales →
          </Link>
        </div>
      </section>
    </>
  );
}
