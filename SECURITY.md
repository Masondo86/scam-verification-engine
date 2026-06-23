Security Policy

We take the security of the Scam Verification Engine seriously and welcome responsible disclosure of security vulnerabilities.

Supported Versions

Security updates are applied to the latest production branch of this repository.

Older versions, forks, or unofficial deployments may not receive security updates.

Reporting a Vulnerability

If you believe you have discovered a security vulnerability, please do not open a public issue.

Instead, report it responsibly via:

Email: security@yourdomain.za

Please include:

A clear description of the issue

Steps to reproduce (if applicable)

Potential impact assessment

Any proof-of-concept (where safe to share)

Disclosure Process

Reports are acknowledged within 5 business days

Valid vulnerabilities are investigated and remediated

Coordinated disclosure timelines will be discussed where appropriate

We appreciate responsible security research that helps protect the public.

## Data Minimization for Waitlist

The waitlist feature for the Digital Footprint Scanner follows strict data minimization principles:

- **No personal data stored beyond email address** – we do not store ID numbers, phone numbers, addresses, or any other personal identifiers
- **Supabase RLS (Row Level Security)** – the `waitlist` table is protected with Row Level Security policies
- **Service role only access** – only the backend service role (via `/api/waitlist`) can write to the table
- **No public access** – anonymous and authenticated users cannot directly access the waitlist table
- **Encryption at rest** – all data is encrypted using Supabase's built-in encryption
- **Data retention** – email records are kept until the scanner launches or the user requests deletion

Scope

This policy applies to:

The Scam Verification Engine source code

Official deployments operated by the maintainers

It does not apply to:

Third-party services or integrations

User-generated content

External websites or platforms assessed by the tool
