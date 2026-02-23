import InternalFraudLinks from '@/components/InternalFraudLinks';

export const metadata = {
  title: 'Investment Scams in South Africa | YourBrand',
  description:
    'Learn common investment scam tactics in South Africa and how to identify warning signs before you invest.',
  openGraph: {
    title: 'Investment Scams in South Africa | YourBrand',
    description:
      'Learn common investment scam tactics in South Africa and how to identify warning signs before you invest.',
    url: 'https://checkascam.co.za/investment-scams',
    type: 'website',
  },
};

export default function InvestmentScams() {
  return (
    <main>
      <h1>Investment Scams in South Africa</h1>

      <p>
        Investment scams promise high, guaranteed returns with little or no risk.
        In South Africa, these scams often spread through WhatsApp and Telegram.
      </p>

      <h2>Common Warning Signs</h2>
      <ul>
        <li>Guaranteed or unusually high returns</li>
        <li>No registration with FSCA</li>
        <li>Pressure to recruit others</li>
        <li>Fake dashboards showing “profits”</li>
      </ul>

      <h2>Examples Seen in South Africa</h2>
      <p>
        Fake farming investments, crypto arbitrage schemes,
        and WhatsApp investment groups.
      </p>

      <InternalFraudLinks />
    </main>
  );
}
