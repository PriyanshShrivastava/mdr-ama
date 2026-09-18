export type Paise = number;

export function parseRupeesToPaise(value: string): Paise {
  const normalized = value.trim().replace(/,/g, "");
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) throw new Error("Enter a positive amount with at most two decimals.");
  const [whole, decimal = ""] = normalized.split(".");
  const paise = Number(whole) * 100 + Number(decimal.padEnd(2, "0"));
  if (!Number.isSafeInteger(paise) || paise <= 0) throw new Error("Enter a positive amount.");
  return paise;
}

export function formatPaise(paise: Paise): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(paise / 100);
}

export function upiAmount(paise: Paise): string {
  return `${Math.floor(paise / 100)}.${String(paise % 100).padStart(2, "0")}`;
}

export function splitIntoChunks(total: Paise, maximum: Paise): Paise[] {
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(maximum) || total <= 0 || maximum <= 0) throw new Error("Invalid payment plan.");
  const chunks: Paise[] = [];
  for (let remaining = total; remaining > maximum; remaining -= maximum) chunks.push(maximum);
  chunks.push(total - chunks.reduce((sum, chunk) => sum + chunk, 0));
  if (chunks.length > 25) throw new Error("This bill would require more than 25 separate payments. OneQR does not support sessions this large.");
  if (chunks.reduce((sum, chunk) => sum + chunk, 0) !== total) throw new Error("Payment request could not be safely generated.");
  return chunks;
}
