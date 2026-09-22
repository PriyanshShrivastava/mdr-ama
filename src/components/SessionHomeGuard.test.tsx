import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { SessionHomeGuard } from "./SessionHomeGuard";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
});

describe("SessionHomeGuard", () => {
  it("opens a named modal and focuses the safe action", () => {
    render(<SessionHomeGuard />);

    fireEvent.click(screen.getByRole("button", { name: /mdr-ama/i }));

    expect(screen.getByRole("dialog", { name: "Leave this payment session?" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Stay in session" })).toHaveFocus();
  });

  it("stays in the session and restores focus to the logo", () => {
    render(<SessionHomeGuard />);
    const logo = screen.getByRole("button", { name: /mdr-ama/i });

    fireEvent.click(logo);
    fireEvent.click(screen.getByRole("button", { name: "Stay in session" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(logo).toHaveFocus();
  });

  it("exposes a real Home link only after explicit confirmation", () => {
    render(<SessionHomeGuard />);

    fireEvent.click(screen.getByRole("button", { name: /mdr-ama/i }));
    const leave = screen.getByRole("link", { name: "Leave session" });

    expect(leave).toHaveAttribute("href", "/");
  });

  it("treats Escape as Stay and restores focus", () => {
    render(<SessionHomeGuard />);
    const logo = screen.getByRole("button", { name: /mdr-ama/i });

    fireEvent.click(logo);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(logo).toHaveFocus();
  });
});
