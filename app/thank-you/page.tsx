import Link from "next/link";

export const metadata = {
  title: "Thank You — Web2PDF Demo",
  description: "Form submission confirmed. This page is listed in the sitemap so Veeva Web2PDF captures the post-submit state.",
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-md mx-auto text-center">
        {/* Checkmark icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-green-600"
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
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Message Received!</h1>
        <p className="text-gray-500 text-lg mb-2">
          Thanks for reaching out. A member of our team will contact you within one business day.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          This confirmation page is included in the sitemap so Veeva Web2PDF captures the
          post-submit state as part of the crawl.
        </p>

        {/* Info box about this page's role in the crawl */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-left mb-8 text-sm">
          <p className="font-semibold text-indigo-800 mb-1">📋 Why this page is in the sitemap</p>
          <p className="text-indigo-700">
            When Web2PDF processes the Contact page, the{" "}
            <code className="bg-indigo-100 px-1 rounded text-xs">fillSubmit</code> Hint fills and
            submits the form, redirecting here. Because <strong>/thank-you</strong> is listed in{" "}
            <code className="bg-indigo-100 px-1 rounded text-xs">sitemap.ts</code>, it is included
            as a standalone captured page in the final PDF output.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors text-sm"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}
