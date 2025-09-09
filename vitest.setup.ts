import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("next/font/google", () => ({
  Roboto: vi.fn(() => ({
    className: "roboto-mock",
    style: { fontFamily: "Roboto, sans-serif" },
  })),
  Roboto_Condensed: vi.fn(() => ({
    className: "roboto-condensed-mock",
    style: { fontFamily: "Roboto Condensed, sans-serif" },
  })),
}));
