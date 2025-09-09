import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { format } from "date-fns";
import { formatDateString, formatNowString } from "./dates";
import { DATE_GLOBAL_FORMAT, DATE_GLOBAL_LOCALE } from "./dates";

vi.mock("date-fns", async (importOriginal) => {
  const actual = await importOriginal<typeof import("date-fns")>();
  return {
    ...actual,
    format: vi.fn(),
  };
});

const mockFormat = vi.mocked(format);

describe("formatDateString", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should format a valid Date object with default format", () => {
    const testDate = new Date("2023-12-25");
    const expectedOutput = "25/12/2023";

    mockFormat.mockReturnValue(expectedOutput);

    const result = formatDateString(testDate);

    expect(mockFormat).toHaveBeenCalledWith(testDate, DATE_GLOBAL_FORMAT, {
      locale: DATE_GLOBAL_LOCALE,
    });
    expect(result).toBe(expectedOutput);
  });

  it("should format a valid Date object with custom format", () => {
    const testDate = new Date("2023-12-25");
    const customFormat = "yyyy-MM-dd";
    const expectedOutput = "2023-12-25";

    mockFormat.mockReturnValue(expectedOutput);

    const result = formatDateString(testDate, customFormat);

    expect(mockFormat).toHaveBeenCalledWith(testDate, customFormat, {
      locale: DATE_GLOBAL_LOCALE,
    });
    expect(result).toBe(expectedOutput);
  });

  it("should handle undefined input gracefully", () => {
    const undefinedDate = undefined as any;

    mockFormat.mockImplementation(() => {
      throw new Error("Invalid date");
    });

    const result = formatDateString(undefinedDate);

    expect(console.error).toHaveBeenCalledWith(
      "Invalid date:",
      undefinedDate,
      expect.any(Error),
    );
    expect(result).toBe("");
  });

  it("should handle and empty string input", () => {
    const emptyString = "";

    mockFormat.mockImplementation(() => {
      throw new Error("Invalid date");
    });

    const result = formatDateString(emptyString);

    expect(console.error).toHaveBeenCalledWith(
      "Invalid date:",
      emptyString,
      expect.any(Error),
    );
    expect(result).toBe("");
  });
});

describe("formatNowString", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-15T10:30:00.000Z"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("should format current date with default format", () => {
    const expectedOutput = "15/01/2024";
    const expectedDate = new Date("2024-01-15T10:30:00.000Z");

    mockFormat.mockReturnValue(expectedOutput);

    const result = formatNowString();

    expect(mockFormat).toHaveBeenCalledWith(expectedDate, DATE_GLOBAL_FORMAT, {
      locale: DATE_GLOBAL_LOCALE,
    });
    expect(result).toBe(expectedOutput);
  });
  it("should format current date with custom format", () => {
    const customFormat = "yyyy-MM-dd HH:mm";
    const expectedOutput = "2024-01-15 10:30";
    const expectedDate = new Date("2024-01-15T10:30:00.000Z");

    mockFormat.mockReturnValue(expectedOutput);

    const result = formatNowString(customFormat);

    expect(mockFormat).toHaveBeenCalledWith(expectedDate, customFormat, {
      locale: DATE_GLOBAL_LOCALE,
    });
    expect(result).toBe(expectedOutput);
  });

  it("should handle format errors gracefully", () => {
    const customFormat = "invalid-format";
    const error = new Error("Invalid format pattern");

    mockFormat.mockImplementation(() => {
      throw error;
    });

    const result = formatNowString(customFormat);

    expect(console.error).toHaveBeenCalledWith("Invalid date:", "now", error);
    expect(result).toBe("");
  });

  it("should handle date-fns format function throwing an error", () => {
    const error = new Error("date-fns format error");

    mockFormat.mockImplementation(() => {
      throw error;
    });

    const result = formatNowString();

    expect(console.error).toHaveBeenCalledWith("Invalid date:", "now", error);
    expect(result).toBe("");
  });
});
