import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact Us — Web2PDF Demo",
  description: "Get in touch to request a demo of Veeva Web2PDF. Form fields carry data-vv-action fill Hints for automated capture.",
};

const contactDetails = [
  {
    icon: "📧",
    label: "Email",
    value: "demo@web2pdf.example.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+1 (800) 555-0100",
  },
  {
    icon: "🌍",
    label: "Headquarters",
    value: "Pleasanton, CA, USA",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Reach out to schedule a live demo or discuss your integration requirements.
          </p>
        </div>
      </section>

      {/* Contact layout */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                {contactDetails.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <span className="text-2xl">{d.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase">{d.label}</p>
                      <p className="text-gray-700">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint callout box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 text-sm">
              <p className="font-semibold text-indigo-800 mb-2">🔍 Veeva Hint attributes on this form</p>
              <ul className="space-y-1.5 text-indigo-700">
                <li>
                  <code className="bg-indigo-100 px-1 rounded text-xs">data-vv-action=&quot;fill&quot;</code>{" "}
                  on each input
                </li>
                <li>
                  <code className="bg-indigo-100 px-1 rounded text-xs">data-vv-fillvalue=&quot;…&quot;</code>{" "}
                  carries the text to type
                </li>
                <li>
                  <code className="bg-indigo-100 px-1 rounded text-xs">data-vv-action=&quot;fillSubmit&quot;</code>{" "}
                  on the submit button
                </li>
              </ul>
              <p className="mt-3 text-indigo-600 text-xs">
                After submission the crawler follows the redirect to <strong>/thank-you</strong>,
                which is listed in the sitemap so it gets included in the PDF output.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
            {/*
              ContactForm's inputs carry data-vv-action="fill" + data-vv-fillvalue.
              The submit button carries data-vv-action="fillSubmit".
            */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
