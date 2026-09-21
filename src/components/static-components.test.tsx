import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedPanel } from "./AnimatedPanel";
import { Footer } from "./Footer";
import { Landing } from "./Landing";
import { SecondaryNav } from "./SecondaryNav";
import { SecurityBanner } from "./SecurityBanner";

describe("shared interface components", () => {
  it("renders the safety message", () => {
    render(<SecurityBanner/>);
    expect(screen.getByText(/Keep your PIN private/)).toBeVisible();
  });

  it("renders policy navigation", () => {
    render(<Footer/>);
    expect(screen.getByRole("link", { name: "Rules" })).toHaveAttribute("href", "/rules");
    expect(screen.getByRole("link", { name: "Security" })).toHaveAttribute("href", "/security");
  });

  it("renders consistent secondary navigation", () => {
    render(<SecondaryNav label="Home"/>);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /Create QR/ })).toHaveAttribute("href", "/create");
  });

  it("renders animated content without hiding its semantics", () => {
    render(<AnimatedPanel><h2>Policy content</h2></AnimatedPanel>);
    expect(screen.getByRole("heading", { name: "Policy content" })).toBeVisible();
  });

  it("renders the landing page's primary journeys", () => {
    render(<Landing/>);
    expect(screen.getByRole("heading", { name: /UPI payments/ })).toBeVisible();
    expect(screen.getByRole("link", { name: /Create a master QR/ })).toHaveAttribute("href", "/create");
    expect(screen.getByText(/No payment processing/)).toBeVisible();
  });
});
