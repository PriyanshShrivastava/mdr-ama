import { afterEach, describe, expect, it, vi } from "vitest";
import { estimateStandardMdr } from "./rules";

describe("MDR rule display", () => {
  afterEach(() => vi.useRealTimers());

  it("shows zero below the documented threshold and calculates above it", () => {
    vi.setSystemTime(new Date("2026-09-20T00:00:00Z"));
    expect(estimateStandardMdr(200000)).toContain("₹0.00");
    expect(estimateStandardMdr(500000)).toContain("₹20.00");
    expect(estimateStandardMdr(10000000)).toContain("₹300.00");
  });

  it("stops showing stale estimates after the review date", () => {
    vi.setSystemTime(new Date("2026-11-16T00:00:00Z"));
    expect(estimateStandardMdr(500000)).toMatch(/revalidation/);
  });
});
