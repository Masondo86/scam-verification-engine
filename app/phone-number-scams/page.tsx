// app/phone-number-scams/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phone Number Scams in South Africa | How to Spot & Stop Them',
  description: 'Learn how to identify and avoid phone number scams in SA: vishing, SIM swap fraud, SMS phishing, and more. Free protection tips.',
  keywords: 'phone number scams south africa, vishing, SIM swap fraud, sms phishing, scam calls',
  openGraph: {
    title: 'Phone Number Scams in South Africa | Stay Safe',
    description: 'Protect yourself from vishing, SIM swap, and SMS scams. Learn warning signs and report fraud.',
    url: 'https://checkascam.co.za/phone-number-scams',
    type: 'website',
  },
};

export default function PhoneNumberScamsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-indigo-600 text-sm mb-6 inline-block">← Back to Home</Link>

      <h1 className="text-4xl font-bold mb-4 text-slate-900">Phone Number Scams in South Africa</h1>
      <p className="text-xl text-slate-600 mb-8">
        How scammers use your phone number to steal money and identity – and how to fight back.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-100">
          <div className="text-3xl font-bold text-red-600">1.6B</div>
          <div className="text-slate-600 text-sm">Scam calls received in SA (2025)</div>
          <div className="text-xs text-slate-500 mt-2">Source: Truecaller</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-100">
          <div className="text-3xl font-bold text-yellow-600">72%</div>
          <div className="text-slate-600 text-sm">of SA adults have been targeted by phone scams</div>
          <div className="text-xs text-slate-500 mt-2">Source: SABRIC</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-100">
          <div className="text-3xl font-bold text-purple-600">R1.2B</div>
          <div className="text-slate-600 text-sm">Lost to vishing and SIM swap fraud (2024)</div>
          <div className="text-xs text-slate-500 mt-2">Source: SAPS</div>
        </div>
      </div>

      {/* Types of phone number scams */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Common Phone Number Scams</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="text-xl font-bold text-red-700 mb-1">📞 Vishing (Voice Phishing)</h3>
          <p className="text-slate-600">Scammers call pretending to be your bank, SARS, or a service provider. They create urgency and ask you to share OTPs, PINs, or personal details.</p>
          <p className="text-sm text-slate-500 mt-2"><strong>Red flags:</strong> Unknown number, urgent threat, request for OTP or card details, spoofed caller ID.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="text-xl font-bold text-red-700 mb-1">📱 SIM Swap Fraud</h3>
          <p className="text-slate-600">Criminals fraudulently port your phone number to a SIM they control. They then intercept OTPs and empty your bank accounts.</p>
          <p className="text-sm text-slate-500 mt-2"><strong>Red flags:</strong> Sudden loss of signal, SMS about a SIM swap you didn't request, unknown transactions.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="text-xl font-bold text-red-700 mb-1">✉️ SMS Phishing (Smishing)</h3>
          <p className="text-slate-600">Fake SMS messages claiming to be from banks, couriers, or SARS. They contain links to fake websites that steal your credentials.</p>
          <p className="text-sm text-slate-500 mt-2"><strong>Red flags:</strong> Unsolicited link, urgent request, poor grammar, sender number not from official source.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="text-xl font-bold text-red-700 mb-1">📊 “Missed Call” Scams</h3>
          <p className="text-slate-600">Scammers make a call that rings once and hangs up. If you call back, you're connected to a premium-rate number that charges exorbitant fees.</p>
          <p className="text-sm text-slate-500 mt-2"><strong>Red flags:</strong> Unknown international or premium-rate numbers; you don't recognise the number.</p>
        </div>
      </div>

      {/* How to protect yourself */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">🛡️ How to Protect Yourself</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <h3 className="font-bold text-green-800">1. Don't answer unknown calls</h3>
          <p className="text-slate-600 text-sm">If it's important, they'll leave a voicemail. Never call back numbers you don't recognise.</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <h3 className="font-bold text-green-800">2. Never share OTPs or PINs</h3>
          <p className="text-slate-600 text-sm">Banks and legitimate companies will never ask for your OTP, PIN, or full card number over the phone.</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <h3 className="font-bold text-green-800">3. Hang up and call back</h3>
          <p className="text-slate-600 text-sm">If someone calls claiming to be from your bank, hang up and call the official number on your bank card.</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <h3 className="font-bold text-green-800">4. Register for free spam blocking</h3>
          <p className="text-slate-600 text-sm">Use services like Truecaller or your mobile provider's spam protection (e.g., Vodacom Call Filter, MTN Spam Protect).</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <h3 className="font-bold text-green-800">5. Report suspicious calls and SMS</h3>
          <p className="text-slate-600 text-sm">Forward spam SMS to 7726 (SPAM) or report to your mobile operator. You can also report to the South African Fraud Prevention Service (SAFPS).</p>
        </div>
      </div>

      {/* Check a number */}
      <div className="mt-8 text-center">
        <Link href="/scan" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:scale-105">
          🔍 Check a Phone Number Now
        </Link>
        <p className="text-slate-500 text-sm mt-2">Paste a suspicious phone number – get a free risk score instantly.</p>
      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
        <Link href="/banking-fraud-south-africa" className="mx-2 hover:text-indigo-600 text-slate-500">Banking Fraud</Link> •
        <Link href="/investment-scams" className="mx-2 hover:text-indigo-600 text-slate-500">Investment Scams</Link> •
        <Link href="/whatsapp-scams" className="mx-2 hover:text-indigo-600 text-slate-500">WhatsApp Scams</Link> •
        <Link href="/phone-number-scams" className="mx-2 hover:text-indigo-600 text-slate-500">Phone Number Scams</Link> •
        <Link href="/medical-aid-fraud-south-africa" className="mx-2 hover:text-indigo-600 text-slate-500">Medical Aid Fraud</Link> •
        <Link href="/scam-psychology" className="mx-2 hover:text-indigo-600 text-slate-500">Scam Psychology</Link>
      </div>
    </main>
  );
}
