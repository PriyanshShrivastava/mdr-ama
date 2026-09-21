import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { encodeSession, PaymentSessionV1 } from "@/lib/session";
import { PayerFlow } from "./PayerFlow";

vi.mock("qrcode", () => ({ default: { toDataURL: vi.fn().mockResolvedValue("data:image/png;base64,test") } }));

const validSession = ():PaymentSessionV1 => ({
  version:1,
  merchant:{pa:"shop@upi",pn:"Demo Store",source:"manual"},
  invoice:{totalPaise:200000},
  chunksPaise:[200000],
  createdAt:Date.now(),
  expiresAt:Date.now()+60_000,
  sessionId:"payer-flow-test",
});

describe("PayerFlow", () => {
  it("renders a decoded payment step and payer-reported completion", async () => {
    render(<PayerFlow payload={encodeSession(validSession())}/>);
    expect(await screen.findByRole("button", { name: /Pay ₹2,000.00 with UPI/ })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Yes, I completed it" }));
    expect(await screen.findByText(/All payment steps marked completed/)).toBeVisible();
    expect(localStorage.getItem("mdr-ama:payer-flow-test")).toContain("true");
  });

  it("shows recovery for an invalid payload", async () => {
    render(<PayerFlow payload="invalid"/>);
    expect(await screen.findByRole("heading", { name: "Session unavailable" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
  });

  it("generates the fallback QR for the current step", async () => {
    render(<PayerFlow payload={encodeSession(validSession())}/>);
    await screen.findByRole("button", { name: /Pay ₹2,000.00 with UPI/ });
    fireEvent.click(screen.getByText("Did the UPI app not open?"));
    await waitFor(() => expect(screen.getByAltText(/UPI QR/)).toHaveAttribute("src", "data:image/png;base64,test"));
  });
});
