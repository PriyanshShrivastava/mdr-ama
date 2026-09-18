import { Paise, upiAmount } from "./money";

export type Merchant = { pa: string; pn: string; mc?: string; source: "merchant_qr" | "manual" };

const cleanText = (value: string, max: number) => value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);

export function validateMerchant(input: Merchant): Merchant {
  const pa = cleanText(input.pa, 100).toLowerCase();
  const pn = cleanText(input.pn, 80);
  if (!/^[^\s@]+@[^\s@]+$/.test(pa)) throw new Error("Enter a valid UPI ID.");
  if (!pn) throw new Error("Enter the merchant name.");
  const mc = input.mc && /^\d{4}$/.test(input.mc) ? input.mc : undefined;
  return { pa, pn, mc, source: input.source };
}

export function parseMerchantUpiQr(raw: string): { merchant: Merchant; dynamic: boolean } {
  let url: URL;
  try { url = new URL(raw.trim()); } catch { throw new Error("We could not read a supported merchant UPI QR. Try a clearer image or enter the UPI ID manually."); }
  if (url.protocol !== "upi:" || url.hostname !== "pay") throw new Error("We could not read a supported merchant UPI QR. Try a clearer image or enter the UPI ID manually.");
  const merchant = validateMerchant({ pa: url.searchParams.get("pa") ?? "", pn: url.searchParams.get("pn") ?? "", mc: url.searchParams.get("mc") ?? undefined, source: "merchant_qr" });
  return { merchant, dynamic: Boolean(url.searchParams.get("am") || url.searchParams.get("tr") || url.searchParams.get("tid")) };
}

export function createAttemptReference(): string {
  const bytes = new Uint8Array(14);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => String(byte % 10)).join("");
}

export function buildUpiUri(merchant: Merchant, amount: Paise, index: number, count: number, reference = createAttemptReference()): string {
  const params = new URLSearchParams({ pa: merchant.pa, pn: merchant.pn, am: upiAmount(amount), cu: "INR", tn: `Partial payment ${index + 1} of ${count}`, tr: reference });
  if (merchant.mc) params.set("mc", merchant.mc);
  return `upi://pay?${params.toString()}`;
}
