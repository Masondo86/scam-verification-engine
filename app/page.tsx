import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-extrabold text-glow bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Stop Scams Before They Start
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Free scam verification for South Africans. Check websites, phone numbers, emails and messages in seconds.
        </p>
        <Link 
          href="/scan"
          className="inline-block btn-3d bg-gradient-to-r from-indigo-500 to-purple-600 border-b-indigo-900 text-lg px-8 py-4"
        >
          Scan Now - It's Free
        </Link>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
          <div className="glass-panel p-6">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-white mb-2">Instant Analysis</h3>
            <p className="text-slate-400 text-sm">
              Real-time threat detection using multiple security databases
            </p>
          </div>
          <div className="glass-panel p-6">
            <div className="text-4xl mb-3">🇿🇦</div>
            <h3 className="font-bold text-white mb-2">SA Banking Focus</h3>
            <p className="text-slate-400 text-sm">
              Specialized detection for South African bank impersonation scams
            </p>
          </div>
          <div className="glass-panel p-6">
            <div className="text-4xl mb-3">🆓</div>
            <h3 className="font-bold text-white mb-2">100% Free</h3>
            <p className="text-slate-400 text-sm">
              No registration, no credit card, unlimited scans
            </p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="glass-panel max-w-6xl mx-auto px-4 py-12 mb-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-indigo-400 mb-2">R2.2B</div>
            <div className="text-slate-400 text-sm">Lost to scams in SA (2023)</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">67%</div>
            <div className="text-slate-400 text-sm">Increase in cyber fraud</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
            <div className="text-slate-400 text-sm">Real-time protection</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-400 mb-2">Free</div>
            <div className="text-slate-400 text-sm">Always free to use</div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-12 mb-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Understanding Scams
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/how-scams-work" className="glass-panel p-8 hover:border-indigo-500/50 transition-all group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">How Scams Work</h3>
            <p className="text-slate-400 mb-4">
              Learn the psychology behind fraud, common tactics, and why even smart people fall victim.
            </p>
            <div className="text-indigo-400 font-semibold">Read More →</div>
          </Link>

          <Link href="/whatsapp-scams" className="glass-panel p-8 hover:border-purple-500/50 transition-all group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💬</div>
            <h3 className="text-2xl font-bold text-white mb-3">WhatsApp Scams in SA</h3>
            <p className="text-slate-400 mb-4">
              Discover the most common WhatsApp scams targeting South Africans and how to spot them.
            </p>
            <div className="text-purple-400 font-semibold">Read More →</div>
          </Link>

          <Link href="/banking-fraud-south-africa" className="glass-panel p-8 hover:border-pink-500/50 transition-all group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏦</div>
            <h3 className="text-2xl font-bold text-white mb-3">SA Banking Fraud</h3>
            <p className="text-slate-400 mb-4">
              Bank impersonation tactics, official security resources, and what to do if you're targeted.
            </p>
            <div className="text-pink-400 font-semibold">Read More →</div>
          </Link>

          <div className="glass-panel p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold text-white mb-3">Need More Protection?</h3>
            <p className="text-slate-400 mb-4">
              Scan your digital footprint or monitor your smart home network with our premium services.
            </p>
            <div className="space-y-2 text-sm">
              <div className="text-emerald-400">✓ Email Scan - R29</div>
              <div className="text-teal-400">✓ Full Identity Scan - R59</div>
              <div className="text-cyan-400">✓ Smart Home Network Agent - Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 py-12 mb-20">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-2xl font-bold text-indigo-400">
              1
            </div>
            <h3 className="font-bold text-white mb-2">Enter Details</h3>
            <p className="text-slate-400 text-sm">
              Paste URL, phone number, email or suspicious message
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl font-bold text-purple-400">
              2
            </div>
            <h3 className="font-bold text-white mb-2">Instant Scan</h3>
            <p className="text-slate-400 text-sm">
              We check multiple threat databases in real-time
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center text-2xl font-bold text-pink-400">
              3
            </div>
            <h3 className="font-bold text-white mb-2">Get Results</h3>
            <p className="text-slate-400 text-sm">
              Detailed risk score with explanation
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-2xl font-bold text-emerald-400">
              4
            </div>
            <h3 className="font-bold text-white mb-2">Stay Safe</h3>
            <p className="text-slate-400 text-sm">
              Follow clear action steps to protect yourself
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="glass-panel p-12 shadow-indigo">
          <h2 className="text-4xl font-bold text-white mb-4">
            Protect Yourself Today
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Don't wait until it's too late. Verify suspicious messages in seconds.
          </p>
          <Link 
            href="/scan"
            className="inline-block btn-3d bg-gradient-to-r from-indigo-500 to-purple-600 border-b-indigo-900 text-lg px-8 py-4"
          >
            Start Free Scan
          </Link>
          <p className="text-slate-500 text-sm mt-4">
            No registration required • 100% free • Powered by The Link Digital Security
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; 2026 The Link Digital Security. Protecting South Africans from digital threats.</p>
          <div className="mt-4 space-x-4">
            <Link href="/how-scams-work" className="hover:text-indigo-400 transition-colors">How Scams Work</Link>
            <Link href="/whatsapp-scams" className="hover:text-indigo-400 transition-colors">WhatsApp Scams</Link>
            <Link href="/banking-fraud-south-africa" className="hover:text-indigo-400 transition-colors">Banking Fraud</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
