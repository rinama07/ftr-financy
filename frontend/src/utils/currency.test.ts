import { describe, expect, it } from "vitest";

import { formatCurrency } from "./currency";

describe("formatCurrency", () => {
  const currencySpace = "\u00a0";

  it("should format a positive integer as Brazilian currency", () => {
    expect(formatCurrency(1000)).toBe(`R$${currencySpace}1.000,00`);
  });

  it("should format a positive decimal value as Brazilian currency", () => {
    expect(formatCurrency(1234.56)).toBe(`R$${currencySpace}1.234,56`);
  });

  it("should format zero as Brazilian currency", () => {
    expect(formatCurrency(0)).toBe(`R$${currencySpace}0,00`);
  });

  it("should format a negative value as Brazilian currency", () => {
    expect(formatCurrency(-1234.56)).toBe(`-R$${currencySpace}1.234,56`);
  });

  it("should format a value with more than two decimal places using two decimal places", () => {
    expect(formatCurrency(1234.567)).toBe(`R$${currencySpace}1.234,57`);
  });

  it("should format a small decimal value with leading zero", () => {
    expect(formatCurrency(0.5)).toBe(`R$${currencySpace}0,50`);
  });

  it("should format a large value with thousand separators", () => {
    expect(formatCurrency(1234567890.99)).toBe(
      `R$${currencySpace}1.234.567.890,99`,
    );
  });
});
