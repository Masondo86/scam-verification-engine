import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scan for Scams | Free Scam Checker South Africa',
  description:
    'Scan websites, phone numbers, emails or messages for scams, phishing and banking fraud in South Africa.',
};

export default function ScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
