import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Medical Aid Fraud & Phishing in South Africa | Protect Members from Scams',
  description:
    'Learn how medical aid fraud and phishing scams target members in South Africa. Verify suspicious SMS, emails, and WhatsApp messages using our free scam checker.',
};

const articleFaqOrganizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'The Link Digital Security',
      url: 'https://checkascam.co.za',
      email: 'admin@checkascam.co.za',
      description: 'South Africa-focused digital fraud prevention and scam verification platform.',
      areaServed: 'ZA',
    },
    {
      '@type': 'Article',
      headline: 'Medical Aid Fraud & Phishing in South Africa',
      description:
        'Learn how medical aid fraud and phishing scams target members in South Africa and how to verify suspicious messages.',
      author: {
        '@type': 'Organization',
        name: 'The Link Digital Security',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Link Digital Security',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://checkascam.co.za/medical-aid-fraud-south-afica',
      },
      datePublished: '2025-02-17',
      dateModified: '2025-02-17',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I check if a medical aid SMS is a scam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use a scam verification tool to analyze suspicious links, numbers, or message content before clicking or responding.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do medical aids ask for OTPs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Legitimate medical schemes do not ask for one-time pins via unsolicited messages.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I do if I shared personal information?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Immediately contact your medical scheme and bank, monitor your accounts, and report the incident.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I verify a WhatsApp message?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Copy the suspicious message content and analyze it using a scam verification engine before responding.',
          },
        },
      ],
    },
  ],
};

export default function MedicalAidFraudSouthAficaPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
        ← Back to Home
      </Link>

      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-glow bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-6">
          Medical Aid Fraud &amp; Phishing in South Africa
        </h1>

        <p className="text-lg text-slate-300 mb-4">
          Medical aid members in South Africa are increasingly targeted by fraudsters impersonating healthcare administrators,
          claims departments, brokers, and benefit verification teams.
        </p>
        <p className="text-lg text-slate-300 mb-4">
          Scammers use SMS, WhatsApp messages, phishing emails, and fake websites to trick members into sharing personal
          information, login credentials, or banking details.
        </p>
        <p className="text-lg text-slate-300 mb-6">
          The Link Digital Security Scam Verification Engine provides a free tool to help members verify suspicious messages before taking action.
        </p>

        <Link href="/scan" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-white hover:opacity-95 transition-opacity">
          👉 Scan a suspicious message now
        </Link>
      </header>

      <section className="glass-panel p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-5">Common Medical Aid Scams in South Africa</h2>
        <p className="text-slate-300 mb-4">Fraud targeting medical scheme members typically includes:</p>

        <div className="space-y-6 text-slate-300">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">1️⃣ Fake Claims Notifications</h3>
            <p className="mb-2">SMS or email claiming:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>“Your claim has been rejected – update details”</li>
              <li>“Outstanding medical payment – click here”</li>
              <li>“Urgent verification required”</li>
            </ul>
            <p>These links often lead to phishing websites.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">2️⃣ Impersonation of Medical Aid Administrators</h3>
            <p className="mb-2">Fraudsters may pretend to represent:</p>
            <ul className="list-disc pl-6 space-y-1 mb-2">
              <li>Claims departments</li>
              <li>Pre-authorisation teams</li>
              <li>Membership services</li>
              <li>Benefit verification units</li>
            </ul>
            <p className="mb-2">They request:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>ID numbers</li>
              <li>Policy numbers</li>
              <li>One-Time Pins (OTPs)</li>
              <li>Banking details</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">3️⃣ WhatsApp Scams Targeting Members</h3>
            <p className="mb-2">Messages claiming:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Discounted benefits</li>
              <li>Special upgrades</li>
              <li>Urgent account suspension</li>
              <li>Fraud alerts requiring immediate response</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">4️⃣ Fake Medical Scheme Websites</h3>
            <p className="mb-2">Scam websites may:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Copy official branding</li>
              <li>Mimic login portals</li>
              <li>Harvest member credentials</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="glass-panel p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Why Medical Aid Fraud Is Increasing</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>Healthcare records contain valuable personal data</li>
          <li>Fraudsters exploit urgency around medical treatment</li>
          <li>Members may respond quickly to benefit-related messages</li>
          <li>Healthcare-related scams create emotional pressure</li>
        </ul>
      </section>

      <section className="glass-panel p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">How to Protect Yourself from Medical Aid Scams</h2>
        <p className="text-slate-300 mb-3">Before clicking any link or sharing personal information:</p>
        <ul className="space-y-2 text-slate-200 mb-6">
          <li>✔ Verify the sender</li>
          <li>✔ Do not share OTPs</li>
          <li>✔ Check website URLs carefully</li>
          <li>✔ Confirm suspicious communication directly with your medical aid</li>
          <li>✔ Use a verification tool before responding</li>
        </ul>
        <p className="text-slate-200 font-medium">
          👉 Use our free Scam Verification Engine to check suspicious messages instantly.
        </p>
      </section>

      <section className="glass-panel p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">For Medical Aid Administrators &amp; Healthcare Schemes</h2>
        <p className="text-slate-300 mb-3">Medical aid administrators, brokers, and healthcare management companies face:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300 mb-4">
          <li>Increased inbound fraud queries</li>
          <li>Member trust erosion</li>
          <li>Brand impersonation attacks</li>
          <li>Phishing campaigns targeting member databases</li>
        </ul>

        <p className="text-slate-300 mb-3">A public-facing scam verification layer can:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300 mb-4">
          <li>Reduce fraud-related support calls</li>
          <li>Empower members to verify before engaging</li>
          <li>Provide anonymized scam pattern insights</li>
          <li>Support broader fraud prevention efforts</li>
        </ul>

        <p className="text-slate-300 mb-3">
          The Link Digital Security operates as a prevention and education layer, not a replacement for official reporting channels.
        </p>

        <p className="text-slate-200 font-medium">
          For collaboration inquiries:{' '}
          <a href="mailto:admin@checkascam.co.za" className="text-indigo-300 hover:text-indigo-200">
            📩 admin@checkascam.co.za
          </a>
        </p>
      </section>

      <section className="glass-panel p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>

        <div className="space-y-5 text-slate-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">How do I check if a medical aid SMS is a scam?</h3>
            <p>Use a scam verification tool to analyze suspicious links, numbers, or content before clicking or responding.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Do medical aids ask for OTPs?</h3>
            <p>Legitimate medical schemes do not ask for OTPs via unsolicited messages.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-1">What should I do if I shared personal information?</h3>
            <p>Immediately contact your medical scheme and bank. Monitor your accounts and report the incident.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Can I verify a WhatsApp message?</h3>
            <p>Yes. Copy the message content and analyze it using a scam verification engine before responding.</p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleFaqOrganizationSchema) }}
      />
    </main>
  );
}
