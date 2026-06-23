'use client';

import Link from 'next/link';
import { Metadata } from 'next';
import { useState } from 'react';

// Note: metadata is still server-side, but we need to keep it separate
// This file is now a Client Component due to waitlist state management

export default function DigitalFootprintHub() {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistTier, setWaitlistTier] = useState<'R29' | 'R59'>('R59');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: waitlistEmail,
          tier: waitlistTier,
          source: 'digital-footprint-hub',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setWaitlistSubmitted(true);
      setWaitlistEmail('');
      // Reset after 5 seconds
      setTimeout(() => {
        setWaitlistSubmitted(false);
      }, 5000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setErrorMessage(message);
      console.error('Waitlist error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotifyClick = (tier: 'R29' | 'R59') => {
    setWaitlistTier(tier);
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Know Your Digital Footprint
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Your personal data is everywhere – data breaches, spam lists, broker sites.  
            Our privacy‑first scanner reveals your exposure and gives you a clear action plan.
          </p>
          <div className="inline-flex gap-4">
            <Link href="#pricing" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition">
              Check My Exposure
            </Link>
            <Link href="#learn" className="bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition">
              Learn More
            </Link>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            🔒 No passwords stored • POPIA compliant • Free educational guides
          </p>
        </div>
      </section>

      {/* Stats / Trust Signals */}
      <section className="py-12 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-600">R3.9B</div>
            <div className="text-slate-500 text-sm">Lost to fraud (2025)</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">400%</div>
            <div className="text-slate-500 text-sm">Increase in identity theft</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">16B+</div>
            <div className="text-slate-500 text-sm">Records exposed in breaches</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600">1,000+</div>
            <div className="text-slate-500 text-sm">Data broker sites</div>
          </div>
        </div>
      </section>

      {/* What is a Digital Footprint – Educational Section */}
      <section id="learn" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Your Digital Footprint Explained</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-3">Email Exposure</h3>
              <p className="text-slate-600 text-sm mb-4">
                Your email address is often the key to your online identity. If it appears in a data breach, criminals can use it for phishing, account takeovers, or identity theft.
              </p>
              <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg">
                <strong className="block mb-1">What we check:</strong> HaveIBeenPwned, disposable address detection, deliverability.
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Phone Number Risk</h3>
              <p className="text-slate-600 text-sm mb-4">
                Your mobile number is a prime target for SIM‑swap fraud, spam calls, and social engineering. Scammers buy phone lists from data brokers and dark web markets.
              </p>
              <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg">
                <strong className="block mb-1">What we check:</strong> Spam/fraud reputation, inactive status, data breach presence.
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-3">Device Vulnerabilities</h3>
              <p className="text-slate-600 text-sm mb-4">
                Outdated browsers, weak security headers, and missing encryption make your device an easy target for malware and phishing.
              </p>
              <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg">
                <strong className="block mb-1">What we check (full scan):</strong> Browser version, HTTPS, cookie policies, security headers.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why You Should Care */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">Why Your Digital Footprint Matters</h2>
          <div className="space-y-4 text-slate-700 text-lg">
            <p>🔓 <strong>Criminals use your exposed data to:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Impersonate you to banks and mobile providers → drain your accounts.</li>
              <li>Launch personalised phishing attacks – they already know your name, address, and purchase history.</li>
              <li>Open fraudulent accounts in your name – destroying your credit record.</li>
              <li>Sell your data to other scammers on the dark web – the abuse never ends.</li>
            </ul>
            <p className="mt-6">✅ <strong>Knowing your exposure is the first step to protection.</strong> Our scanner gives you a clear risk score and a custom action plan.</p>
          </div>
        </div>
      </section>

      {/* Pricing – R29 Email+Phone / R59 Full Package */}
      <section id="pricing" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-slate-600 mb-12">One‑time scans – no subscriptions. Pay only when you check.</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Email + Phone Scan – R29 */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 text-center">
              <div className="text-indigo-600 text-sm font-semibold uppercase mb-2">Most Popular</div>
              <div className="text-4xl font-bold text-slate-900 mb-2">R29</div>
              <div className="text-slate-500 mb-6">one‑time scan</div>
              <h3 className="text-xl font-bold mb-3">Email + Phone Scan</h3>
              <ul className="text-left text-sm text-slate-600 space-y-2 mb-6">
                <li>✅ Email breach check (HaveIBeenPwned)</li>
                <li>✅ Email validity & deliverability</li>
                <li>✅ Phone spam/fraud reputation</li>
                <li>✅ Unified risk score</li>
                <li>✅ Actionable recommendations (PDF report)</li>
              </ul>
              <button
                onClick={() => handleNotifyClick('R29')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition"
              >
                Notify Me When Available
              </button>
              <p className="text-xs text-slate-400 mt-3">Launching end of July 2026</p>
            </div>

            {/* Full Package (Email + Phone + Device) – R59 */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">R59</div>
              <div className="text-slate-500 mb-6">one‑time scan</div>
              <h3 className="text-xl font-bold mb-3">Full Digital Footprint</h3>
              <ul className="text-left text-sm text-slate-600 space-y-2 mb-6">
                <li>✅ Everything in Email + Phone Scan</li>
                <li>✅ Device security audit (browser, HTTPS, headers)</li>
                <li>✅ Dark web monitoring (Phase 2)</li>
                <li>✅ Priority support</li>
                <li>✅ Detailed remediation checklist</li>
              </ul>
              <button
                onClick={() => handleNotifyClick('R59')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition"
              >
                Notify Me When Available
              </button>
              <p className="text-xs text-slate-400 mt-3">Launching end of July 2026</p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-8">
            🔒 No subscription. Your data is never stored. Pay once, get your report instantly.
          </p>
        </div>
      </section>

      {/* Waitlist / Notify Me */}
      <section id="waitlist-section" className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Get Early Access – {waitlistTier}
          </h2>
          <p className="text-slate-600 mb-6">
            We're putting the final touches on the Digital Footprint Scanner.  
            Leave your email and we'll notify you as soon as it launches – plus a special launch discount.
          </p>

          {waitlistSubmitted ? (
            <div className="max-w-md mx-auto p-6 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="text-emerald-600 text-3xl mb-2">✓</div>
              <div className="text-emerald-900 font-semibold mb-2">Thank you for joining!</div>
              <div className="text-emerald-800 text-sm">
                We'll notify you at {waitlistEmail} when the {waitlistTier} scan launches with a special discount code.
              </div>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                {isLoading ? 'Submitting...' : 'Notify Me'}
              </button>
            </form>
          )}

          {errorMessage && (
            <div className="max-w-md mx-auto p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm mb-4">
              {errorMessage}
            </div>
          )}

          <p className="text-xs text-slate-500 mt-4">
            🔒 We respect your privacy. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer / Back to Home */}
      <footer className="border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <Link href="/" className="hover:text-indigo-600">← Back to Scam Verification Engine</Link>
        <div className="mt-2 space-x-4">
          <Link href="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-indigo-600">Terms</Link>
        </div>
      </footer>
    </main>
  );
}
