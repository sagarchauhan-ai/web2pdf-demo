import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web2PDF Demo Site",
  description: "Sample site for testing Veeva Web2PDF page-capture and Hint-sequencing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-800 text-gray-300 text-sm py-6 text-center">
          <p>© 2024 Web2PDF Demo — Veeva Hint Sequencing Sample Site</p>
          <nav className="mt-2 space-x-4">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="/products" className="hover:text-white transition-colors">Products</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
