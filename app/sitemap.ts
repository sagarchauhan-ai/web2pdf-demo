import type { MetadataRoute } from "next";

/**
 * Next.js App Router sitemap — all URLs Veeva Web2PDF should crawl and capture.
 *
 * Inclusion rationale:
 * - /solutions   : tab switcher + video + select dropdown Hints
 * - /thank-you   : post-submit confirmation after fillSubmit on the Contact form
 * - /_not-found  : Next.js built-in path that serves the custom 404 page;
 *                  included so Web2PDF captures the error state as a PDF page.
 *                  Web2PDF must be configured to capture non-200 responses for
 *                  this entry to produce output.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/thank-you`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/_not-found`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
