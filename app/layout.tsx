import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scam Verification Engine | Free Scam Checker South Africa',
  description:
    'Free public scam checker for websites, phone numbers, emails and messages. Detect banking fraud, phishing and impersonation scams in South Africa.',
  keywords: [
    'scam checker',
    'verify website',
    'check phone number scam',
    'South Africa scams',
    'bank fraud',
    'phishing detection',
    'LinkSure'
  ],
  openGraph: {
    title: 'LinkSure Scam Verification Engine',
    description: 'Free public scam detection tool for South Africa',
    url: 'https://checkascam.co.za',
    siteName: 'LinkSure',
    locale: 'en_ZA',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* === SCHEMA.ORG STRUCTURED DATA === */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Scam Verification Engine',
              url: 'https://checkascam.co.za',
              applicationCategory: 'SecurityApplication',
              operatingSystem: 'All',
              description:
                'Free public scam verification tool for checking websites, phone numbers, emails and messages for fraud, phishing and impersonation scams in South Africa.',
              publisher: {
                '@type': 'Organization',
                name: 'LinkSure',
                url: 'https://checkascam.co.za'
              },
              areaServed: {
                '@type': 'Country',
                name: 'South Africa'
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'ZAR'
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
