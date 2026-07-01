"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const productDropdown = [
  { label: "Web2PDF", href: "/products#web2pdf" },
  { label: "eDetailing", href: "/products#edetailing" },
  { label: "CRM Integration", href: "/products#crm" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight">
          VeevaDemo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-200 transition-colors">
            Home
          </Link>

          {/*
            Veeva Hint: hover action on the "Products" nav trigger.
            data-vv-action="hover" tells Web2PDF to simulate a hover event.
            data-vv-snapshot="after" captures the page state after the hover
            (i.e., while the dropdown is visible).
          */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              data-vv-action="hover"
              data-vv-snapshot="after"
              className="hover:text-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Products
              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="dropdown-menu absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-1 border border-gray-100">
                {productDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/solutions" className="hover:text-indigo-200 transition-colors">
            Solutions
          </Link>

          <Link href="/contact" className="hover:text-indigo-200 transition-colors">
            Contact
          </Link>

          <Link
            href="/contact"
            className="ml-2 px-4 py-2 bg-white text-indigo-700 rounded-full font-semibold text-sm hover:bg-indigo-50 transition-colors"
          >
            Get a Demo
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-indigo-800 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 border-b border-indigo-600 hover:text-indigo-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
