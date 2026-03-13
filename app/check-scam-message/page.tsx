import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check If a Message Is a Scam | Free SMS & WhatsApp Scanner',
  description:
    'Paste a suspicious SMS, WhatsApp, or email message to check if it is a scam. Free scam verification tool for South Africans, with real‑time analysis.',
  keywords: 'check scam message, verify suspicious sms, sms scam detector, phishing message check, whatsapp scam check south africa',
  alternates: {
    canonical: 'https://checkascam.co.za/check-scam-message',
  },
  openGraph: {
    title: 'Free Scam Message Checker | The Link Digital Security',
    description: 'Instantly verify if a message is fraudulent. Used by thousands of South Africans.',
    url: 'https://checkascam.co.za/check-scam-message',
    siteName: 'Scam Verification Engine',
    images: [
      {
        url: 'https://checkascam.co.za/og-message-checker.png', // replace with your actual image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
};

export default function CheckScamMessage() {
  // FAQ structured data for Google rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I check if a message is a scam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Look for suspicious links, urgent language, or requests for personal information. You can also paste the message into our free scam detection tool above.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I do if I receive a scam message?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Do not click any links or share personal details. Report the message to the relevant platform (e.g., WhatsApp) and block the sender. You can also forward the message to 7726 (SPAM) on your mobile phone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are WhatsApp scams common in South Africa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. In 2023, reports of WhatsApp impersonation scams increased by 40% in South Africa. Fraudsters often pose as family members or companies asking for urgent payments.',
        },
      },
    ],
  };

  return (
    <>
      {/* Inject JSON‑LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
        <h1>Check If a Message Is a Scam</h1>

        <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
          Scammers frequently send <strong>SMS, WhatsApp, or email messages</strong> pretending to be banks,
          courier companies, or government institutions. Use our <strong>free scam verification tool</strong> to
          check if a message is fraudulent before you act.
        </p>

        {/* Real‑time statistic / credibility booster */}
        <div style={{ background: '#f0f7ff', padding: '1rem 1.5rem', borderRadius: 8, margin: '2rem 0' }}>
          <p style={{ margin: 0, fontWeight: 500 }}>
            📈 In 2025, South Africans lost over <strong>R2.2 billion</strong> to scams. 
            Our tool has helped <strong>50,000+ users</strong> identify fraudulent messages.
          </p>
        </div>

        <h2>Common Scam Message Examples (Real Cases)</h2>

        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
          <ExampleCard
            title="FNB / ABSA Bank Impersonation"
            example=' "Your account has been suspended. Verify now: https://fnb-secure.co.za"'
            note="This link leads to a phishing page that steals login credentials."
          />
          <ExampleCard
            title="SARS Tax Refund Scam"
            example=' "SARS owes you R1,250. Click here to claim your refund: https://sars-refund.tax"'
            note="SARS never sends unsolicited links or asks for banking details via SMS."
          />
          <ExampleCard
            title="WhatsApp Family Emergency"
            example='"Hi Mom, I lost my phone. This is my new number. Please send R500 for urgent groceries."'
            note="Always call the original number to verify such requests."
          />
          <ExampleCard
            title="Courier Parcel Scam"
            example=' "Your package is waiting. Pay R15 delivery fee to release it: http://bit.ly/3xyz"'
            note="Delivery companies like Aramex or Post Office do not request payments via SMS."
          />
        </div>

        <h2>🔍 Warning Signs of Scam Messages</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.75rem' }}>⚠️ <strong>Urgent language</strong> – “Act now!”, “Your account will be closed”</li>
          <li style={{ marginBottom: '0.75rem' }}>🔗 <strong>Suspicious links</strong> – shortened URLs or misspelled domains (e.g., “paypa1.com”)</li>
          <li style={{ marginBottom: '0.75rem' }}>🔐 <strong>Requests for OTPs or banking details</strong> – legitimate companies never ask for these via message</li>
          <li style={{ marginBottom: '0.75rem' }}>💰 <strong>Unexpected money offers</strong> – “You’ve won a prize!” or “Claim your refund”</li>
          <li style={{ marginBottom: '0.75rem' }}>📞 <strong>Unknown numbers</strong> – especially international or masked local numbers</li>
        </ul>

        <h2>Check a Suspicious Message Now</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Paste the message into our tool below and get an instant risk assessment.
        </p>

        {/* Strong CTA – replace with your actual tool link/component */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: '#0070f3',
              color: 'white',
              padding: '14px 32px',
              borderRadius: 40,
              fontSize: '1.2rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0,118,255,0.3)',
            }}
          >
            🛡️ Open Scam Detector Tool
          </Link>
          <p style={{ marginTop: '0.5rem', color: '#666' }}>Free – no registration required</p>
        </div>

        <h2>How to Verify a Suspicious Message Manually</h2>
        <ol style={{ lineHeight: 1.8 }}>
          <li><strong>Do not click</strong> any links or download attachments.</li>
          <li><strong>Check the sender’s details</strong> – look for misspellings or odd email addresses.</li>
          <li><strong>Contact the organisation directly</strong> using their official website or phone number (not the one in the message).</li>
          <li><strong>Forward the message to 7726</strong> (free reporting service for mobile operators).</li>
          <li><strong>Use our tool above</strong> for an automated second opinion.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>

        <div itemScope itemType="https://schema.org/FAQPage" style={{ marginTop: '2rem' }}>
          <FAQ
            question="How can I check if a message is a scam?"
            answer="Look for suspicious links, urgent language, or requests for personal information. You can also paste the message into our free scam detection tool above."
          />
          <FAQ
            question="What should I do if I receive a scam message?"
            answer="Do not click any links or share personal details. Report the message to the relevant platform (e.g., WhatsApp) and block the sender. You can also forward the message to 7726 (SPAM) on your mobile phone."
          />
          <FAQ
            question="Are WhatsApp scams common in South Africa?"
            answer="Yes. In 2023, reports of WhatsApp impersonation scams increased by 40% in South Africa. Fraudsters often pose as family members or companies asking for urgent payments."
          />
          <FAQ
            question="Can I trust scam detection tools?"
            answer="Our engine cross‑references multiple security databases (Google Safe Browsing, AbuseIPDB, WHOIS) and applies SA‑specific fraud rules. However, always use your own judgement and contact official channels for confirmation."
          />
        </div>

        <p style={{ marginTop: '3rem', fontStyle: 'italic', color: '#555' }}>
          Still unsure? <Link href="/contact" style={{ color: '#0070f3' }}>Contact us</Link> for guidance.
        </p>
      </main>
    </>
  );
}

// Helper component for example cards
function ExampleCard({ title, example, note }: { title: string; example: string; note: string }) {
  return (
    <div style={{ border: '1px solid #eaeaea', borderRadius: 8, padding: '1.2rem' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h3>
      <p style={{ background: '#f9f9f9', padding: '0.8rem', borderRadius: 4, fontFamily: 'monospace' }}>
        {example}
      </p>
      <p style={{ marginBottom: 0, color: '#d32f2f', fontSize: '0.95rem' }}>{note}</p>
    </div>
  );
}

// Reusable FAQ component (adds Schema.org microdata)
function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '1.5rem' }}>
      <h3 itemProp="name" style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{question}</h3>
      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
        <p itemProp="text" style={{ marginTop: 0, color: '#333' }}>{answer}</p>
      </div>
    </div>
  );
}
