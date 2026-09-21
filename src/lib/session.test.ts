import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { decodeSession, encodeSession, PaymentSessionV1, SESSION_TTL_MS } from "./session";

const now = new Date("2026-09-20T12:00:00.000Z").getTime();
const session = (overrides: Partial<PaymentSessionV1> = {}): PaymentSessionV1 => ({
  version: 1,
  merchant: { pa: "shop@upi", pn: "Shop", source: "manual" },
  invoice: { totalPaise: 420000 },
  chunksPaise: [200000, 200000, 20000],
  createdAt: now,
  expiresAt: now + SESSION_TTL_MS,
  sessionId: "session-1",
  ...overrides,
});

describe("payment sessions", () => {
  beforeEach(() => vi.setSystemTime(now));
  afterEach(() => vi.useRealTimers());

  it("round-trips a valid session", () => {
    expect(decodeSession(encodeSession(session()))).toEqual(session());
  });

  it("rejects tampered, malformed, and inconsistent payloads", () => {
    const payload = encodeSession(session());
    expect(() => decodeSession(`${payload}x`)).toThrow(/safely decoded/);
    expect(() => decodeSession("not-a-session")).toThrow(/safely decoded/);
    expect(() => decodeSession(encodeSession(session({ chunksPaise: [1] })))).toThrow(/safely decoded/);
  });

  it("rejects expired sessions with a specific recovery message", () => {
    expect(() => decodeSession(encodeSession(session({ expiresAt: now - 1 })))).toThrow(/expired/);
  });
});
