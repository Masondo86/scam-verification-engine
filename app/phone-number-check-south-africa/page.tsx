import type { Metadata } from 'next';
import Link from 'next/link';
import InternalFraudLinks from '@/components/InternalFraudLinks';

export const metadata: Metadata = {
  title: 'Check Phone Number South Africa Free | Scam Number Checker',
  description:
    'Check a phone number in South Africa for free. Detect scam calls, phishing SMS, WhatsApp fraud, and impersonation attempts instantly.',
  openGraph: {
    title: 'Check Phone Number South Africa Free',
    description:
      'Verify suspicious South African phone numbers for scam risk and impersonation patterns.',
    url: 'https://checkascam.co.za/phone-number-check-south-africa',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PhoneNumberCheckSouthAfricaPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-14">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-glow bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Check a Phone Number in South Africa – Free Scam Verification
        </h1>
        <p className="text-lg text-slate-300 mt-6">
          Received a suspicious call or SMS? Enter the phone number below to check if it may be linked to scams, phishing, or impersonation attempts in South Africa.
        </p>
      </header>

      <section className="glass-panel p-8 border border-indigo-500/30">
        <ul className="space-y-3 text-slate-200 mb-6">
          <li><strong className="text-white">Example:</strong> +27 72 123 4567</li>
          <li><strong className="text-emerald-400">Free</strong> phone number scam checks</li>
          <li><strong className="text-cyan-400">Instant results</strong> from our analyzer</li>
        </ul>

        <Link href="/scan">
          <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-[1.01]">
            Check Phone Number Now
          </button>
        </Link>
      </section>

      <InternalFraudLinks />
    </main>
  );
}
