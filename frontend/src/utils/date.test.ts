import { describe, expect, it } from "vitest";

import { formatDate } from "./date";

describe("formatDate", () => {
  it("should format a date as DD/MM/YY", () => {
    expect(formatDate("2026-09-15T12:00:00")).toBe("15/09/26");
  });

  it("should pad single-digit days with a leading zero", () => {
    expect(formatDate("2026-09-05T12:00:00")).toBe("05/09/26");
  });

  it("should pad single-digit months with a leading zero", () => {
    expect(formatDate("2026-01-15T12:00:00")).toBe("15/01/26");
  });

  it("should format the first day of the year correctly", () => {
    expect(formatDate("2026-01-01T12:00:00")).toBe("01/01/26");
  });

  it("should format the last day of the year correctly", () => {
    expect(formatDate("2026-12-31T12:00:00")).toBe("31/12/26");
  });

  it("should format leap day correctly", () => {
    expect(formatDate("2028-02-29T12:00:00")).toBe("29/02/28");
  });

  it("should format dates from previous years correctly", () => {
    expect(formatDate("2025-06-20T12:00:00")).toBe("20/06/25");
  });

  it("should format dates from future years correctly", () => {
    expect(formatDate("2030-11-10T12:00:00")).toBe("10/11/30");
  });

  it("should throw when the date is invalid", () => {
    expect(() => formatDate("invalid-date")).toThrow();
  });
});
