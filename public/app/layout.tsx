scam-verification-engine/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # Vercel Edge/Node API
│   ├── services/
│   │   ├── abuseipdb.ts
│   │   ├── safebrowsing.ts
│   │   ├── whois.ts
│   │   ├── zaBankRules.ts
│   │   ├── socialEngineering.ts
│   │   ├── scoring.ts
│   │   └── playwright.ts
│   ├── lib/
│   │   ├── rateLimit.ts
│   │   └── types.ts
│   ├── page.tsx               # Main UI
│   ├── layout.tsx
│   └── globals.css
├── public/
│   └── logo.svg
├── .env.example
├── package.json
├── vercel.json
└── README.md
