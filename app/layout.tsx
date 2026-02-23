import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://checkascam.co.za'),
  title: {
    default: 'Scam Verification Engine | Free Scam Checker South Africa',
    template: '%s | Scam Verification Engine',
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
    siteName: 'Scam Verification Engine',
    title: 'Scam Verification Engine | Free Scam Checker South Africa',
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
      <body>{children}</body>
    </html>
  );
}
