import { describe, expect, it } from "vitest";

import { getUserNameInitials } from "./user";

describe("getUserNameInitials", () => {
  it("should return an empty string when the user name is empty", () => {
    expect(getUserNameInitials("")).toBe("");
  });

  it("should return initials from a single name", () => {
    expect(getUserNameInitials("Marina")).toBe("M");
  });

  it("should return initials from the first two names", () => {
    expect(getUserNameInitials("Marina Silva")).toBe("MS");
  });

  it("should ignore additional names after the first two", () => {
    expect(getUserNameInitials("Marina Silva Costa")).toBe("MS");
  });

  it("should trim leading and trailing whitespace", () => {
    expect(getUserNameInitials("  Marina Silva  ")).toBe("MS");
  });

  it("should handle multiple spaces between names", () => {
    expect(getUserNameInitials("Marina    Silva")).toBe("MS");
  });

  it("should convert lowercase names to uppercase initials", () => {
    expect(getUserNameInitials("marina silva")).toBe("MS");
  });

  it("should handle a name with only whitespace", () => {
    expect(getUserNameInitials("   ")).toBe("");
  });

  it("should return the first letter of each of the first two names", () => {
    expect(getUserNameInitials("Maria Fernanda Oliveira")).toBe("MF");
  });

  it("should preserve accented characters in initials", () => {
    expect(getUserNameInitials("ágata Souza")).toBe("ÁS");
  });
});
