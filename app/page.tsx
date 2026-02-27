"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <main style={{ maxWidth: 600, margin: "50px auto" }}>
      <h1>Scam Detector</h1>

      <textarea
        rows={6}
        style={{ width: "100%" }}
        placeholder="Paste suspicious message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={analyze} style={{ marginTop: 10 }}>
        Analyze
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Result</h2>
          <p><strong>Risk Score:</strong> {result.riskScore}</p>
          <p><strong>Verdict:</strong> {result.verdict}</p>
          {result.matchedScams?.length > 0 && (
            <p><strong>Matched:</strong> {result.matchedScams.join(", ")}</p>
          )}
        </div>
      )}
    </main>
  );
}
