import jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { signJwt, verifyJwt, type JwtPayload } from "./jwt";

describe("jwt", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  describe("signJwt", () => {
    it("should sign a token using the configured secret", () => {
      const payload: JwtPayload = {
        id: "user-1",
        email: "user@example.com",
      };

      const signSpy = vi
        .spyOn(jwt, "sign")
        .mockReturnValue("signed-token" as never);

      const result = signJwt(payload);

      expect(signSpy).toHaveBeenCalledWith(payload, "test-secret", {});

      expect(result).toBe("signed-token");
    });

    it("should sign a token with the provided expiration time", () => {
      const payload: JwtPayload = {
        id: "user-1",
        email: "user@example.com",
      };

      const signSpy = vi
        .spyOn(jwt, "sign")
        .mockReturnValue("signed-token" as never);

      const result = signJwt(payload, "15m");

      expect(signSpy).toHaveBeenCalledWith(payload, "test-secret", {
        expiresIn: "15m",
      });

      expect(result).toBe("signed-token");
    });

    it("should propagate the error when token signing fails", () => {
      vi.spyOn(jwt, "sign").mockImplementation(() => {
        throw new Error("signing failed");
      });

      expect(() =>
        signJwt({
          id: "user-1",
          email: "user@example.com",
        }),
      ).toThrow("signing failed");
    });
  });

  describe("verifyJwt", () => {
    it("should verify a token using the configured secret", () => {
      const payload: JwtPayload = {
        id: "user-1",
        email: "user@example.com",
      };

      const verifySpy = vi
        .spyOn(jwt, "verify")
        .mockReturnValue(payload as never);

      const result = verifyJwt("token");

      expect(verifySpy).toHaveBeenCalledWith("token", "test-secret");

      expect(result).toEqual(payload);
    });

    it("should propagate the error when the token is invalid", () => {
      vi.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error("invalid token");
      });

      expect(() => verifyJwt("invalid-token")).toThrow("invalid token");
    });
  });
});
