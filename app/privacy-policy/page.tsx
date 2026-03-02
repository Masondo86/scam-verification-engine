import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Scam Verification Engine by The Link Digital Security.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
      <p className="text-slate-400 mb-10">
        Last updated: 2025-02-06
      </p>

      <div className="space-y-8 text-slate-300">
        <section>
          <p>
            The Link Digital Security operates the Scam Verification Engine, a free public tool to help users identify potential scams,
            fraud, phishing, vishing, and impersonation attempts in South Africa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address (anonymized)</li>
            <li>Device and browser type</li>
            <li>Scan metadata (type of scan, timestamp)</li>
            <li>Email address (optional, opt-in only)</li>
            <li>Scam reports submitted voluntarily</li>
          </ul>
          <p className="mt-3">We do not collect identity numbers, banking credentials, passwords, or OTPs.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-2">2. Purpose of Collection</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide scam risk analysis</li>
            <li>Improve scam detection accuracy</li>
            <li>Maintain community scam statistics</li>
            <li>Send safety alerts and educational updates (opt-in only)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-2">3. Data Sharing & Retention</h2>
          <p>We do not sell personal data. We may share aggregated, anonymized statistics with law enforcement, banking partners, and cybersecurity researchers.</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>Scan metadata: up to 12 months</li>
            <li>Email records: until opt-out</li>
            <li>Community reports: anonymized indefinitely</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-2">4. Your Rights (POPIA)</h2>
          <p>
            You may request access, correction, deletion, or withdrawal of consent.
            Contact us at{' '}
            <a className="text-indigo-300 hover:text-indigo-200" href="mailto:admin@checkascam.co.za">
              admin@checkascam.co.za
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
