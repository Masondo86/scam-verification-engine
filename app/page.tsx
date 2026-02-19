import Link from 'next/link';

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
    <main className="min-h-screen">
      
      {/* HERO SECTION - Modern SaaS Style */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Trusted by South Africans
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Verify Scams</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Free scam verification for URLs, phone numbers, emails, and messages. 
              Powered by real-time security intelligence.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/scan"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-105"
              >
                Start Free Scan
                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="#how-it-works"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all"
              >
                See How It Works
              </Link>
            </div>

            {/* Social proof stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-slate-400">Free Forever</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">R2.2B</div>
                <div className="text-sm text-slate-400">Lost to Scams (2023)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-slate-400">Real-Time Protection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Comprehensive Scam Detection
            </h2>
            <p className="text-xl text-slate-400">
              Multiple security layers working together to keep you safe
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 hover:border-indigo-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Analysis</h3>
              <p className="text-slate-400">
                Real-time verification using Google Safe Browsing, AbuseIPDB, and WHOIS databases
              </p>
            </div>

            <div className="glass-panel p-8 hover:border-purple-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SA Bank Protection</h3>
              <p className="text-slate-400">
                Specialized detection for FNB, Capitec, ABSA, Nedbank, and Standard Bank impersonation
              </p>
            </div>

            <div className="glass-panel p-8 hover:border-pink-500/50 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Privacy First</h3>
              <p className="text-slate-400">
                No data storage, no tracking, no signup required. Your privacy is guaranteed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400">
              Get verified results in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                  1
                </div>
                <h3 className="font-bold text-white mb-2">Enter Details</h3>
                <p className="text-slate-400 text-sm">
                  Paste URL, phone number, email, or suspicious message
                </p>
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
            </div>

            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl font-bold text-white">
                  2
                </div>
                <h3 className="font-bold text-white mb-2">AI Analysis</h3>
                <p className="text-slate-400 text-sm">
                  Multiple security databases checked in real-time
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-pink-500 to-transparent" />
            </div>

            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-2xl font-bold text-white">
                  3
                </div>
                <h3 className="font-bold text-white mb-2">Get Results</h3>
                <p className="text-slate-400 text-sm">
                  Detailed risk score with clear explanation
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-rose-500 to-transparent" />
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center text-2xl font-bold text-white">
                4
              </div>
              <h3 className="font-bold text-white mb-2">Stay Safe</h3>
              <p className="text-slate-400 text-sm">
                Follow recommended actions to protect yourself
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Learn About Scams
            </h2>
            <p className="text-xl text-slate-400">
              Knowledge is your best defense against fraud
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/how-scams-work" className="glass-panel p-8 hover:border-indigo-500/50 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-3">How Scams Work</h3>
              <p className="text-slate-400 mb-4">
                Understand the psychology and tactics fraudsters use to manipulate victims
              </p>
              <div className="text-indigo-400 font-semibold flex items-center gap-2">
                Read More
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/whatsapp-scams" className="glass-panel p-8 hover:border-purple-500/50 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-2xl font-bold text-white mb-3">WhatsApp Scams</h3>
              <p className="text-slate-400 mb-4">
                Top 10 WhatsApp scams targeting South Africans and how to spot them
              </p>
              <div className="text-purple-400 font-semibold flex items-center gap-2">
                Read More
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/banking-fraud-south-africa" className="glass-panel p-8 hover:border-pink-500/50 transition-all group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏦</div>
              <h3 className="text-2xl font-bold text-white mb-3">Banking Fraud</h3>
              <p className="text-slate-400 mb-4">
                Recognize bank impersonation tactics and access official security resources
              </p>
              <div className="text-pink-400 font-semibold flex items-center gap-2">
                Read More
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* PREMIUM TEASER */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="glass-panel p-12 text-center border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Premium Services
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Complete Digital Protection
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Go beyond scam checking with comprehensive identity monitoring
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-slate-900/50 rounded-xl border border-indigo-500/30 text-left">
                <div className="text-sm text-emerald-400 font-bold mb-2">INSTANT</div>
                <div className="text-2xl font-bold text-white mb-2">R29</div>
                <div className="text-indigo-400 font-semibold mb-3">Email Scan</div>
                <p className="text-slate-400 text-sm">Check if your email appears in data breaches</p>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-xl border border-purple-500/30 text-left">
                <div className="text-sm text-purple-400 font-bold mb-2">FULL PROFILE</div>
                <div className="text-2xl font-bold text-white mb-2">R59</div>
                <div className="text-purple-400 font-semibold mb-3">Identity Scan</div>
                <p className="text-slate-400 text-sm">Email + ID + Phone - comprehensive dark web scan</p>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              🏠 Smart Home Network Agent - Coming Soon
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Protect Yourself Today
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of South Africans staying safe from scams
          </p>
          <Link 
            href="/scan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-white text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-105"
          >
            Start Free Scan
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-slate-500 text-sm mt-4">
            No registration • 100% free • Powered by The Link Digital Security
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/scan" className="text-slate-400 hover:text-indigo-400 transition-colors">Free Scam Scanner</Link></li>
                <li><span className="text-slate-600">Email Scan (R29)</span></li>
                <li><span className="text-slate-600">Identity Scan (R59)</span></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Learn</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-scams-work" className="text-slate-400 hover:text-indigo-400 transition-colors">How Scams Work</Link></li>
                <li><Link href="/phone-number-check-south-africa" className="text-slate-400 hover:text-indigo-400 transition-colors">Check Phone Number South Africa</Link></li>
                <li><Link href="/medical-aid-fraud-south-afica" className="text-slate-400 hover:text-indigo-400 transition-colors">Medical Aid Fraud & Phishing</Link></li>
                <li><Link href="/whatsapp-scams" className="text-slate-400 hover:text-indigo-400 transition-colors">WhatsApp Scams</Link></li>
                <li><Link href="/banking-fraud-south-africa" className="text-slate-400 hover:text-indigo-400 transition-colors">Banking Fraud</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-600">About Us</span></li>
                <li><a href="mailto:admin@checkascam.co.za" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact Us (admin@checkascam.co.za)</a></li>
                <li><Link href="/privacy-policy" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-600">Twitter</span></li>
                <li><span className="text-slate-600">LinkedIn</span></li>
                <li><span className="text-slate-600">Facebook</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
            <p>&copy; 2026 The Link Digital Security. Protecting South Africans from digital threats.</p>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(masterFaqSchema) }}
      />
    </main>
  );
}
