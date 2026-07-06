// app/help-center/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Resource Center | Scam Assistance & Safety Tips',
  description:
    "Get help if you've been scammed. Report to banks, telecoms, SAPS, SAFPS, and find online safety tips. Free resources for South Africans.",
  keywords: 'help center, report scam, bank fraud, sim swap, online safety, scam assistance',
  openGraph: {
    title: 'Help & Resource Center | The Link Digital Security',
    description:
      "Find official contacts for banks, telecoms, SAPS, and social media safety tips. Report fraud and protect yourself.",
    url: 'https://checkascam.co.za/help-center',
    type: 'website',
  },
};

export default function HelpCenterPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="text-indigo-600 text-sm mb-6 inline-block">← Back to Home</Link>

      <h1 className="text-4xl font-bold mb-4 text-slate-900">Help & Resource Center</h1>
      <p className="text-xl text-slate-600 mb-8">
        If you've been targeted by a scam, find the right contacts and recovery steps below. Bookmark this page for quick access.
      </p>

      {/* Quick Contacts */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">📞 Emergency Contacts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h3 className="font-bold text-red-700">SAPS Crime Stop</h3>
          <p className="text-red-600 font-mono text-lg">08600 10111</p>
          <p className="text-sm text-slate-600">24/7 – report any crime, including scams.</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-bold text-blue-700">SAFPS (Yima)</h3>
          <p className="text-blue-600 font-mono text-lg">083 123 7226</p>
          <p className="text-sm text-slate-600">Report identity theft and scam prevention.</p>
          <Link href="https://www.yima.org.za" target="_blank" className="text-blue-600 underline text-sm">yima.org.za</Link>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h3 className="font-bold text-purple-700">National Financial Ombud</h3>
          <p className="text-purple-600 font-mono text-lg">0860 800 900</p>
          <p className="text-sm text-slate-600">Free dispute resolution for banking complaints.</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <h3 className="font-bold text-yellow-700">NCR Complaints</h3>
          <p className="text-yellow-600 font-mono text-lg">0860 627 627</p>
          <p className="text-sm text-slate-600">Report illegal lenders or credit providers.</p>
        </div>
      </div>

      {/* Banks & Financial Institutions */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">🏦 Banks & Financial Institutions</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">FNB</h3>
          <p><strong>Fraud Hotline:</strong> 087 575 9404 (24/7)</p>
          <p><Link href="https://www.fnb.co.za/security/" target="_blank" className="text-indigo-600 underline">fnb.co.za/security/</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Capitec</h3>
          <p><strong>Client Care:</strong> 0860 10 20 43 (24/7)</p>
          <p><Link href="https://www.capitecbank.co.za/security-centre/" target="_blank" className="text-indigo-600 underline">capitecbank.co.za/security-centre/</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">ABSA</h3>
          <p><strong>Fraud Line:</strong> 0800 111 155 (24/7)</p>
          <p><Link href="https://www.absa.co.za/absaafrica/security-centre/" target="_blank" className="text-indigo-600 underline">absa.co.za/security-centre/</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Standard Bank</h3>
          <p><strong>Fraud Hotline:</strong> 0800 020 600 (24/7)</p>
          <p><Link href="https://www.standardbank.co.za/southafrica/personal/security-centre" target="_blank" className="text-indigo-600 underline">standardbank.co.za/security-centre</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Nedbank</h3>
          <p><strong>Fraud Line:</strong> 0800 110 929 (24/7)</p>
          <p><Link href="https://www.nedbank.co.za/security-centre.html" target="_blank" className="text-indigo-600 underline">nedbank.co.za/security-centre.html</Link></p>
        </div>
      </div>

      {/* Telecoms */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">📱 Mobile Network Operators</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Vodacom</h3>
          <p><strong>Fraud / SIM swap:</strong> Call 082 1941 or visit a branch.</p>
          <p><Link href="https://www.vodacom.co.za/security-centre" target="_blank" className="text-indigo-600 underline">vodacom.co.za/security-centre</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">MTN</h3>
          <p><strong>Fraud:</strong> Call 083 123 7226 (SAFPS) or visit MTN Store.</p>
          <p><Link href="https://www.mtn.co.za/security" target="_blank" className="text-indigo-600 underline">mtn.co.za/security</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Cell C</h3>
          <p><strong>Fraud:</strong> Call 084 140 (customer care) or 083 123 7226 (SAFPS).</p>
          <p><Link href="https://www.cellc.co.za/security" target="_blank" className="text-indigo-600 underline">cellc.co.za/security</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Telkom</h3>
          <p><strong>Fraud:</strong> Call 081 180 (customer care) or report to SAFPS.</p>
          <p><Link href="https://www.telkom.co.za/security" target="_blank" className="text-indigo-600 underline">telkom.co.za/security</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Report spam SMS</h3>
          <p><strong>Forward spam SMS to:</strong> <span className="font-mono text-lg">7726</span> (SPAM) – free.</p>
        </div>
      </div>

      {/* Email Providers */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">📧 Email Providers</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Gmail</h3>
          <p><Link href="https://support.google.com/mail/answer/8253?hl=en" target="_blank" className="text-indigo-600 underline">Report phishing</Link></p>
          <p><Link href="https://myaccount.google.com/security" target="_blank" className="text-indigo-600 underline">Google Security Checkup</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Outlook / Hotmail</h3>
          <p><Link href="https://support.microsoft.com/en-us/outlook/report-phishing" target="_blank" className="text-indigo-600 underline">Report phishing</Link></p>
          <p><Link href="https://account.microsoft.com/security" target="_blank" className="text-indigo-600 underline">Microsoft Security</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">Yahoo Mail</h3>
          <p><Link href="https://help.yahoo.com/kb/report-phishing" target="_blank" className="text-indigo-600 underline">Report phishing</Link></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">General email safety</h3>
          <p><strong>Tip:</strong> Never click links in suspicious emails. Always hover to see the real URL.</p>
        </div>
      </div>

      {/* Social Media Safety */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">📱 Social Media Safety Tips</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <h3 className="font-bold text-indigo-800">General tips</h3>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>✅ Use strong, unique passwords for each social media account.</li>
            <li>✅ Enable two-factor authentication (2FA) on all platforms.</li>
            <li>✅ Be wary of unsolicited friend requests – they may be fake profiles.</li>
            <li>✅ Never share personal info (ID, bank details) in DMs.</li>
            <li>✅ Report impersonation or suspicious accounts immediately to the platform.</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-bold text-slate-900">Facebook</h3>
            <Link href="https://www.facebook.com/safety" target="_blank" className="text-indigo-600 underline text-sm">Facebook Safety Center</Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-bold text-slate-900">Instagram</h3>
            <Link href="https://help.instagram.com/796198045045199" target="_blank" className="text-indigo-600 underline text-sm">Report an account</Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-bold text-slate-900">WhatsApp</h3>
            <p className="text-sm text-slate-600">Block and report users directly in the chat. Never forward suspicious messages.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
            <h3 className="font-bold text-slate-900">LinkedIn</h3>
            <Link href="https://www.linkedin.com/help/linkedin/topics" target="_blank" className="text-indigo-600 underline text-sm">Report fake profiles</Link>
          </div>
        </div>
      </div>

      {/* General Online Safety */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">🌐 General Online Safety Tips</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">🛡️ Use a Password Manager</h3>
          <p className="text-slate-600">Generate and store unique, complex passwords for every account. Recommended: Bitwarden, 1Password, or Dashlane.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">🔑 Enable Two-Factor Authentication (2FA)</h3>
          <p className="text-slate-600">Add an extra layer of security using an authenticator app (Google Authenticator, Authy) or SMS codes.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">🌐 Use a VPN on Public Wi-Fi</h3>
          <p className="text-slate-600">Protect your data on public networks with a trusted VPN service (e.g., ProtonVPN, NordVPN).</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">📊 Monitor Your Credit Reports</h3>
          <p className="text-slate-600">Check your credit report regularly for unauthorised accounts. You can request a free report from TransUnion, Experian, or Compuscan.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h3 className="font-bold text-slate-900">📧 Email Hygiene</h3>
          <p className="text-slate-600">Never click on links in unsolicited emails. Verify the sender's address carefully (look for subtle misspellings).</p>
        </div>
      </div>

      {/* Official Authorities */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">🏛️ Official Authorities & Regulators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <h3 className="font-bold text-slate-900">SAPS Cybercrime</h3>
          <p className="text-sm text-slate-600">Report cybercrime online or at your local station.</p>
          <Link href="https://www.saps.gov.za/services/cybercrime.php" target="_blank" className="text-indigo-600 underline text-sm">saps.gov.za</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <h3 className="font-bold text-slate-900">SAFPS</h3>
          <p className="text-sm text-slate-600">Fraud prevention and identity theft protection.</p>
          <Link href="https://www.safps.org.za" target="_blank" className="text-indigo-600 underline text-sm">safps.org.za</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <h3 className="font-bold text-slate-900">FSCA</h3>
          <p className="text-sm text-slate-600">Report unauthorised financial services or investment scams.</p>
          <Link href="https://www.fsca.co.za" target="_blank" className="text-indigo-600 underline text-sm">fsca.co.za</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <h3 className="font-bold text-slate-900">NCR</h3>
          <p className="text-sm text-slate-600">Complaints about illegal lenders or credit providers.</p>
          <Link href="https://www.ncr.org.za" target="_blank" className="text-indigo-600 underline text-sm">ncr.org.za</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <h3 className="font-bold text-slate-900">Council for Medical Schemes</h3>
          <p className="text-sm text-slate-600">Report medical aid fraud.</p>
          <Link href="https://www.medicalschemes.co.za" target="_blank" className="text-indigo-600 underline text-sm">medicalschemes.co.za</Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-100">
          <h3 className="font-bold text-slate-900">National Financial Ombud</h3>
          <p className="text-sm text-slate-600">Free dispute resolution for financial services complaints.</p>
          <Link href="https://www.financialombud.org.za" target="_blank" className="text-indigo-600 underline text-sm">financialombud.org.za</Link>
        </div>
      </div>

      {/* CTA to Scanner */}
      <div className="mt-8 text-center">
        <Link href="/scan" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all">
          🔍 Check a Suspicious Message, Number, or Link
        </Link>
        <p className="text-slate-500 text-sm mt-2">Always verify before you trust.</p>
      </div>

      {/* Footer navigation */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
        <Link href="/banking-fraud-south-africa" className="mx-2 hover:text-indigo-600">Banking Fraud</Link> •
        <Link href="/investment-scams" className="mx-2 hover:text-indigo-600">Investment Scams</Link> •
        <Link href="/whatsapp-scams" className="mx-2 hover:text-indigo-600">WhatsApp Scams</Link> •
        <Link href="/phone-number-scams" className="mx-2 hover:text-indigo-600">Phone Number Scams</Link> •
        <Link href="/medical-aid-fraud-south-africa" className="mx-2 hover:text-indigo-600">Medical Aid Fraud</Link> •
        <Link href="/scam-psychology" className="mx-2 hover:text-indigo-600">Scam Psychology</Link>
      </div>
    </main>
  );
}
