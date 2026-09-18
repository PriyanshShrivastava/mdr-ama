import { describe, expect, it } from "vitest";
import { buildUpiUri, parseMerchantUpiQr } from "./upi";
describe("UPI",()=>{it("whitelists merchant QR fields",()=>{const result=parseMerchantUpiQr("upi://pay?pa=shop%40upi&pn=Shop&am=2");expect(result.dynamic).toBe(true);expect(result.merchant).toMatchObject({pa:"shop@upi",pn:"Shop"});});it("generates an encoded URI",()=>{const uri=buildUpiUri({pa:"shop@upi",pn:"A & B",source:"manual"},200000,0,1,"123");expect(uri).toContain("am=2000.00");expect(uri).toContain("pn=A+%26+B");expect(uri).toContain("tr=123");});});
