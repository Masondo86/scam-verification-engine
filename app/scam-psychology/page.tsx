// app/scam-psychology/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scam Psychology: How Fraudsters Manipulate Your Mind',
  description: 'Learn the 6 persuasion techniques scammers use: authority, urgency, social proof, and more. Protect yourself by understanding the psychology behind fraud.',
  keywords: 'scam psychology, persuasion techniques, social engineering, cialdini principles, how scams work',
  openGraph: {
    title: 'Scam Psychology | How Fraudsters Manipulate You',
    description: 'Discover the psychological tricks behind phishing, vishing, and investment scams. Recognise the red flags before you lose money.',
    url: 'https://checkascam.co.za/scam-psychology',
    type: 'website',
  },
};

export default function ScamPsychologyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-indigo-400 text-sm mb-6 inline-block">← Back to Home</Link>
      
      <h1 className="text-4xl font-bold mb-4">Scam Psychology: How Fraudsters Manipulate Your Mind</h1>
      <p className="text-xl text-slate-300 mb-8">
        Scams don't just exploit technology – they exploit human nature. Learn the psychological principles behind fraud so you can recognise them before it's too late.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-red-400">90%+</div>
          <div className="text-slate-300 text-sm">Scams rely on psychological manipulation, not technical hacking</div>
          <div className="text-xs text-slate-500 mt-2">Source: Social engineering studies</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400">5x</div>
          <div className="text-slate-300 text-sm">People are more likely to fall for scams when under time pressure</div>
          <div className="text-xs text-slate-500 mt-2">Source: Behavioural economics research</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-purple-400">87%</div>
          <div className="text-slate-300 text-sm">Of scam victims later said they "felt something was wrong" but ignored it</div>
          <div className="text-xs text-slate-500 mt-2">Source: Victim surveys</div>
        </div>
      </div>

      {/* Introduction */}
      <h2 className="text-2xl font-bold mb-4">Why Scams Work</h2>
      <p className="text-slate-300 mb-8">
        Scammers exploit automatic psychological responses. They create emotional states (fear, excitement, urgency) that override rational thinking. 
        The most effective scams combine multiple persuasion principles – often derived from the work of psychologist <strong>Robert Cialdini</strong>.
      </p>

      {/* Cialdini's 6 Principles */}
      <h2 className="text-2xl font-bold mb-4">Cialdini’s 6 Principles of Persuasion – Used by Scammers</h2>
      <div className="space-y-6 mb-8">
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">👑 Authority</h3>
          <p className="text-slate-300">Scammers impersonate banks, SARS, SAPS, or medical aids. They use official-sounding titles, fake badges, and spoofed phone numbers to appear legitimate.</p>
          <p className="text-sm text-slate-400 mt-2"><strong>Example:</strong> “This is Captain Ndlovu from SAPS Cybercrime Unit. Your ID has been used in a fraud case.”</p>
          <p className="text-sm text-indigo-300 mt-1">✅ Defence: Always verify via official channels – call back on a number you trust.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">⏳ Scarcity</h3>
          <p className="text-slate-300">“Limited time offer”, “only 5 spots left”, “your account will be suspended in 24 hours”. Scarcity creates panic and bypasses logic.</p>
          <p className="text-sm text-slate-400 mt-2"><strong>Example:</strong> “Your R2,500 SARS refund expires today. Click here to claim.”</p>
          <p className="text-sm text-indigo-300 mt-1">✅ Defence: Real institutions do not impose sudden deadlines via SMS/email.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">👥 Social Proof</h3>
          <p className="text-slate-300">Fake testimonials, fabricated “thousands have already invested”, or screenshots of WhatsApp groups claiming huge profits.</p>
          <p className="text-sm text-slate-400 mt-2"><strong>Example:</strong> “Join our crypto trading group – see daily profit screenshots from 500+ members.”</p>
          <p className="text-sm text-indigo-300 mt-1">✅ Defence: Be sceptical of unsolicited success stories. Real investments have risks and don’t need WhatsApp hype.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">🔗 Commitment & Consistency</h3>
          <p className="text-slate-300">Scammers start with a small request (e.g., “just confirm your email”) then escalate. Once you comply, you feel pressured to stay consistent.</p>
          <p className="text-sm text-slate-400 mt-2"><strong>Example:</strong> First, they ask for your name. Then your ID. Then a “small deposit”. Then the full amount.</p>
          <p className="text-sm text-indigo-300 mt-1">✅ Defence: Never agree to anything over the phone. Stop at the first unusual request.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">😊 Liking</h3>
          <p className="text-slate-300">Scammers build rapport – they use your name, pretend to share interests, or send friendly WhatsApp messages. People are more likely to trust those they like.</p>
          <p className="text-sm text-slate-400 mt-2"><strong>Example:</strong> “Hi Mom, I lost my phone. This is my new number. Can you send R500 for groceries?”</p>
          <p className="text-sm text-indigo-300 mt-1">✅ Defence: Verify identity by calling the original number or asking a question only they would know.</p>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-xl font-semibold text-red-300 mb-2">🎁 Reciprocity</h3>
          <p className="text-slate-300">Scammers give something first – a “free” e‑book, a “gift card”, or “help” with a problem – then expect something in return (your information or money).</p>
          <p className="text-sm text-slate-400 mt-2"><strong>Example:</strong> “We noticed an unauthorised transaction. Let me help you reverse it. First, please confirm your account number.”</p>
          <p className="text-sm text-indigo-300 mt-1">✅ Defence: Unsolicited help is rarely genuine. Never share sensitive data with someone who contacted you first.</p>
        </div>
      </div>

      {/* Real-World Example: How Multiple Principles Combine */}
      <h2 className="text-2xl font-bold mb-4">Real‑World Example: The “Bank Impersonation” Call</h2>
      <div className="glass-panel p-5 mb-8">
        <p className="text-slate-300 mb-3">A typical vishing call uses:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li><strong>Authority</strong> – “I’m from FNB Fraud Department” (spoofed number).</li>
          <li><strong>Scarcity</strong> – “Your account will be locked in 1 hour”.</li>
          <li><strong>Reciprocity</strong> – “We’ll help you secure your money, but first you must confirm your OTP”.</li>
          <li><strong>Liking</strong> – They use your name and are very polite.</li>
        </ul>
        <p className="text-slate-300 mt-3">By recognising each principle, you can see the scam beneath the friendly voice.</p>
      </div>

      {/* How to Build Psychological Resistance */}
      <h2 className="text-2xl font-bold mb-4">🛡️ How to Build Psychological Resistance</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <h3 className="font-bold text-green-300">1. Pause and breathe</h3>
          <p className="text-slate-300">Scams create artificial urgency. Always take 60 seconds to think before acting.</p>
        </div>
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <h3 className="font-bold text-green-300">2. Verify independently</h3>
          <p className="text-slate-300">Call the institution using a number from their official website – never the one provided in the message.</p>
        </div>
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <h3 className="font-bold text-green-300">3. Ask a trusted person</h3>
          <p className="text-slate-300">Scammers rely on isolation. Tell a friend or family member – they may spot red flags you missed.</p>
        </div>
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
          <h3 className="font-bold text-green-300">4. Use the scam checker</h3>
          <p className="text-slate-300">Paste the suspicious message, URL, or phone number into our free tool – it will detect manipulation tactics.</p>
        </div>
      </div>

      {/* CTA to Scanner */}
      <div className="mt-8 text-center">
        <Link href="/scan" className="btn-3d bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl inline-block">
          🧠 Check a Suspicious Message for Manipulation
        </Link>
        <p className="text-slate-400 text-sm mt-2">Our AI analyses urgency, authority, and fear tactics – free and instant.</p>
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
