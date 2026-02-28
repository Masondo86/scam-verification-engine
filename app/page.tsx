"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!text) return;
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e1b4b,#000000)",
        color: "white",
        padding: "60px 20px",
        fontFamily: "sans-serif"
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p style={{
          display: "inline-block",
          padding: "6px 14px",
          background: "#1e293b",
          borderRadius: 20,
          fontSize: 14,
          marginBottom: 20
        }}>
          Trusted by South Africans
        </p>

        <h1 style={{ fontSize: 48, marginBottom: 20 }}>
          Verify Scams <br />
          <span style={{ color: "#a78bfa" }}>In Seconds</span>
        </h1>

        <p style={{ opacity: 0.8, marginBottom: 40 }}>
          Free scam verification for URLs, phone numbers, emails, and messages.
        </p>

        <div style={{
          background: "#111827",
          padding: 30,
          borderRadius: 12,
          maxWidth: 700,
          margin: "0 auto"
        }}>
          <textarea
            rows={5}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "none",
              resize: "vertical",
              marginBottom: 15
            }}
            placeholder="Paste suspicious message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={analyze}
            disabled={loading}
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              border: "none",
              background: "#8b5cf6",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%"
            }}
          >
            {loading ? "Analyzing..." : "Start Free Scan"}
          </button>

          {result && (
            <div style={{ marginTop: 25, textAlign: "left" }}>
              <h3>Result</h3>
              <p><strong>Risk Score:</strong> {result.riskScore}</p>
              <p><strong>Verdict:</strong> {result.verdict}</p>
              {result.matchedScams?.length > 0 && (
                <p><strong>Matched:</strong> {result.matchedScams.join(", ")}</p>
              )}
            </div>
          )}
        </div>

        <div style={{
          marginTop: 60,
          display: "flex",
          justifyContent: "space-around",
          opacity: 0.7
        }}>
          <div>
            <h2>100%</h2>
            <p>Free Forever</p>
          </div>
          <div>
            <h2>R2.2B</h2>
            <p>Lost to Scams (2023)</p>
          </div>
          <div>
            <h2>24/7</h2>
            <p>Real-Time Protection</p>
          </div>
        </div>
      </div>
    </main>
  );
}
