"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 600));
    router.push("/thank-you");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        {/*
          Veeva Hint: fill action on the name text input.
          data-vv-action="fill"           → type a value into this field.
          data-vv-fillvalue="Jane Smith" → the text the crawler will type.
          The crawler fills this field before submitting the form.
        */}
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          data-vv-action="fill"
          data-vv-fillvalue="Jane Smith"
          placeholder="Jane Smith"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Work Email <span className="text-red-500">*</span>
        </label>
        {/*
          Veeva Hint: fill action on the email input.
          data-vv-fillvalue carries the value the crawler types.
        */}
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          data-vv-action="fill"
          data-vv-fillvalue="jane.smith@pharma.com"
          placeholder="jane.smith@company.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      {/* Company field */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          data-vv-action="fill"
          data-vv-fillvalue="Acme Pharma"
          placeholder="Acme Pharma"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>

      {/* Message textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          data-vv-action="fill"
          data-vv-fillvalue="I'd like to learn more about integrating Web2PDF with our eDetailing platform."
          placeholder="Tell us about your use case…"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/*
        Veeva Hint: fillSubmit action on the submit button.
        data-vv-action="fillSubmit" → tells the crawler to fill all sibling
        fill-Hinted fields AND then click this button to submit the form.
        The resulting confirmation page (/thank-you) should be listed in
        the sitemap so Web2PDF includes it as a captured page.
      */}
      <button
        type="submit"
        disabled={submitting}
        data-vv-action="fillSubmit"
        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}
