import Link from 'next/link';

const actions = [
  { href: '/scan/message', label: 'Scan Email or SMS' },
  { href: '/scan/url', label: 'Check Website URL' },
  { href: '/scan/phone', label: 'Check Phone Number' },
  { href: '/scan/claim', label: 'Upload Claim Document' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 py-14">
      <section className="max-w-4xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Medical Fraud &amp; Scam Verification Tool
          </h1>
          <p className="text-slate-300 text-base sm:text-lg mb-10">
            Check suspicious messages, websites, phone numbers or claim documents.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="glass-panel px-5 py-5 text-white font-semibold hover:border-indigo-400/50 transition-colors"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
