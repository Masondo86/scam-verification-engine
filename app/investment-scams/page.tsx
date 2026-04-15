// app/investment-scams/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment Scams in South Africa | How to Spot Fake Schemes',
  description: 'Latest investment scams in South Africa: Ponzi schemes, crypto fraud, fake trading platforms. Learn warning signs and check opportunities with our free scam detector.',
  keywords: 'investment scams south africa, ponzi schemes SA, crypto fraud, FSCA warnings, fake investment platforms',
  openGraph: {
    title: 'Investment Scams in South Africa | FSCA Warnings & Detection',
    description: 'Over R3 billion lost in 2024. Learn to spot fake investment opportunities before you lose money.',
    url: 'https://checkascam.co.za/investment-scams',
    type: 'website',
  },
};

export default function InvestmentScamsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-indigo-400 text-sm mb-6 inline-block">← Back to Home</Link>
      
      <h1 className="text-4xl font-bold mb-4">Investment Scams in South Africa</h1>
      <p className="text-xl text-slate-300 mb-8">
        How to spot Ponzi schemes, crypto fraud, and “too good to be true” opportunities.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-red-400">R3.2B</div>
          <div className="text-slate-300 text-sm">Lost to investment scams (2024)</div>
          <div className="text-xs text-slate-500 mt-2">Source: FSCA</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400">+58%</div>
          <div className="text-slate-300 text-sm">Increase in reported cases (2023→2024)</div>
          <div className="text-xs text-slate-500 mt-2">Source: SABRIC</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-purple-400">200+</div>
          <div className="text-slate-300 text-sm">Unlicensed entities warned by FSCA</div>
          <div className="text-xs text-slate-500 mt-2">Current active warnings</div>
        </div>
      </div>

      {/* Why Scammers Target SA Investors */}
      <h2 className="text-2xl font-bold mb-4">Why Investment Scams Thrive in SA</h2>
      <div className="space-y-3 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>High financial pressure</strong> – People seek quick returns to cope with rising living costs.</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>WhatsApp & Telegram “communities”</strong> – Scammers build trust in closed groups with fake testimonials.</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>Low financial literacy</strong> – Many don’t know how to verify FSCA licences or read fine print.</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>Celebrity / influencer endorsement fraud</strong> – Deepfake videos and paid ads misuse famous names.</div>
        </div>
      </div>

      {/* Common Investment Scams */}
      <h2 className="text-2xl font-bold mb-4">Common Investment Scams in SA</h2>
      <div className="space-y-6 mb-8">
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">💰 Ponzi & Pyramid Schemes</h3>
          <p className="text-slate-300">Paying old investors with new money – no real profits. Collapses when new money dries up. Examples: <strong>MTI (Mirror Trading International)</strong>, <strong>BTC Global</strong>.</p>
          <p className="text-sm text-slate-400 mt-2">🚩 Red flag: "Guaranteed returns" and recruitment bonuses.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">₿ Crypto & Forex Fraud</h3>
          <p className="text-slate-300">Fake trading platforms show “profits” but you can never withdraw. Often promoted via WhatsApp groups and Instagram influencers.</p>
          <p className="text-sm text-slate-400 mt-2">🚩 Red flag: Pressure to deposit more to "unlock earnings".</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">🚜 Fake Farming / “Agri” Investments</h3>
          <p className="text-slate-300">Promises of high returns from macadamia nuts, livestock, or hydroponics. No actual farming operation exists.</p>
          <p className="text-sm text-slate-400 mt-2">🚩 Red flag: No physical farm visits allowed, unrealistic yields.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">📊 WhatsApp “Signal” Groups</h3>
          <p className="text-slate-300">Admins claim to have inside trading tips. After building trust, they launch a “private pool” and disappear with funds.</p>
          <p className="text-sm text-slate-400 mt-2">🚩 Red flag: Unverified performance screenshots, admin asks for direct payments.</p>
        </div>
      </div>

      {/* Warning Signs */}
      <h2 className="text-2xl font-bold mb-4">⚠️ 7 Warning Signs of an Investment Scam</h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8">
        <li><strong>“Guaranteed” high returns</strong> – No legitimate investment guarantees profit.</li>
        <li><strong>Unregistered with FSCA</strong> – Always check the <Link href="https://www.fsca.co.za" className="text-indigo-400 underline">FSCA online database</Link>.</li>
        <li><strong>Pressure to act “now”</strong> – Limited time offers are a classic fraud tactic.</li>
        <li><strong>Complex jargon</strong> – They use fancy terms to confuse you.</li>
        <li><strong>Fake regulatory seals</strong> – Logos that look official but are stolen.</li>
        <li><strong>No written contract or prospectus</strong> – Legitimate firms provide clear documentation.</li>
        <li><strong>Unsolicited offers via WhatsApp/Telegram</strong> – Be extra suspicious of cold messages.</li>
      </ul>

      {/* What the FSCA Does */}
      <h2 className="text-2xl font-bold mb-4">✅ Verify Before You Invest</h2>
      <div className="glass-panel p-5 mb-8">
        <p className="mb-3">The <strong>Financial Sector Conduct Authority (FSCA)</strong> maintains a public list of licensed financial services providers. Always check:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-300">
          <li>Is the company registered? <Link href="https://www.fsca.co.za/Fais/Search_FSP.htm" className="text-indigo-400 underline">Search the FSP database →</Link></li>
          <li>Does the product have a approved prospectus?</li>
          <li>Are there any public warnings about this entity?</li>
        </ul>
        <p className="text-sm text-slate-400 mt-3">If it’s not on the FSCA register, do NOT invest a cent.</p>
      </div>

      {/* What to Do If Scammed */}
      <h2 className="text-2xl font-bold mb-4">🚨 If You’ve Lost Money</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">1. Stop all payments</h3>
          <p className="text-slate-300">Do not send more money to “recover” your funds – that’s a secondary scam.</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">2. Report to FSCA</h3>
          <p className="text-slate-300">Email <strong>complaints@fsca.co.za</strong> or call 0800 20 22 87.</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">3. Open a case at SAPS</h3>
          <p className="text-slate-300">Bring all evidence (messages, bank statements, screenshots).</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">4. Contact your bank</h3>
          <p className="text-slate-300">They may be able to reverse some payments if reported quickly.</p>
        </div>
      </div>

      {/* CTA to Scanner */}
      <div className="mt-8 text-center">
        <Link href="/scan" className="btn-3d bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl inline-block">
          🔍 Check an Investment Opportunity
        </Link>
        <p className="text-slate-400 text-sm mt-2">Paste a website, WhatsApp message, or phone number – free & instant.</p>
      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-6 border-t border-white/10 text-center text-slate-400 text-sm">
        <Link href="/banking-fraud-south-africa" className="mx-2 hover:text-white">Banking Fraud</Link> •
        <Link href="/investment-scams" className="mx-2 hover:text-white">Investment Scams</Link> •
        <Link href="/whatsapp-scams" className="mx-2 hover:text-white">WhatsApp Scams</Link> •
        <Link href="/medical-aid-fraud-south-africa" className="mx-2 hover:text-white">Medical Aid Fraud</Link> •
        <Link href="/scam-psychology" className="mx-2 hover:text-white">Scam Psychology</Link>
      </div>
    </main>
  );
}
