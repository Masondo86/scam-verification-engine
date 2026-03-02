import Link from 'next/link';

const links = [
  { href: '/banking-fraud-south-africa', label: 'Banking Fraud South Africa' },
  { href: '/investment-scams', label: 'Investment Scams' },
  { href: '/whatsapp-scams', label: 'WhatsApp Scams' },
  { href: '/medical-aid-fraud-south-afica', label: 'Medical Aid Fraud & Phishing' },
  { href: '/scam-psychology', label: 'Scam Psychology' },
];

export default function InternalFraudLinks() {
  return (
    <section className="mt-12 glass-panel p-6 border border-indigo-500/30">
      <h2 className="text-xl font-bold text-white mb-4">Explore More Scam Prevention Resources</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-indigo-300 hover:text-indigo-200 bg-slate-900/40 rounded-lg px-4 py-3 border border-white/10 hover:border-indigo-400/40 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
