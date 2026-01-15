import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Banking Fraud in South Africa | Prevention & Official Resources - The Link Digital Security',
  description: 'Learn about bank impersonation scams, phishing tactics, and official security resources from SA banks. Protect your accounts.',
};

export default function BankingFraudPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Back Link */}
      <Link href="/" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
        ← Back to Home
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-glow bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-4">
          Banking Fraud in South Africa
        </h1>
        <p className="text-xl text-slate-400">
          Understanding bank impersonation scams and how to protect your money
        </p>
      </header>

      {/* Stats */}
      <section className="glass-panel p-8 mb-8 border-2 border-red-500/50 bg-red-500/5">
        <h2 className="text-2xl font-bold text-red-400 mb-4">The Threat is Real</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">R2.2B</div>
            <div className="text-slate-400 text-sm">Lost to banking fraud in 2023</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">67%</div>
            <div className="text-slate-400 text-sm">Increase in digital fraud</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">15min</div>
            <div className="text-slate-400 text-sm">Average time to drain account</div>
          </div>
        </div>
        <p className="text-slate-300 text-sm">
          Source: South African Banking Risk Information Centre (SABRIC)
        </p>
      </section>

      {/* Why Banks Are Targeted */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Why Scammers Target SA Banks</h2>
        
        <div className="glass-panel p-8 mb-6">
          <div className="space-y-4 text-slate-300">
            <div className="flex gap-3">
              <span className="text-red-400 font-bold text-xl">→</span>
              <div>
                <strong className="text-white">High Trust:</strong> South Africans trust their banks implicitly, 
                making impersonation highly effective.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-orange-400 font-bold text-xl">→</span>
              <div>
                <strong className="text-white">Digital Adoption:</strong> Rapid shift to online/mobile banking 
                during COVID created new vulnerability windows.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-yellow-400 font-bold text-xl">→</span>
              <div>
                <strong className="text-white">Low Tech Literacy:</strong> Many users don't understand how 
                digital banking security actually works.
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-pink-400 font-bold text-xl">→</span>
              <div>
                <strong className="text-white">Instant Transfers:</strong> EFT and instant payment systems 
                allow scammers to move money fast.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Banking Scams - CONTINUING FROM HERE */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Common SA Banking Scams</h2>
        
        <div className="space-y-6">
          
          {/* Vishing */}
          <div className="glass-panel p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-white mb-3">📞 Vishing (Voice Phishing)</h3>
            <div className="bg-slate-900/50 p-4 rounded border border-red-500/30 mb-4">
              <p className="text-slate-300 text-sm italic">
                "Good morning, this is Capitec Fraud Department. We've detected suspicious activity on your account. 
                To secure it, we need to verify your details and send you a one-time PIN..."
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-white">How it works:</strong>
                <ul className="ml-6 mt-2 space-y-1 text-slate-300">
                  <li>• Scammer calls pretending to be from your bank</li>
                  <li>• Uses official-sounding language and urgency</li>
                  <li>• Asks you to "verify" account details or share OTP</li>
                  <li>• May transfer you to "supervisor" (another scammer)</li>
                  <li>• Uses spoofed caller ID showing bank's real number</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                <strong className="text-red-400">Red Flags:</strong>
                <ul className="ml-6 mt-2 space-y-1 text-slate-300">
                  <li>• Asks for full card number, CVV, or PIN</li>
                  <li>• Requests OTP/verification codes</li>
                  <li>• Creates urgency ("Your account will be closed")</li>
                  <li>• Offers to "help" by doing transactions for you</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Phishing */}
          <div className="glass-panel p-6 border-l-4 border-orange-500">
            <h3 className="text-xl font-bold text-white mb-3">📧 Phishing Emails & SMS</h3>
            <div className="bg-slate-900/50 p-4 rounded border border-orange-500/30 mb-4">
              <div className="text-xs text-slate-500 mb-2">From: security@fnb-secure.co.za</div>
              <p className="text-slate-300 text-sm">
                <strong>Subject: Urgent Security Alert</strong><br/>
                Your FNB account has been temporarily suspended due to suspicious activity. 
                Click here to verify your identity within 24 hours: [LINK]
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-white">Spotting fake bank messages:</strong>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <div className="text-red-400 font-semibold mb-2">❌ FAKE</div>
                    <ul className="space-y-1 text-slate-300 text-xs">
                      <li>• Sender: fnb-secure.co.za</li>
                      <li>• Generic greeting: "Dear Customer"</li>
                      <li>• Urgent threat language</li>
                      <li>• Suspicious link: fnb-verify.com</li>
                      <li>• Poor grammar/spelling</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                    <div className="text-green-400 font-semibold mb-2">✅ REAL</div>
                    <ul className="space-y-1 text-slate-300 text-xs">
                      <li>• Sender: @fnb.co.za (exact)</li>
                      <li>• Personal greeting with name</li>
                      <li>• No urgent action required</li>
                      <li>• Links to fnb.co.za (official)</li>
                      <li>• Professional language</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIM Swap */}
          <div className="glass-panel p-6 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-white mb-3">📱 SIM Swap Fraud</h3>
            <div className="bg-slate-900/50 p-4 rounded border border-yellow-500/30 mb-4">
              <p className="text-slate-300 text-sm">
                Scammer gets your phone number transferred to their SIM card, intercepts OTPs, 
                and empties your bank accounts before you realize what happened.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-white">The Attack Chain:</strong>
                <div className="mt-3 space-y-2">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">1</div>
                    <div className="text-slate-300">Scammer gets your ID number (data breach/social engineering)</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">2</div>
                    <div className="text-slate-300">Fraudulently requests SIM swap at mobile provider</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">3</div>
                    <div className="text-slate-300">Your number now routes to their SIM (you lose signal)</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs">4</div>
                    <div className="text-slate-300">They reset banking passwords using OTPs sent to "your" number</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs">5</div>
                    <div className="text-slate-300">Access accounts and transfer all funds</div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                <strong className="text-yellow-400">Warning Signs:</strong>
                <ul className="ml-6 mt-2 space-y-1 text-slate-300">
                  <li>• Sudden loss of cell signal (no service)</li>
                  <li>• SMS about SIM swap you didn't request</li>
                  <li>• Unable to make/receive calls</li>
                  <li>• Unknown transaction notifications</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What Banks NEVER Do */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">What SA Banks NEVER Do</h2>
        
        <div className="glass-panel p-8 border-2 border-green-500/50 bg-green-500/5">
          <p className="text-slate-300 mb-6">
            <strong className="text-white">Every major South African bank follows these rules. 
            If someone violates ANY of these, it's a scam:</strong>
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-4">❌ Banks NEVER:</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <div>Ask for your full card number over phone/email</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <div>Request your PIN, password, or CVV</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <div>Ask for OTP/verification codes</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <div>Request remote access to your device</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <div>Send unsolicited links via SMS/WhatsApp</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400 font-bold">✗</span>
                  <div>Call asking you to move money to "safe" accounts</div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-green-400 mb-4">✅ Banks DO:</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <div>Verify YOUR identity using info they have</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <div>Allow you to call them back on official numbers</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <div>Send notifications about actual transactions</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <div>Direct you to log in via official app/website</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <div>Give you time to verify information</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <div>Respect your right to be cautious</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Official Bank Security Resources */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Official SA Bank Security Centers</h2>
        <p className="text-slate-400 mb-6">
          Bookmark these official resources. Always verify information directly through these links:
        </p>
        
        <div className="space-y-4">
          
          {/* FNB */}
          <div className="glass-panel p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">
                F
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">First National Bank (FNB)</h3>
                <a 
                  href="https://www.fnb.co.za/security/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm block mb-2"
                >
                  fnb.co.za/security/ →
                </a>
                <div className="text-slate-400 text-sm">
                  <strong>Fraud Hotline:</strong> 087 575 9404 (24/7)
                </div>
              </div>
            </div>
          </div>

          {/* Capitec */}
          <div className="glass-panel p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                C
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Capitec Bank</h3>
                <a 
                  href="https://www.capitecbank.co.za/security-centre/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm block mb-2"
                >
                  capitecbank.co.za/security-centre/ →
                </a>
                <div className="text-slate-400 text-sm">
                  <strong>Client Care:</strong> 0860 10 20 43 (24/7)
                </div>
              </div>
            </div>
          </div>

          {/* ABSA */}
          <div className="glass-panel p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xl">
                A
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">ABSA</h3>
                <a 
                  href="https://www.absa.co.za/absaafrica/security-centre/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm block mb-2"
                >
                  absa.co.za/absaafrica/security-centre/ →
                </a>
                <div className="text-slate-400 text-sm">
                  <strong>Fraud Line:</strong> 0800 111 155 (24/7)
                </div>
              </div>
            </div>
          </div>

          {/* Standard Bank */}
          <div className="glass-panel p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xl">
                S
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Standard Bank</h3>
                <a 
                  href="https://www.standardbank.co.za/southafrica/personal/security-centre" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm block mb-2"
                >
                  standardbank.co.za/southafrica/personal/security-centre →
                </a>
                <div className="text-slate-400 text-sm">
                  <strong>Fraud Hotline:</strong> 0800 020 600 (24/7)
                </div>
              </div>
            </div>
          </div>

          {/* Nedbank */}
          <div className="glass-panel p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">
                N
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Nedbank</h3>
                <a 
                  href="https://www.nedbank.co.za/content/nedbank/desktop/gt/en/security-centre.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 text-sm block mb-2"
                >
                  nedbank.co.za/security-centre.html →
                </a>
                <div className="text-slate-400 text-sm">
                  <strong>Fraud Line:</strong> 0800 110 929 (24/7)
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* If You've Been Scammed */}
      <section className="glass-panel p-8 mb-12 border-2 border-red-500/50 bg-red-500/5">
        <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ If You've Been Scammed</h2>
        <div className="space-y-4 text-slate-300">
          <div>
            <strong className="text-white text-lg">1. Immediate Actions (First 30 Minutes):</strong>
            <ul className="ml-6 mt-2 space-y-1 text-sm">
              <li>• Call your bank's fraud line IMMEDIATELY (numbers above)</li>
              <li>• Freeze all affected accounts</li>
              <li>• Change all banking passwords</li>
              <li>• Cancel any compromised cards</li>
            </ul>
          </div>
          <div>
            <strong className="text-white text-lg">2. Report to Authorities:</strong>
            <ul className="ml-6 mt-2 space-y-1 text-sm">
              <li>• SAPS Cybercrime: 0860 010 111</li>
              <li>• File a case at your local police station</li>
              <li>• Report to SABRIC: www.sabric.co.za</li>
              <li>• Contact your mobile provider if SIM swap occurred</li>
            </ul>
          </div>
          <div>
            <strong className="text-white text-lg">3. Document Everything:</strong>
            <ul className="ml-6 mt-2 space-y-1 text-sm">
              <li>• Screenshot all messages and calls</li>
              <li>• Save transaction records</li>
              <li>• Write down timeline of events</li>
              <li>• Keep all case reference numbers</li>
            </ul>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4 mt-4">
            <p className="text-yellow-400 font-semibold text-sm">
              <strong>Important:</strong> Speed is critical. The faster you act, the higher the chance of recovering your money.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-panel p-8 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-2 border-pink-500/50">
        <h3 className="text-2xl font-bold text-white mb-4">Protect Your Bank Account</h3>
        <p className="text-slate-300 mb-6">
          Got a suspicious bank-related message? Verify it before responding or clicking any links.
        </p>
        <Link 
          href="/scan"
          className="inline-block btn-3d bg-gradient-to-r from-pink-500 to-rose-600 border-b-pink-900 px-6 py-3"
        >
          Scan Suspicious Message →
        </Link>
      </section>

      {/* More Resources */}
      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <Link href="/how-scams-work" className="glass-panel p-6 hover:border-indigo-500/50 transition-all">
          <h3 className="font-bold text-indigo-400 mb-2">How Scams Work →</h3>
          <p className="text-slate-400 text-sm">Understand the psychology behind fraud</p>
        </Link>
        <Link href="/whatsapp-scams" className="glass-panel p-6 hover:border-emerald-500/50 transition-all">
          <h3 className="font-bold text-emerald-400 mb-2">WhatsApp Scams in SA →</h3>
          <p className="text-slate-400 text-sm">Common WhatsApp fraud targeting South Africans</p>
        </Link>
      </section>

    </main>
  );
}
