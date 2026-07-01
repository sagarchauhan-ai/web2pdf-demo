import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | Web2PDF Demo",
};

const links = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/solutions", label: "Solutions", icon: "💡" },
  { href: "/products", label: "Products & FAQ", icon: "📦" },
  { href: "/contact", label: "Contact", icon: "✉️" },
];

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-lg mx-auto text-center">
        {/* 404 number */}
        <div className="text-[8rem] font-extrabold leading-none text-red-100 select-none mb-2">
          404
        </div>

        {/* Icon */}
        <div className="text-5xl mb-6">🔍</div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-lg mb-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <p className="text-sm text-gray-400 mb-10">
          This 404 page is included in the sitemap (via{" "}
          <code className="bg-gray-100 px-1 rounded text-xs">/_not-found</code>) so Veeva
          Web2PDF captures the error state as part of the crawl.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-200 transition-all text-sm font-medium text-gray-700"
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
