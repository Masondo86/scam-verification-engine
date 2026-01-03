import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scan for Scams | Free Scam Checker South Africa',
  description:
    'Scan websites, phone numbers, emails or messages for scams, phishing and banking fraud in South Africa.',
}

export default function ScanPage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Scam Scan
      </h1>

      <p className="text-gray-600 mb-8">
        Enter a website URL, phone number, email address, or message to check
        for potential scams, phishing attempts, or banking fraud in South Africa.
      </p>

      {/* Placeholder for scan form */}
      <div className="border border-dashed rounded-lg p-6 bg-gray-50">
        <p className="text-sm text-gray-500">
          🚧 Scan engine UI coming next.
        </p>
      </div>
    </main>
  )
}
