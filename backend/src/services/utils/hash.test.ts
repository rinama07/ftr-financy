import { beforeEach, describe, expect, it, vi } from "vitest";
import { getHashPassword, verifyPassword } from "./hash";

const mocks = vi.hoisted(() => ({
  genSalt: vi.fn<(rounds?: number) => Promise<string>>(),
  hash: vi.fn<(password: string, salt: string) => Promise<string>>(),
  compare: vi.fn<(password: string, hash: string) => Promise<boolean>>(),
}));

vi.mock("bcryptjs", () => ({
  default: {
    genSalt: mocks.genSalt,
    hash: mocks.hash,
    compare: mocks.compare,
  },
}));

describe("hash", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getHashPassword", () => {
    it("should generate a salt with 10 rounds and hash the password", async () => {
      mocks.genSalt.mockResolvedValue("salt");
      mocks.hash.mockResolvedValue("hashed-password");

      const result = await getHashPassword("plain-password");

      expect(mocks.genSalt).toHaveBeenCalledWith(10);
      expect(mocks.hash).toHaveBeenCalledWith("plain-password", "salt");
      expect(result).toBe("hashed-password");
    });

    it("should propagate the error when salt generation fails", async () => {
      mocks.genSalt.mockRejectedValue(new Error("salt generation failed"));

      await expect(getHashPassword("plain-password")).rejects.toThrow(
        "salt generation failed",
      );

      expect(mocks.hash).not.toHaveBeenCalled();
    });

    it("should propagate the error when password hashing fails", async () => {
      mocks.genSalt.mockResolvedValue("salt");
      mocks.hash.mockRejectedValue(new Error("hashing failed"));

      await expect(getHashPassword("plain-password")).rejects.toThrow(
        "hashing failed",
      );
    });
  });

  describe("verifyPassword", () => {
    it("should return true when the password matches the hash", async () => {
      mocks.compare.mockResolvedValue(true);

      const result = await verifyPassword("plain-password", "hashed-password");

      expect(mocks.compare).toHaveBeenCalledWith(
        "plain-password",
        "hashed-password",
      );
      expect(result).toBe(true);
    });

    it("should return false when the password does not match the hash", async () => {
      mocks.compare.mockResolvedValue(false);

      const result = await verifyPassword("wrong-password", "hashed-password");

      expect(mocks.compare).toHaveBeenCalledWith(
        "wrong-password",
        "hashed-password",
      );
      expect(result).toBe(false);
    });

    it("should propagate the error when password comparison fails", async () => {
      mocks.compare.mockRejectedValue(new Error("comparison failed"));

      await expect(
        verifyPassword("plain-password", "hashed-password"),
      ).rejects.toThrow("comparison failed");

      expect(mocks.compare).toHaveBeenCalledWith(
        "plain-password",
        "hashed-password",
      );
    });
  });
});
