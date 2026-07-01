import Link from "next/link";
import TabSwitcher from "../components/TabSwitcher";
import VideoPlayer from "../components/VideoPlayer";

export const metadata = {
  title: "Solutions — Web2PDF Demo",
  description: "Explore Web2PDF solutions by platform. Demonstrates tab (click+seq), video (click+snapshot), and select dropdown (fill) Hint interactions.",
};

const industries = [
  "Pharmaceutical",
  "Medical Devices",
  "Biotech",
  "Diagnostics",
  "Animal Health",
  "Consumer Health",
];

export default function SolutionsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-emerald-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
            Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            The Right Fit for Every Platform
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From single-page apps to enterprise-grade regulated content pipelines — Web2PDF
            adapts to your stack.
          </p>
        </div>
      </section>

      {/* Tab switcher section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-3">
            Hint-Sequenced Tabs
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Choose Your Platform
          </h2>
          <p className="text-center text-sm text-gray-400 mb-8">
            Each tab button carries{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">data-vv-action=&quot;click&quot;</span>{" "}
            and{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">data-vv-seq=&quot;1&quot;…&quot;3&quot;</span>{" "}
            — the same sequencing pattern used by the accordion.
          </p>
          {/*
            Tab buttons carry: data-vv-action="click" data-vv-seq="1|2|3"
          */}
          <TabSwitcher />
        </div>
      </section>

      {/* Video section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-3">
            Hint-Sequenced Video
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            See It in Action
          </h2>
          <p className="text-center text-sm text-gray-400 mb-10">
            The play button carries{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">data-vv-action=&quot;click&quot;</span>{" "}
            +{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">data-vv-snapshot=&quot;after&quot;</span>
            {" "}— the PDF captures the mid-play frame rather than the poster.
          </p>
          {/*
            Play button carries: data-vv-action="click" data-vv-snapshot="after"
          */}
          <VideoPlayer />
        </div>
      </section>

      {/* Select dropdown / quote form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-3">
            Hint-Sequenced Select
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Request a Custom Quote
          </h2>
          <p className="text-center text-sm text-gray-400 mb-10">
            The{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">&lt;select&gt;</span>{" "}
            element carries{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">data-vv-action=&quot;fill&quot;</span>{" "}
            +{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">data-vv-fillvalue=&quot;Pharmaceutical&quot;</span>
            {" "}— the crawler selects the option before snapshotting the form.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Text input with fill hint */}
              <div>
                <label htmlFor="qs-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="qs-name"
                  type="text"
                  data-vv-action="fill"
                  data-vv-fillvalue="Dr. Alex Johnson"
                  placeholder="Dr. Alex Johnson"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white"
                />
              </div>

              {/* Email input with fill hint */}
              <div>
                <label htmlFor="qs-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email
                </label>
                <input
                  id="qs-email"
                  type="email"
                  data-vv-action="fill"
                  data-vv-fillvalue="alex.johnson@biopharma.com"
                  placeholder="alex.johnson@company.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white"
                />
              </div>
            </div>

            {/* Select dropdown with fill hint */}
            <div>
              <label htmlFor="qs-industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              {/*
                Veeva Hint: fill action on a <select> element.
                data-vv-action="fill"                → select an option by value.
                data-vv-fillvalue="Pharmaceutical"   → the option the crawler selects.
                Works the same as a text fill — the crawler sets the value
                and dispatches a change event so React state updates.
              */}
              <select
                id="qs-industry"
                data-vv-action="fill"
                data-vv-fillvalue="Pharmaceutical"
                defaultValue=""
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white appearance-none"
              >
                <option value="" disabled>Select your industry…</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Pages-per-month range */}
            <div>
              <label htmlFor="qs-volume" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated monthly PDF volume
              </label>
              <select
                id="qs-volume"
                data-vv-action="fill"
                data-vv-fillvalue="10,000 – 100,000"
                defaultValue=""
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white"
              >
                <option value="" disabled>Select a range…</option>
                <option>Under 1,000</option>
                <option>1,000 – 10,000</option>
                <option>10,000 – 100,000</option>
                <option>100,000+</option>
              </select>
            </div>

            {/*
              fillSubmit on this form's submit button — fills all sibling
              fill-Hinted inputs/selects then submits.
            */}
            <button
              type="button"
              data-vv-action="fillSubmit"
              className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Get My Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 bg-emerald-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-emerald-100 mb-8">
            Talk to our team or explore the FAQ to learn more about integration options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-full hover:bg-emerald-50 transition-colors"
            >
              Contact Sales
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 border-2 border-white/50 text-white font-semibold rounded-full hover:border-white transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
