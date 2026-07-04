import Link from 'next/link';
import type { Metadata } from 'next';
import InternalFraudLinks from '@/components/InternalFraudLinks';
import ScannerCTA from '@/app/components/ScannerCTA';

export const metadata: Metadata = {
  title: 'How Scams Work in South Africa | YourBrand',
  description:
    'Learn how scams work, the psychology behind fraud, and how South Africans can reduce scam risk.',
  openGraph: {
    title: 'How Scams Work in South Africa | YourBrand',
    description:
      'Learn how scams work, the psychology behind fraud, and how South Africans can reduce scam risk.',
    url: 'https://checkascam.co.za/how-scams-work',
    type: 'website',
  },
};

export default function HowScamsWorkPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
      
        {/* Back Link */}
        <Link href="/" className="text-indigo-600 hover:text-indigo-700 mb-8 inline-block font-medium">
          ← Back to Home
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            How Scams Work
          </h1>
          <p className="text-xl text-slate-600">
            Understanding the psychology and tactics behind fraud
          </p>
        </header>

        {/* Introduction */}
        <section className="bg-white rounded-2xl p-8 mb-8 border border-slate-100 shadow-md">
          <p className="text-slate-700 text-lg leading-relaxed">
            Scams aren't just about technology - they're about <strong className="text-slate-900">manipulating human psychology</strong>. 
            Even the smartest, most cautious people can fall victim because scammers exploit our deepest emotions and cognitive biases.
          </p>
        </section>

        {/* Top of Funnel CTA */}
        <ScannerCTA />

        {/* The Six Principles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The 6 Principles of Persuasion</h2>
          <p className="text-slate-600 mb-6">
            Psychologist Dr. Robert Cialdini identified six principles that influence human behavior. 
            Scammers weaponize these principles against you:
          </p>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-xl font-bold text-indigo-700 mb-3">1. 🚨 Urgency & Scarcity</h3>
              <p className="text-slate-700 mb-3">
                <strong className="text-slate-900">"Act now or lose your account!"</strong>
              </p>
              <p className="text-slate-600 text-sm mb-3">
                Creating time pressure prevents you from thinking clearly. Scammers use phrases like 
                "within 24 hours," "limited time," or "immediate action required" to trigger panic.
              </p>
              <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                <strong className="text-red-700">Example:</strong>
                <p className="text-slate-700 mt-1">
                  "Your FNB account has been suspended. Click here within 2 hours to verify or lose access permanently."
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-xl font-bold text-purple-700 mb-3">2. 🎭 Authority</h3>
              <p className="text-slate-700 mb-3">
                <strong className="text-slate-900">"This is SARS/Your Bank/The Police"</strong>
              </p>
              <p className="text-slate-600 text-sm mb-3">
                We're conditioned to obey authority figures. Scammers impersonate banks, government agencies, 
                or tech support to make you comply without question.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded p-3 text-sm">
                <strong className="text-purple-700">Red Flags:</strong>
                <ul className="text-slate-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Official logos used in unofficial emails</li>
                  <li>Sender email doesn't match official domain</li>
                  <li>Demands for immediate compliance</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-xl font-bold text-pink-700 mb-3">3. 💰 Greed & Reward</h3>
              <p className="text-slate-700 mb-3">
                <strong className="text-slate-900">"You've won! Claim your prize!"</strong>
              </p>
              <p className="text-slate-600 text-sm mb-3">
                The promise of easy money or unexpected prizes clouds judgment. "Too good to be true" 
                offers exploit hope and financial stress.
              </p>
              <div className="bg-pink-50 border border-pink-200 rounded p-3 text-sm">
                <strong className="text-pink-700">Common Lures:</strong>
                <ul className="text-slate-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Lottery/prize winnings (that you didn't enter)</li>
                  <li>Inheritance from unknown relatives</li>
                  <li>Investment opportunities with "guaranteed returns"</li>
                  <li>Government refunds or grants</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-xl font-bold text-emerald-700 mb-3">4. 😨 Fear</h3>
              <p className="text-slate-700 mb-3">
                <strong className="text-slate-900">"Your account has been compromised!"</strong>
              </p>
              <p className="text-slate-600 text-sm mb-3">
                Fear shuts down rational thinking. Threats of account closure, legal action, 
                or financial loss trigger panic responses.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-sm">
                <strong className="text-emerald-700">Fear Tactics:</strong>
                <ul className="text-slate-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Account suspension/closure threats</li>
                  <li>Legal action warnings</li>
                  <li>Security breach notifications</li>
                  <li>Tax/debt collection threats</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-xl font-bold text-yellow-700 mb-3">5. 🤝 Social Proof</h3>
              <p className="text-slate-700 mb-3">
                <strong className="text-slate-900">"10,000 people have already claimed this!"</strong>
              </p>
              <p className="text-slate-600 text-sm mb-3">
                We trust what others do. Fake reviews, testimonials, and social media endorsements 
                create false legitimacy.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                <strong className="text-yellow-700">Watch For:</strong>
                <ul className="text-slate-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Fake celebrity endorsements</li>
                  <li>Fabricated customer reviews</li>
                  <li>Counterfeit social media verification badges</li>
                  <li>"As seen on TV" false claims</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-xl font-bold text-cyan-700 mb-3">6. ❤️ Trust & Reciprocity</h3>
              <p className="text-slate-700 mb-3">
                <strong className="text-slate-900">"I'm trying to help you..."</strong>
              </p>
              <p className="text-slate-600 text-sm mb-3">
                After doing you a "favor" or building rapport, scammers exploit the human tendency 
                to reciprocate. Romance scams and long-term cons use this extensively.
              </p>
              <div className="bg-cyan-50 border border-cyan-200 rounded p-3 text-sm">
                <strong className="text-cyan-700">Long Con Tactics:</strong>
                <ul className="text-slate-700 mt-2 space-y-1 list-disc list-inside">
                  <li>Romance scams (weeks/months of grooming)</li>
                  <li>Fake tech support "solving" problems</li>
                  <li>Investment advisors building trust over time</li>
                  <li>Fake job recruiters offering "help"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Scam Lifecycle */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Scam Lifecycle</h2>
          
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Target Selection</h3>
                  <p className="text-slate-600 text-sm">
                    Scammers use data breaches, social media, and public records to identify vulnerable targets. 
                    They look for emotional triggers: financial stress, loneliness, recent life changes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Initial Contact</h3>
                  <p className="text-slate-600 text-sm">
                    First touch via email, SMS, WhatsApp, or phone call. The message is designed to trigger 
                    an emotional response: fear, greed, curiosity, or urgency.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Building Trust</h3>
                  <p className="text-slate-600 text-sm">
                    Quick scams skip this. Long cons invest weeks/months building rapport. They may provide 
                    legitimate-looking documents, fake websites, or elaborate backstories.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">The Ask</h3>
                  <p className="text-slate-600 text-sm">
                    Request for money, personal information, account credentials, or OTP codes. 
                    Often framed as "verification," "security check," or "processing fee."
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Escalation</h3>
                  <p className="text-slate-600 text-sm">
                    If you comply, they ask for more. Small requests escalate to larger ones. 
                    "Just one more verification," "processing fee," "tax payment," etc.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold">
                  6
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Disappearance</h3>
                  <p className="text-slate-600 text-sm">
                    Once they've extracted maximum value or you become suspicious, they vanish. 
                    Phone numbers disconnected, accounts deleted, websites taken down.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Smart People Fall For It */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Smart People Fall For Scams</h2>
          
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md">
            <div className="space-y-4 text-slate-700">
              <div className="flex gap-3">
                <span className="text-indigo-600 font-bold">→</span>
                <p>
                  <strong className="text-slate-900">Cognitive Load:</strong> When stressed or busy, 
                  we rely on mental shortcuts that scammers exploit.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-600 font-bold">→</span>
                <p>
                  <strong className="text-slate-900">Overconfidence:</strong> "I'm too smart to fall for this" 
                  makes you less vigilant.
                </p>
              </div>
              
              <ScannerCTA />

              <div className="flex gap-3">
                <span className="text-pink-600 font-bold">→</span>
                <p>
                  <strong className="text-slate-900">Emotional Hijacking:</strong> Fear, greed, and urgency 
                  bypass logical thinking.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-emerald-600 font-bold">→</span>
                <p>
                  <strong className="text-slate-900">Authority Bias:</strong> We're conditioned to obey 
                  official-looking communications.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-600 font-bold">→</span>
                <p>
                  <strong className="text-slate-900">Context Collapse:</strong> Receiving a "bank" email 
                  while expecting one creates false legitimacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Protection Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Protect Yourself</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-lg font-bold text-emerald-700 mb-3">✅ Do This</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-green-600">✓</span> Verify independently using known contact info</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Take time to think - ignore urgency</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Check URLs carefully for typos</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Use our free scam scanner</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Enable 2FA on all accounts</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Question "too good to be true" offers</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md">
              <h3 className="text-lg font-bold text-red-700 mb-3">❌ Never Do This</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="text-red-600">✗</span> Share OTP codes with anyone</li>
                <li className="flex gap-2"><span className="text-red-600">✗</span> Click links in unexpected messages</li>
                <li className="flex gap-2"><span className="text-red-600">✗</span> Give remote access to your device</li>
                <li className="flex gap-2"><span className="text-red-600">✗</span> Send money to "verify" accounts</li>
                <li className="flex gap-2"><span className="text-red-600">✗</span> Trust caller ID (it can be spoofed)</li>
                <li className="flex gap-2"><span className="text-red-600">✗</span> Rush decisions under pressure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom CTA Overlay */}
        <section className="mt-12">
          <ScannerCTA />
        </section>

        {/* More Resources */}
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          <Link href="/whatsapp-scams" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-purple-700 mb-2">WhatsApp Scams in SA →</h3>
            <p className="text-slate-600 text-sm">Learn about common WhatsApp fraud targeting South Africans</p>
          </Link>
          <Link href="/banking-fraud-south-africa" className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-pink-700 mb-2">SA Banking Fraud →</h3>
            <p className="text-slate-600 text-sm">Understand bank impersonation tactics and official resources</p>
          </Link>
        </section>

        <InternalFraudLinks />
      </div>
    </main>
  );
}
