"use client";

import { useState } from "react";
import type { AnalyzeResponse } from "./lib/types";

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function scan() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Scam Verification Tool</h1>
      <p>Check websites, phone numbers, emails, or messages for scams.</p>

      <div className="card">
        <input
          placeholder="Enter website, phone number, email or message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="primary" onClick={scan}>
          {loading ? "Scanning..." : "Scan for Free"}
        </button>
      </div>

      {result && (
        <>
          <div className="card">
            <span className={`badge ${result.riskLevel}`}>
              {result.riskLevel.toUpperCase()}
            </span>
            <h2>Risk Score: {result.score}/100</h2>
            <p>{result.explanation}</p>
          </div>

          {result.bankWarning && (
            <div className="card">
              <strong>⚠ {result.bankWarning.bank} Warning</strong>
              <p>{result.bankWarning.message}</p>
            </div>
          )}

          <div className="card">
            <p>👥 {result.community.reportCount} community reports</p>
          </div>

          {result.screenshotUrl && (
            <div className="card">
              <h3>Website Snapshot</h3>
              <img
                src={result.screenshotUrl}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          )}

          <div className="card">
            <h3>Protect Yourself</h3>
            <button className="primary">
              Run Digital Footprint Scan
            </button>
            <br /><br />
            <button className="secondary">
              Learn about LinkSure Protection
            </button>
          </div>
        </>
      )}
    </div>
  );
}
