import { NextResponse } from "next/server";
import { rateLimit } from "../../lib/rateLimit";
import { whoisLookup } from "@/app/services/whois";
import { checkSafeBrowsing } from "@/app/services/safebrowsing";
import { detectZAFraud } from "@/app/services/zaBankRules";
import { calculateScore } from "@/app/services/scoring";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  const { success } = await rateLimit.limit(ip);
  if (!success) return new Response("Too many requests", { status: 429 });

  const { input, type } = await req.json();

  const whois = type === "url" ? await whoisLookup(input) : null;
  const blacklist = type === "url" ? await checkSafeBrowsing(input) : [];
  const social = detectZAFraud(input, input);

  const result = calculateScore({
    domainAge: whois?.domainAgeDays,
    blacklist: blacklist.length > 0,
    social: social.length,
  });

  return NextResponse.json({
    ...result,
    tech: whois,
    social: {
      summary:
        social.length > 0 ? `This scam uses ${social.join(", ")}` : "No manipulation patterns detected",
    },
    community: { count: 0 },
    nextSteps: [
      "Do not send money",
      "Contact your bank via official channels",
      "Run a full digital footprint scan",
    ],
  });
}
