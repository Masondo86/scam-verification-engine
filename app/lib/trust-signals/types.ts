// app/lib/trust-signals/types.ts

export interface PresenceSignal {
  platform: string;       // e.g., "github", "linkedin"
  found: boolean;
  confidence: number;     // 0–100 (how certain we are)
  profileUrl?: string;    // optional – the URL we checked
  error?: string;         // optional – if something went wrong
}

export interface PresenceRequest {
  username: string;
  platforms?: string[];   // if omitted, check all defined
}

export interface PresenceResponse {
  username: string;
  signals: PresenceSignal[];
  foundCount: number;
  checkedCount: number;
}
