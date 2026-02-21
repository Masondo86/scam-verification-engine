import type { Metadata } from 'next'
import Link from 'next/link'
import InternalFraudLinks from '@/components/InternalFraudLinks'

export const metadata: Metadata = {
  title: 'Check Phone Number South Africa Free | Scam Number Checker',
  description:
    'Check a phone number in South Africa for free. Detect scam calls, phishing SMS, WhatsApp fraud, and impersonation attempts instantly.',
  openGraph: {
    title: 'Check Phone Number South Africa Free',
    description:
      'Verify suspicious South African phone numbers for scam risk and impersonation patterns.',
    url: 'https://checkascam.co.za/phone-number-check-south-africa',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PhoneNumberCheckPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Check a Phone Number in South Africa (Free Scam Check)
      </h1>

      <p className="mb-4">
        Use our free tool to check whether a phone number in South Africa has
        been linked to scam calls, phishing SMS messages, WhatsApp fraud, or
        impersonation attempts.
      </p>

      <p className="mb-4">
        Scammers often pretend to be banks, medical aids, couriers, or SARS.
        Always verify suspicious numbers before responding.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Run a Scam Check
        </Link>
      </div>

      <InternalFraudLinks />
    </main>
  )
}
