// app/medical-aid-fraud-south-africa/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Aid Fraud in South Africa | Protect Your Scheme Benefits',
  description: 'Discover common medical aid scams in SA: phishing SMS, fake scheme reps, and OTP theft. Learn how to verify messages and protect your healthcare funds.',
  keywords: 'medical aid fraud south africa, discovery phishing, medical scheme scams, health insurance fraud, fake medical aid messages',
  openGraph: {
    title: 'Medical Aid Fraud in South Africa | Stop Phishing & Impersonation',
    description: 'Fraudsters are targeting medical aid members. Learn warning signs and how to verify suspicious communications.',
    url: 'https://checkascam.co.za/medical-aid-fraud-south-africa',
    type: 'website',
  },
};

export default function MedicalAidFraudPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-indigo-400 text-sm mb-6 inline-block">← Back to Home</Link>
      
      <h1 className="text-4xl font-bold mb-4">Medical Aid Fraud in South Africa</h1>
      <p className="text-xl text-slate-300 mb-8">
        How scammers impersonate Discovery, Momentum, Bestmed, and other schemes – and how to protect your healthcare benefits.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-red-400">R1.2B+</div>
          <div className="text-slate-300 text-sm">Estimated annual medical aid fraud losses</div>
          <div className="text-xs text-slate-500 mt-2">Source: CMS / industry reports</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400">73%</div>
          <div className="text-slate-300 text-sm">Increase in phishing attacks targeting members (2023–2024)</div>
          <div className="text-xs text-slate-500 mt-2">Source: Council for Medical Schemes</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-purple-400">~30%</div>
          <div className="text-slate-300 text-sm">Members who clicked a fake “verify details” link</div>
          <div className="text-xs text-slate-500 mt-2">Source: Industry survey</div>
        </div>
      </div>

      {/* Why Scammers Target Medical Aid Members */}
      <h2 className="text-2xl font-bold mb-4">Why Medical Aid Fraud Is Growing</h2>
      <div className="space-y-3 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>Valuable personal data</strong> – ID numbers, member numbers, and banking details are sold on dark web markets.</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>Urgent “benefit expiring” scams</strong> – Fake messages claim your benefits will be lost unless you act now.</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>Impersonation of scheme administrators</strong> – Callers pretend to be from Discovery or Momentum to extract OTPs.</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-indigo-400 font-bold text-xl">→</span>
          <div><strong>Fake “claims approval” links</strong> – Phishing emails ask you to “verify” a claim, leading to a fake login page.</div>
        </div>
      </div>

      {/* Common Medical Aid Scams */}
      <h2 className="text-2xl font-bold mb-4">Common Medical Aid Scams in SA</h2>
      <div className="space-y-6 mb-8">
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">📱 SMS Phishing (Smishing)</h3>
          <p className="text-slate-300">“Discovery: Your medical aid card has been suspended. Click here to reactivate: <strong>discovery-verify.xyz</strong>”</p>
          <p className="text-sm text-slate-400 mt-2">🚩 The link leads to a fake Discovery login page that steals your credentials.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">📧 Email Phishing – “Claim Rejected”</h3>
          <p className="text-slate-300">Email from “support@momentum.co.za” (spoofed) asking you to download a “rejection notice” (malware) or submit personal details.</p>
          <p className="text-sm text-slate-400 mt-2">🚩 Real schemes never send unsolicited attachments or request login via email links.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">📞 Vishing – Fake “Scheme Administrator”</h3>
          <p className="text-slate-300">Caller says: “I’m from Bestmed. Your account has been flagged for fraudulent claims. To secure it, please confirm your member number and OTP.”</p>
          <p className="text-sm text-slate-400 mt-2">🚩 They use your real name (from data breaches) and spoof the scheme’s official number.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">🏥 Fake “Medical Gap Cover” Offers</h3>
          <p className="text-slate-300">WhatsApp messages promoting cheap gap cover that doesn’t exist. They collect your ID and banking details for “direct debit”.</p>
          <p className="text-sm text-slate-400 mt-2">🚩 Always verify gap cover products directly on the official website of a registered insurer.</p>
        </div>
      </div>

      {/* Warning Signs */}
      <h2 className="text-2xl font-bold mb-4">⚠️ How to Spot a Medical Aid Scam</h2>
      <ul className="list-disc pl-6 space-y-2 text-slate-300 mb-8">
        <li><strong>Unsolicited link</strong> – Any SMS/email with a link “to verify your account” is almost always fake.</li>
        <li><strong>Requests for OTP or member password</strong> – No legitimate scheme will ever ask for your one-time PIN or online password.</li>
        <li><strong>“Benefits expiring today” pressure</strong> – Scammers create false urgency to make you act without thinking.</li>
        <li><strong>Generic greeting</strong> – “Dear valued member” instead of your name.</li>
        <li><strong>Poor grammar or odd sender address</strong> – e.g., “discovery.co.za.verify-login.net”.</li>
        <li><strong>Unexpected requests to “update payment details”</strong> – Real schemes notify you via secure in-app messages only.</li>
      </ul>

      {/* What Official Schemes NEVER Do */}
      <h2 className="text-2xl font-bold mb-4">❌ What Medical Schemes NEVER Do</h2>
      <div className="glass-panel p-5 mb-8">
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li>Ask for your member login password or OTP over phone, SMS, or email.</li>
          <li>Send you a link to “verify” your identity – you should always log in via the official app or website manually.</li>
          <li>Call you and demand immediate payment to keep your benefits active.</li>
          <li>Ask you to download an attachment to “view a claim”.</li>
          <li>Request remote access to your device to “fix” your account.</li>
        </ul>
      </div>

      {/* Official Resources – Council for Medical Schemes & Major Schemes */}
      <h2 className="text-2xl font-bold mb-4">✅ Verify with Official Sources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="glass-panel p-4">
          <h3 className="font-bold text-indigo-300 mb-2">Council for Medical Schemes</h3>
          <p className="text-sm text-slate-300">Report fraud or check registered schemes.</p>
          <Link href="https://www.medicalschemes.co.za" className="text-indigo-400 text-sm underline">medicalschemes.co.za →</Link>
        </div>
        <div className="glass-panel p-4">
          <h3 className="font-bold text-indigo-300 mb-2">Discovery Health</h3>
          <p className="text-sm text-slate-300">Fraud hotline: 0860 999 911</p>
          <Link href="https://www.discovery.co.za/security" className="text-indigo-400 text-sm underline">discovery.co.za/security →</Link>
        </div>
        <div className="glass-panel p-4">
          <h3 className="font-bold text-indigo-300 mb-2">Momentum Health</h3>
          <p className="text-sm text-slate-300">Fraud line: 0860 777 111</p>
          <Link href="https://www.momentum.co.za/security" className="text-indigo-400 text-sm underline">momentum.co.za/security →</Link>
        </div>
        <div className="glass-panel p-4">
          <h3 className="font-bold text-indigo-300 mb-2">Bestmed</h3>
          <p className="text-sm text-slate-300">Report suspicious calls: 0860 000 257</p>
          <Link href="https://www.bestmed.co.za/fraud" className="text-indigo-400 text-sm underline">bestmed.co.za/fraud →</Link>
        </div>
      </div>

      {/* What to Do If You Receive a Suspicious Message */}
      <h2 className="text-2xl font-bold mb-4">🚨 If You Get a Suspicious Medical Aid Message</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">1. Do NOT click links or call the number in the message</h3>
          <p className="text-slate-300">Even a legitimate‑looking link can lead to a fake login page.</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">2. Verify via official channels</h3>
          <p className="text-slate-300">Call the number on your medical aid card or log into the official app directly – never through a link.</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">3. Report the scam</h3>
          <p className="text-slate-300">Forward phishing SMS to your scheme’s fraud line or email <strong>fraud@medicalschemes.co.za</strong>.</p>
        </div>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="font-bold text-red-300">4. Change your password if you entered it on a fake site</h3>
          <p className="text-slate-300">Do this immediately and enable two‑factor authentication if available.</p>
        </div>
      </div>

      {/* CTA to Main Scanner */}
      <div className="mt-8 text-center">
        <Link href="/scan" className="btn-3d bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl inline-block">
          🔍 Verify a Suspicious Medical Aid Message
        </Link>
        <p className="text-slate-400 text-sm mt-2">Paste the message content – free, instant scam analysis.</p>
      </div>

      {/* Footer Navigation */}
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
