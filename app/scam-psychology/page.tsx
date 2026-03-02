import InternalFraudLinks from '@/components/InternalFraudLinks';

export const metadata = {
  title: 'Scam Psychology & Persuasion Tactics | YourBrand',
  description:
    'Understand persuasion techniques used in scams and how to recognize manipulation before you respond.',
  openGraph: {
    title: 'Scam Psychology & Persuasion Tactics | YourBrand',
    description:
      'Understand persuasion techniques used in scams and how to recognize manipulation before you respond.',
    url: 'https://checkascam.co.za/scam-psychology',
    type: 'website',
  },
};

export default function ScamPsychology() {
  return (
    <main>
      <h1>Persuasion Techniques Used in Scams</h1>

      <p>
        Many scams rely on well-documented persuasion techniques,
        including those described by psychologist Robert Cialdini.
      </p>

      <h2>Cialdini’s Principles of Persuasion in Scams</h2>

      <ul>
        <li><strong>Authority:</strong> “This is your bank / SARS / SASSA”</li>
        <li><strong>Scarcity:</strong> “Offer expires today”</li>
        <li><strong>Social Proof:</strong> Fake testimonials</li>
        <li><strong>Commitment:</strong> Small actions leading to big losses</li>
        <li><strong>Liking:</strong> Friendly WhatsApp profiles</li>
        <li><strong>Reciprocity:</strong> Fake “help” before the ask</li>
      </ul>

      <p>
        Understanding these techniques makes scams easier to detect.
      </p>

      <InternalFraudLinks />
    </main>
  );
}
