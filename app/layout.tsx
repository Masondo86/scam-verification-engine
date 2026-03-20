
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://checkascam.co.za'),
  title: {
    default: 'Free Scam Lookup Tool | Free Scam Checker South Africa',
    template: '%s | Free Scam Lookup Tool',
  },
  description:
    'Free public scam checker for websites, phone numbers, emails and messages. Detect phishing, impersonation and banking fraud in South Africa.',
  keywords: [
    'check phone number south africa free',
    'scam checker south africa',
    'phone scam checker',
    'phishing detection',
    'banking fraud south africa',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Free Scam Lookup Tool',
    title: 'Free Scam Lookup Tool | Free Scam Checker South Africa',
    description:
      'Free public scam detection tool for South Africa. Check websites, phone numbers, emails and suspicious messages instantly.',
    url: 'https://checkascam.co.za',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <body>
        {children}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Free Scam Lookup Tool",
              "url": "https://checkascam.co.za",
              // Logo temporarily removed
            })
          }}
        />
      </body>
    </html>
  );
}
