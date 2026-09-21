import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CreateSessionForm } from "./CreateSessionForm";

describe("CreateSessionForm", () => {
  it("shows the payment plan as values change", () => {
    render(<CreateSessionForm/>);
    fireEvent.change(screen.getByLabelText("Bill amount (₹)"), { target: { value: "5000" } });
    fireEvent.change(screen.getByLabelText("Maximum payment step (₹)"), { target: { value: "1999" } });
    expect(screen.getByText("3 steps")).toBeVisible();
    expect(screen.getAllByText(/₹/).length).toBeGreaterThan(2);
  });

  it("owns validation and preserves entered values", () => {
    render(<CreateSessionForm/>);
    const upi = screen.getByLabelText("Merchant UPI ID");
    fireEvent.change(upi, { target: { value: "invalid" } });
    fireEvent.submit(screen.getByRole("button", { name: /Create and show master QR/ }).closest("form")!);
    expect(screen.getByText(/Enter a valid UPI ID/)).toBeVisible();
    expect(upi).toHaveValue("invalid");
  });

  it("rejects plans above the session limit", () => {
    render(<CreateSessionForm/>);
    fireEvent.change(screen.getByLabelText("Bill amount (₹)"), { target: { value: "5000" } });
    fireEvent.change(screen.getByLabelText("Maximum payment step (₹)"), { target: { value: "100" } });
    expect(screen.getByText(/sessions are limited to 25 payment steps/)).toBeVisible();
  });
});
