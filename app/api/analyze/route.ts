import { NextResponse } from "next/server";
import { knownScams } from "@/lib/known-scams";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const lowerText = text.toLowerCase();

    let riskScore = 0;
    let matchedScams: string[] = [];

    for (const scam of knownScams) {
      for (const indicator of scam.indicators) {
        if (lowerText.includes(indicator)) {
          riskScore += 25;
          matchedScams.push(scam.name);
          break;
        }
      }
    }

    if (riskScore > 100) riskScore = 100;

    let verdict = "Safe";
    if (riskScore >= 70) verdict = "Likely Scam";
    else if (riskScore >= 30) verdict = "Suspicious";

    return NextResponse.json({
      riskScore,
      verdict,
      matchedScams
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
