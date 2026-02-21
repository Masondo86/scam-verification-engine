import BroaderExposureSection from "@/components/BroaderExposureSection";
import Link from 'next/link';
import type { Metadata } from 'next';
import InternalFraudLinks from '@/components/InternalFraudLinks';

export const metadata: Metadata = {
  title: 'WhatsApp Scams in South Africa | YourBrand',
  description:
    'Understand common WhatsApp scams targeting South Africans and learn how to verify suspicious messages safely.',
  openGraph: {
    title: 'WhatsApp Scams in South Africa | YourBrand',
    description:
      'Understand common WhatsApp scams targeting South Africans and learn how to verify suspicious messages safely.',
    url: 'https://checkascam.co.za/whatsapp-scams',
    type: 'website',
  },
};

export default function WhatsAppScamsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Back Link */}
      <Link href="/" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
        ← Back to Home
      </Link>

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-glow bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-4">
          WhatsApp Scams in South Africa
        </h1>
        <p className="text-xl text-slate-400">
          The most common WhatsApp fraud tactics targeting South Africans
        </p>
      </header>

      {/* Why WhatsApp */}
      <section className="glass-panel p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Why Scammers Love WhatsApp</h2>
        <p className="text-slate-300 mb-4">
          With over <strong className="text-emerald-400">90% of South Africans</strong> using WhatsApp, 
          it's become the primary hunting ground for scammers. The platform's features make it perfect for fraud:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
            <div className="text-red-400 font-bold mb-2">✗ End-to-end encryption</div>
            <p className="text-slate-400 text-sm">Makes it harder for WhatsApp to detect scams</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
            <div className="text-red-400 font-bold mb-2">✗ Easy to spoof numbers</div>
            <p className="text-slate-400 text-sm">Scammers can fake contact names and profiles</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
            <div className="text-red-400 font-bold mb-2">✗ Instant reach</div>
            <p className="text-slate-400 text-sm">One message reaches thousands immediately</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
            <div className="text-red-400 font-bold mb-2">✗ Trusted platform</div>
            <p className="text-slate-400 text-sm">People assume messages are from real contacts</p>
          </div>
        </div>
      </section>

      {/* Top Scams */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Top 10 WhatsApp Scams in SA</h2>
        
        <div className="space-y-6">
          
          {/* Scam 1 */}
          <div className="glass-panel p-6 border-l-4 border-red-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Account Hijacking</h3>
                <p className="text-slate-400 text-sm">The most dangerous scam</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-red-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Hi, I accidentally sent you a 6-digit code. Please send it back to me."
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">How it works:</strong> Scammer tries to register your number on a new device. 
                WhatsApp sends YOU the verification code. If you share it, they gain full access to your account.
              </p>
              <p className="text-red-400 font-semibold">
                <strong>Never share OTP/verification codes with anyone - not even "friends"!</strong>
              </p>
            </div>
          </div>

          {/* Scam 2 */}
          <div className="glass-panel p-6 border-l-4 border-orange-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Impersonation Scam</h3>
                <p className="text-slate-400 text-sm">"Mom, I lost my phone..."</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-orange-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Hi Mom, this is my new number. My phone broke. Can you send me R2000 urgently? I'll pay you back tomorrow."
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">How it works:</strong> Using a hijacked account or new number, 
                scammer pretends to be your child/family member in distress needing money.
              </p>
              <p className="text-orange-400">
                <strong>Always verify:</strong> Call the person on their known number. Don't rely on WhatsApp alone.
              </p>
            </div>
          </div>

          {/* Scam 3 */}
          <div className="glass-panel p-6 border-l-4 border-yellow-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Fake Job Offers</h3>
                <p className="text-slate-400 text-sm">Too good to be true opportunities</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-yellow-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Work from home! Earn R500/day. Just forward our products to your contacts. Register now for R150."
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Red flags:</strong> Registration fees, guaranteed high income, 
                vague job descriptions, pressure to recruit others (pyramid scheme).
              </p>
              <p className="text-yellow-400">
                <strong>Rule:</strong> Legitimate employers never ask you to pay for a job.
              </p>
            </div>
          </div>

          {/* Scam 4 */}
          <div className="glass-panel p-6 border-l-4 border-emerald-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Prize/Lottery Scams</h3>
                <p className="text-slate-400 text-sm">You won something you didn't enter</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-emerald-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Congratulations! Your number won R50,000 in the Capitec Lucky Draw! Click here to claim."
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">How to spot it:</strong> You didn't enter any competition. 
                Link goes to fake website. Asks for "processing fee" or banking details.
              </p>
              <p className="text-emerald-400">
                <strong>Remember:</strong> Real lotteries don't contact winners via WhatsApp, and you can't win something you didn't enter.
              </p>
            </div>
          </div>

          {/* Scam 5 */}
          <div className="glass-panel p-6 border-l-4 border-cyan-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">SASSA/NSFAS Scams</h3>
                <p className="text-slate-400 text-sm">Exploiting grant recipients</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-cyan-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Your SASSA grant payment is on hold. Verify your details here to receive payment."
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Target:</strong> Vulnerable grant recipients. Scammers steal 
                banking details or ID numbers to redirect payments.
              </p>
              <p className="text-cyan-400">
                <strong>Fact:</strong> SASSA and NSFAS never request details via WhatsApp.
              </p>
            </div>
          </div>

          {/* Scam 6 */}
          <div className="glass-panel p-6 border-l-4 border-blue-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                6
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Bank OTP Harvesting</h3>
                <p className="text-slate-400 text-sm">Stealing your one-time pins</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-blue-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "This is FNB Security. We detected suspicious activity. Please send us the OTP we just sent to verify it's you."
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Critical:</strong> The scammer initiates a transaction on YOUR account. 
                Your bank sends YOU an OTP. If you share it, they complete the transaction.
              </p>
              <p className="text-blue-400 font-semibold">
                <strong>Banks NEVER ask for OTPs. Ever.</strong>
              </p>
            </div>
          </div>

          {/* Scam 7 */}
          <div className="glass-panel p-6 border-l-4 border-indigo-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl">
                7
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Romance Scams</h3>
                <p className="text-slate-400 text-sm">Love with a hidden agenda</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-indigo-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                After weeks of chatting: "I need R5000 for a medical emergency. I'll pay you back when my overseas payment clears."
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Pattern:</strong> Scammer builds emotional connection over weeks/months, 
                then manufactures crisis requiring money. Often claims to be abroad.
              </p>
              <p className="text-indigo-400">
                <strong>Warning signs:</strong> Never met in person, avoids video calls, asks for money, has elaborate backstory.
              </p>
            </div>
          </div>

          {/* Scam 8 */}
          <div className="glass-panel p-6 border-l-4 border-purple-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                8
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Investment Scams</h3>
                <p className="text-slate-400 text-sm">Guaranteed returns that aren't</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-purple-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Join our Bitcoin investment group. R500 becomes R5000 in 2 weeks! 100% guaranteed returns!"
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Reality:</strong> Ponzi schemes, pyramid schemes, or outright theft. 
                Early investors may get paid (with new victims' money) to appear legitimate.
              </p>
              <p className="text-purple-400">
                <strong>Golden rule:</strong> If returns are guaranteed and sound too good, it's a scam.
              </p>
            </div>
          </div>

          {/* Scam 9 */}
          <div className="glass-panel p-6 border-l-4 border-pink-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-xl">
                9
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Parcel Delivery Scam</h3>
                <p className="text-slate-400 text-sm">Fake Courier/Post Office messages</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-pink-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Your parcel from Takealot is awaiting delivery. Pay R85 customs fee here: [link]"
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Goal:</strong> Steal credit card details or banking info through fake payment page. 
                Often targets people who actually ordered something online.
              </p>
              <p className="text-pink-400">
                <strong>Check:</strong> Log into official courier website directly. Don't click WhatsApp links.
              </p>
            </div>
          </div>

          {/* Scam 10 */}
          <div className="glass-panel p-6 border-l-4 border-rose-500">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xl">
                10
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Donation/Charity Scams</h3>
                <p className="text-slate-400 text-sm">Exploiting your generosity</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded border border-rose-500/30 mb-4">
              <p className="text-slate-300 text-sm font-mono">
                "Please help! My child needs an urgent operation. Donate here: [banking details]"
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Tactic:</strong> Emotional manipulation using fake sob stories, 
                often with stolen photos of sick children or disasters.
              </p>
              <p className="text-rose-400">
                <strong>Donate safely:</strong> Only through verified charity organizations with PBO/NPO numbers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* How to Protect Yourself */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">How to Protect Yourself</h2>
        
        <div className="glass-panel p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-4">Security Settings</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-emerald-400">1.</span>
                  <div>
                    <strong>Enable Two-Step Verification:</strong> Settings → Account → Two-step verification
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">2.</span>
                  <div>
                    <strong>Privacy Settings:</strong> Limit who can see your profile photo, status, and "last seen"
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">3.</span>
                  <div>
                    <strong>Disable Auto-Download:</strong> Prevent malicious files from auto-downloading
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">4.</span>
                  <div>
                    <strong>Group Privacy:</strong> Change "Who can add me to groups" to "My Contacts"
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-4">Behavioral Rules</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <div>Verify unexpected messages by calling the person</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <div>Never share OTP/verification codes</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <div>Don't click suspicious links - scan them first</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <div>Question urgency and pressure tactics</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <div>Research before sending money</div>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">✓</span>
                  <div>Report and block suspicious contacts</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What to Do If Scammed */}
      <section className="glass-panel p-8 mb-12 border-2 border-red-500/50 bg-red-500/5">
        <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ What to Do If You've Been Scammed</h2>
        <div className="space-y-4 text-slate-300">
          <div>
            <strong className="text-white">1. Act Immediately:</strong>
            <ul className="ml-6 mt-2 space-y-1 text-sm">
              <li>• Contact your bank and freeze accounts</li>
              <li>• Change all passwords</li>
              <li>• Report the number to WhatsApp</li>
            </ul>
          </div>
          <div>
            <strong className="text-white">2. Report to Authorities:</strong>
            <ul className="ml-6 mt-2 space-y-1 text-sm">
              <li>• SAPS Cybercrime: 0860 010 111</li>
              <li>• Report to your bank's fraud department</li>
              <li>• File case at police station</li>
            </ul>
          </div>
          <div>
            <strong className="text-white">3. Document Everything:</strong>
            <ul className="ml-6 mt-2 space-y-1 text-sm">
              <li>• Screenshot all messages</li>
              <li>• Save transaction records</li>
              <li>• Note dates, times, and amounts</li>
            </ul>
          </div>
        </div>
      </section>
      <BroaderExposureSection />
      {/* FAQ Section */}
<section className="mt-16 border-t border-slate-700 pt-12">
  <h2 className="text-3xl font-bold text-white mb-8">
    Frequently Asked Questions
  </h2>

  <div className="space-y-8">

    <div className="glass-panel p-6">
      <h3 className="text-lg font-bold text-emerald-400 mb-3">
        Can scammers reuse my phone number after a WhatsApp scam?
      </h3>
      <p className="text-slate-300 text-sm">
        Yes. Phone numbers collected during scams are often redistributed
        across other fraud campaigns. This can lead to repeated phishing
        messages or impersonation attempts.
      </p>
    </div>

    <div className="glass-panel p-6">
      <h3 className="text-lg font-bold text-cyan-400 mb-3">
        Should I change my number after responding to a scam?
      </h3>
      <p className="text-slate-300 text-sm">
        In most cases, strengthening account security and monitoring unusual
        activity is sufficient. Changing your number may only be necessary if
        repeated targeting continues.
      </p>
    </div>

    <div className="glass-panel p-6">
      <h3 className="text-lg font-bold text-indigo-400 mb-3">
        Why do scammers focus on WhatsApp in South Africa?
      </h3>
      <p className="text-slate-300 text-sm">
        WhatsApp has extremely high adoption in South Africa,
        making it a preferred channel for fraudsters.
      </p>
    </div>

  </div>
</section>



      {/* CTA */}
      <section className="glass-panel p-8 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-500/50">
        <h3 className="text-2xl font-bold text-white mb-4">Verify Suspicious Messages</h3>
        <p className="text-slate-300 mb-6">
          Got a suspicious WhatsApp message? Don't risk it - scan it for free.
        </p>
        <Link 
          href="/scan"
          className="inline-block btn-3d bg-gradient-to-r from-emerald-500 to-cyan-600 border-b-emerald-900 px-6 py-3"
        >
          Scan Message Now →
        </Link>
      </section>

      {/* More Resources */}
      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <Link href="/how-scams-work" className="glass-panel p-6 hover:border-indigo-500/50 transition-all">
          <h3 className="font-bold text-indigo-400 mb-2">How Scams Work →</h3>
          <p className="text-slate-400 text-sm">Understand the psychology behind fraud</p>
        </Link>
        <Link href="/banking-fraud-south-africa" className="glass-panel p-6 hover:border-pink-500/50 transition-all">
          <h3 className="font-bold text-pink-400 mb-2">SA Banking Fraud →</h3>
          <p className="text-slate-400 text-sm">Bank impersonation tactics and official resources</p>
        </Link>
      </section>


      <InternalFraudLinks />
    </main>
  );
}
