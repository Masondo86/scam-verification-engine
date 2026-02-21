import type { Metadata } from 'next'
import Link from 'next/link'
import InternalFraudLinks from '@/components/InternalFraudLinks'

export const metadata: Metadata = {
  title: 'Medical Aid Fraud & Phishing in South Africa | Protect Members',
  description:
    'Learn how medical aid scams target South African members. Verify suspicious SMS, email, WhatsApp, and provider impersonation attempts.',
  openGraph: {
    title: 'Medical Aid Fraud & Phishing in South Africa',
    description:
      'Understand and detect medical scheme fraud, phishing, and impersonation scams in South Africa.',
    url: 'https://checkascam.co.za/medical-aid-fraud-south-africa',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function MedicalAidFraudPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Medical Aid Fraud in South Africa
      </h1>

      <p className="mb-4">
        Medical aid scams in South Africa often involve phishing SMS messages,
        fake emails, impersonation of scheme administrators, or fraudulent
        requests for member information.
      </p>

      <p className="mb-4">
        Always verify communication claiming to be from your medical scheme.
        Never share OTPs, login credentials, or ID numbers without confirming
        legitimacy.
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Verify a Suspicious Message
        </Link>
      </div>

      <InternalFraudLinks />
    </main>
  )
}
