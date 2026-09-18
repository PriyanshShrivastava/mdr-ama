import { Merchant } from "./upi";

export const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
export type PaymentSessionV1 = { version: 1; merchant: Merchant; invoice: { totalPaise: number; note?: string }; chunksPaise: number[]; createdAt: number; expiresAt: number; sessionId: string };

function base64urlEncode(value: string) { return btoa(unescape(encodeURIComponent(value))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""); }
function base64urlDecode(value: string) { return decodeURIComponent(escape(atob(value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4)))); }
function checksum(value: string) { let hash = 2166136261; for (const char of value) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619); return (hash >>> 0).toString(36); }

export function encodeSession(session: PaymentSessionV1): string { const body = base64urlEncode(JSON.stringify(session)); return `${body}.${checksum(body)}`; }
export function decodeSession(payload: string): PaymentSessionV1 {
  const [body, check] = payload.split(".");
  if (!body || !check || checksum(body) !== check) throw new Error("This payment session could not be safely decoded. Ask the merchant to create a new one.");
  try {
    const value = JSON.parse(base64urlDecode(body)) as PaymentSessionV1;
    if (value.version !== 1 || !value.merchant?.pa || !Array.isArray(value.chunksPaise) || value.chunksPaise.length === 0) throw new Error();
    if (Date.now() > value.expiresAt) throw new Error("This payment session has expired. Ask the merchant to create a new one.");
    if (value.chunksPaise.reduce((sum, chunk) => sum + chunk, 0) !== value.invoice.totalPaise) throw new Error();
    return value;
  } catch (error) { if (error instanceof Error && error.message.includes("expired")) throw error; throw new Error("This payment session could not be safely decoded. Ask the merchant to create a new one."); }
}
