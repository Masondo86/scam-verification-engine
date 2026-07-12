'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PaydayLoanScamsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReport = async () => {
    const scamDescription = prompt(
      "Please describe the loan scam you encountered (e.g., lender name, website, phone number, what happened):"
    );

    if (!scamDescription || scamDescription.trim() === "") {
      alert("No description provided. Report not submitted.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/spam/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'loan',
          content: scamDescription.trim(),
        }),
      });

      if (res.ok) {
        alert("Thank you for reporting. This helps the community.");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to submit report. Please try again later.");
      }
    } catch {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-slate-900">Payday Loan Scams in South Africa</h1>
      <p className="text-xl text-slate-600 mb-8">
        How to spot fake lenders, verify NCR registration, and avoid losing money to illegal loan sharks.
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-100">
          <div className="text-3xl font-bold text-red-600">45%</div>
          <div className="text-slate-600 text-sm">Increase in payday loan scams (2025)</div>
          <div className="text-xs text-slate-400 mt-2">Source: SAFPS</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-100">
          <div className="text-3xl font-bold text-yellow-600">10,694</div>
          <div className="text-slate-600 text-sm">Lapsed / cancelled NCR registrations</div>
          <div className="text-xs text-slate-400 mt-2">Source: NCR</div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-slate-100">
          <div className="text-3xl font-bold text-purple-600">R2,000+</div>
          <div className="text-slate-600 text-sm">Average loss per victim to loan scams</div>
          <div className="text-xs text-slate-400 mt-2">Source: SAFPS</div>
        </div>
      </div>

      {/* CTA to Scanner */}
      <div className="mb-12 text-center bg-indigo-50 rounded-xl p-6 border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-800 mb-3">Verify a Suspicious Loan Offer</h2>
        <p className="text-slate-600 mb-4">Paste the SMS, WhatsApp message, website URL, or phone number – free & instant.</p>
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all"
        >
          🔍 Open Scam Detector
        </Link>
      </div>

      {/* How to Verify a Legitimate Lender */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">✅ How to Verify a Payday Loan Provider</h2>
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold text-xl">1.</span>
          <div className="text-slate-600">
            <strong>Search the NCR Register</strong> – Visit the official{' '}
            <Link href="https://www.ncr.org.za" className="text-indigo-600 underline">
              NCR Register of Registrants
            </Link>{' '}
            and search by company name or NCRCP number. Only registered lenders can legally lend money.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold text-xl">2.</span>
          <div className="text-slate-600">
            <strong>Check the NCR "Lapsed" List</strong> – If a lender appears on the{' '}
            <Link href="https://www.ncr.org.za" className="text-indigo-600 underline">
              Lapsed Registrations
            </Link>{' '}
            list, they are no longer authorised.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold text-xl">3.</span>
          <div className="text-slate-600">
            <strong>Use the SAFPS Yima Scanner</strong> – Paste the lender's website into{' '}
            <Link href="https://www.yima.org.za" className="text-indigo-600 underline">
              Yima
            </Link>{' '}
            to see if it has been flagged as malicious.
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold text-xl">4.</span>
          <div className="text-slate-600">
            <strong>Contact the NCR directly</strong> – Call 0860 627 627 to verify a lender's status.
          </div>
        </div>
      </div>

      {/* Common Red Flags */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">🚩 7 Red Flags of a Payday Loan Scam</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-red-700 mb-1">💰 Upfront fees</h3>
          <p className="text-slate-600">
            "Pay R250 admin fee before we release your loan." Legitimate lenders deduct fees from the loan amount or add them to repayments – never ask for money before payout.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-red-700 mb-1">✅ "Guaranteed approval" / "No credit check"</h3>
          <p className="text-slate-600">
            The National Credit Act requires an affordability assessment. Any lender promising 100% approval is either a scammer or an illegal mashonisa.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-red-700 mb-1">📱 Only WhatsApp / Gmail contact</h3>
          <p className="text-slate-600">
            Legitimate lenders have professional websites, landline numbers, and physical addresses. Scammers operate via anonymous channels.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-red-700 mb-1">🆔 Request for ID book, bank card, or PIN as "security"</h3>
          <p className="text-slate-600">This is illegal in South Africa. They will use your information for identity theft.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-red-700 mb-1">⏱ Extreme urgency – "Offer expires in 1 hour"</h3>
          <p className="text-slate-600">Scammers pressure you to act without thinking. Legitimate lenders give you time to read the contract.</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-red-700 mb-1">🔗 Suspicious website URL</h3>
          <p className="text-slate-600">
            Cloned domains like `wonga-loans-sa.co.za` instead of `wonga.co.za`. Always check for HTTPS and spelling errors.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-red-500">
          <h3 className="font-bold text-red-700 mb-1">❌ No NCR registration number on their website</h3>
          <p className="text-slate-600">If they don't display their NCRCP number, assume they are illegal.</p>
        </div>
      </div>

      {/* List of Legitimate Registered Lenders */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">🏦 Legitimate NCR-Registered Payday Lenders</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-slate-200 rounded-xl">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left text-slate-700">Lender</th>
              <th className="px-4 py-2 text-left text-slate-700">NCR Registration</th>
              <th className="px-4 py-2 text-left text-slate-700">Official Website</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Wonga</td>
              <td className="px-4 py-2">NCRCP12875</td>
              <td className="px-4 py-2">
                <Link href="https://www.wonga.co.za" className="text-indigo-600">
                  wonga.co.za
                </Link>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Atlas Finance</td>
              <td className="px-4 py-2">NCRCP43</td>
              <td className="px-4 py-2">
                <Link href="https://www.atlasfinance.co.za" className="text-indigo-600">
                  atlasfinance.co.za
                </Link>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Finance27 (Sanlam)</td>
              <td className="px-4 py-2">NCRCP7084</td>
              <td className="px-4 py-2">
                <Link href="https://www.sanlamonline.co.za" className="text-indigo-600">
                  sanlamonline.co.za
                </Link>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Barko Loans</td>
              <td className="px-4 py-2">NCRCP? (Check NCR)</td>
              <td className="px-4 py-2">
                <Link href="https://www.barko.co.za" className="text-indigo-600">
                  barko.co.za
                </Link>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Sunshine Loans</td>
              <td className="px-4 py-2">NCRCP14110</td>
              <td className="px-4 py-2">
                <Link href="https://www.sunshineloans.co.za" className="text-indigo-600">
                  sunshineloans.co.za
                </Link>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Supreme Finance</td>
              <td className="px-4 py-2">NCRCP7342</td>
              <td className="px-4 py-2">
                <Link href="https://www.supremefinance.co.za" className="text-indigo-600">
                  supremefinance.co.za
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-400 mt-2">
          Always double-check registration status on the{' '}
          <Link href="https://www.ncr.org.za" className="underline">
            NCR website
          </Link>{' '}
          – registrations can lapse.
        </p>
      </div>

      {/* What to Do If Scammed */}
      <h2 className="text-2xl font-bold mb-4 text-slate-900">🚨 What to Do If You've Been Targeted</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="font-bold text-red-700">1. Stop all payments</h3>
          <p className="text-slate-600">Do not send any more money. Contact your bank immediately to reverse any unauthorised debits.</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="font-bold text-red-700">2. Report to SAFPS Yima</h3>
          <p className="text-slate-600">
            Visit{' '}
            <Link href="https://www.yima.org.za" className="text-indigo-600 underline">
              yima.org.za
            </Link>{' '}
            to report the scammer's phone number, website, or bank account.
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="font-bold text-red-700">3. File a complaint with the NCR</h3>
          <p className="text-slate-600">Call 0860 627 627 or email complaints@ncr.org.za. They can investigate illegal lenders.</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="font-bold text-red-700">4. Warn others on HelloPeter</h3>
          <p className="text-slate-600">Post a review to help other consumers avoid the same scam.</p>
        </div>
      </div>

      {/* Report a Loan Scam Button */}
      <div className="my-10 flex flex-col items-center">
        <button
          onClick={handleReport}
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : '🚨 Report a Loan Scam (anonymously)'}
        </button>
        <p className="text-slate-500 text-sm mt-2 text-center max-w-md">
          Your report helps us warn others. No personal data is collected.
        </p>
      </div>
    </main>
  );
}
