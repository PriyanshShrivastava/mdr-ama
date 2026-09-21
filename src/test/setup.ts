import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const motion = new Proxy({}, {
    get: (_target, tag: string) => {
      const Component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
      const { children, initial, animate, transition, variants, whileInView, viewport, ...domProps } = props;
      void initial; void animate; void transition; void variants; void whileInView; void viewport;
      return React.createElement(tag, { ...domProps, ref }, children as React.ReactNode);
      });
      Component.displayName = `MotionMock(${tag})`;
      return Component;
    },
  });
  return { motion, useReducedMotion: () => false };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
});
