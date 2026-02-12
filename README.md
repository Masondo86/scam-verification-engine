Scam Verification Engine
The Link Digital Security

A South Africa–focused scam verification and consumer education platform designed to help individuals identify potential fraud, phishing, impersonation, and social engineering attacks before financial harm occurs.

🌐 Live Site: https://checkascam.co.za

📧 Contact: admin@checkascam.co.za

Overview

The Scam Verification Engine is a public-facing fraud prevention tool built to:

Analyze suspicious URLs, domains, phone numbers, and messages

Detect common South African banking impersonation patterns

Identify social engineering indicators

Cross-reference known scam intelligence

Provide risk scoring with explanatory context

The system is designed as a prevention layer, not a replacement for banks, law enforcement, or regulatory authorities.

Mission

To reduce scam-related financial harm in South Africa by:

Encouraging pause-and-verify behavior

Increasing public awareness of scam psychology

Supporting national fraud prevention efforts

Complementing initiatives led by SABRIC, FIC, and financial institutions

Key Features
1. Risk Scoring Engine

Domain age analysis

Blacklist checks

Social engineering pattern detection

Community abuse signals

Bank impersonation detection (South Africa–specific)

2. Known Scam Detection

Pattern-based matching against documented scam campaigns

Structured warning output

Severity classification

3. South Africa Banking Fraud Rules

SIM-swap fraud detection signals

Instant money scam indicators

Bank impersonation pattern matching

4. Social Engineering Analysis

Urgency triggers

Authority impersonation

Scarcity pressure tactics

Psychological persuasion signals

5. Security & Abuse Protection

Rate limiting

API key management

Secure environment variables

Abuse intelligence checks

Technology Stack

Next.js (App Router)

TypeScript

Tailwind CSS

Vercel Deployment

WHOIS lookup service

Safe Browsing API

Abuse intelligence integration

Repository Structure
app/
  api/analyze/route.ts
  data/known-scams.ts
  services/
    abuseipdb.ts
    safebrowsing.ts
    scoring.ts
    socialengineering.ts
    whois.ts
    zaBankRules.ts
  privacy/page.tsx
  how-scams-work/page.tsx
  whatsapp-scams/page.tsx

Compliance & Legal Alignment

The platform is designed in alignment with:

Protection of Personal Information Act (POPIA), Act 4 of 2013

South African fraud prevention best practices

Responsible disclosure principles

We do not collect:

Banking credentials

Passwords

OTPs

Identity numbers

Only minimal technical metadata is processed for risk analysis purposes.

See: /privacy

Intended Use

This tool is intended for:

Public scam awareness

Fraud prevention education

Risk signal identification

Community awareness

It is not:

A law enforcement database

A financial advisory service

A replacement for bank fraud departments

Responsible Disclosure

If you identify:

A security vulnerability

False positive scam detection

Abuse of the system

Please contact:

admin@checkascam.co.za

Contribution Guidelines

At this stage, the repository is maintained privately by The Link Digital Security.

Future collaboration opportunities may include:

Academic fraud research

Regulatory integration

Banking sector partnerships

Telco fraud awareness collaboration

Roadmap

Expanded scam intelligence database

Telco scam pattern detection

Enhanced abuse signal aggregation

Regulator partnership integrations

Public API access (future consideration)

About The Link Digital Security

The Link Digital Security is a South Africa–focused digital risk and fraud prevention initiative dedicated to reducing scam-related harm through technology, education, and strategic partnerships.

License

This project is protected under the included LICENSE file.
All rights reserved unless otherwise stated.
