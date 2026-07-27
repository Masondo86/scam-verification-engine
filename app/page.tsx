import Link from 'next/link';
import type { Metadata } from 'next';
import LiveStats from '@/components/LiveStats';
import DigitalTrustProfileCard from '@/components/DigitalTrustProfileCard';

export const metadata: Metadata = {
  title: 'Free Scam Checker South Africa — Verify Scams in Seconds (2026)',
  description:
    'Free public scam checker for websites, phone numbers, emails and messages. Detect phishing, impersonation and banking fraud in South Africa.',
  keywords: [
    'check phone number south africa free',
    'scam checker south africa',
    'phone scam checker',
    'phishing detection',
    'banking fraud south africa',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Free Scam Lookup Tool',
    title: 'Free Scam Checker South Africa — Verify Scams in Seconds (2026)',
    description:
      'Free public scam detection tool for South Africa. Check websites, phone numbers, emails and suspicious messages instantly.',
    url: 'https://checkascam.co.za',
  },
};

const masterFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a scam verification engine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A scam verification engine analyzes websites, phone numbers, email addresses and digital signals to determine whether a transaction, message or platform is fraudulent or high risk.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does scam detection work in South Africa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Scam detection combines device fingerprinting, digital footprint analysis, behavioral signals and known fraud intelligence patterns aligned with South African financial crime regulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can individuals check if a website or WhatsApp number is a scam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Users can scan websites, WhatsApp numbers, SMS links and payment requests to detect impersonation scams, phishing attempts and investment fraud.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is digital footprint analysis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Digital footprint analysis evaluates online presence, domain age, ownership consistency, device patterns and network signals to assess legitimacy and risk exposure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can medical aid administrators prevent fraud?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Medical aid administrators can use risk scoring, provider verification, device anomaly detection and behavioral fraud monitoring to reduce claims fraud and identity abuse.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the platform help banks and financial institutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Banks can integrate the fraud detection API to screen high-risk transactions, identify mule accounts, detect impersonation scams and reduce APP fraud losses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the platform aligned with South African anti-money laundering frameworks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The system supports fraud monitoring and suspicious activity detection aligned with South African AML and financial crime regulatory expectations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can enterprises integrate the scam detection engine via API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enterprises can integrate via secure API to access real-time risk scoring, device risk indicators and digital footprint intelligence.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm mb-8">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by South Africans
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight text-slate-900">
              Verify Scams<br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Free scam verification for URLs, phone numbers, emails, and messages. 
              Powered by real-time security intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/scan"
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:scale-105"
              >
                Start Free Scan
                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="#how-it-works"
                className="px-8 py-4 bg-white border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-all"
              >
                See How It Works
              </Link>
            </div>

            <LiveStats />

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-slate-200">
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">100%</div>
                <div className="text-sm text-slate-500">Free Forever</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">R2.2B</div>
                <div className="text-sm text-slate-500">Lost to Scams (2023)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">24/7</div>
                <div className="text-sm text-slate-500">Real-Time Protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Scam Detection
            </h2>
            <p className="text-xl text-slate-600">
              Multiple security layers working together to keep you safe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature cards – keep your existing content here */} 
            {/* ... (your existing cards) ... */}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        {/* ... your existing how-it-works content ... */}
      </section>

      {/* LEARN ABOUT SCAMS */}
      <section className="py-24 bg-slate-50">
        {/* ... your existing educational cards ... */}
      </section>

      {/* DIGITAL TRUST PROFILE CARD (CLIENT COMPONENT) */}
      <DigitalTrustProfileCard />

      {/* PREMIUM TEASER */}
      <section className="py-24">
        {/* ... your existing premium teaser ... */}
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* ... your existing final CTA ... */}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-12 bg-white">
        {/* ... your existing footer ... */}
      </footer>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(masterFaqSchema) }}
      />
    </main>
  );
}