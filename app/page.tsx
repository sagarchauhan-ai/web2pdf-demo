import Link from "next/link";
import Carousel from "./components/Carousel";

export default function HomePage() {
  const features = [
    {
      icon: "🖨️",
      title: "Pixel-Perfect PDFs",
      description:
        "Renders CSS animations, web fonts, and gradients exactly as a user sees them in Chrome — no layout shifts, no broken fonts.",
    },
    {
      icon: "🤖",
      title: "Hint-Driven Automation",
      description:
        "Declarative HTML attributes tell the crawler to hover menus, click carousels, fill forms, and expand accordions before capturing.",
    },
    {
      icon: "⚡",
      title: "Sub-Second Capture",
      description:
        "Parallel page workers and an edge-cached headless fleet process thousands of pages per hour with sub-second per-page latency.",
    },
    {
      icon: "🏥",
      title: "Veeva CRM Integration",
      description:
        "Push approved PDF content directly to Veeva CRM Approved Email and eDetailing with a single API call.",
    },
  ];

  return (
    <>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
            Veeva Web2PDF Demo
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Turn Any Web Page Into a <br className="hidden md:block" />
            <span className="text-indigo-600">Perfect PDF</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            This demo site showcases Veeva Web2PDF Hint-sequencing — hover menus, carousels,
            accordions, and forms are all captured automatically via{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-700">
              data-vv-*
            </code>{" "}
            attributes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-md"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full border-2 border-indigo-200 hover:border-indigo-400 transition-colors"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Carousel section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
            Hint-Sequenced Carousel
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            See Web2PDF in Action
          </h2>
          {/*
            Carousel "next" button carries:
            data-vv-action="click" data-vv-count="2" data-vv-snapshot="before"
          */}
          <Carousel />
          <p className="text-center text-sm text-gray-400 mt-4">
            The crawler clicks{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">data-vv-count=&quot;2&quot;</span>{" "}
            times, capturing a snapshot{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">before</span> each advance.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Why Web2PDF?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-4 bg-indigo-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to automate your PDFs?</h2>
          <p className="text-indigo-200 mb-8 text-lg">
            Explore the Products page to see accordion Hints in action, or jump to the Contact
            page to test form fill &amp; submit capture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full hover:bg-indigo-50 transition-colors"
            >
              View FAQ →
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white/50 text-white font-semibold rounded-full hover:border-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
