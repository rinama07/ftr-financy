import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  userFindUnique: vi.fn(),
  userCreate: vi.fn(),
  getHashPassword: vi.fn(),
  verifyPassword: vi.fn(),
  signJwt: vi.fn(),
}));

vi.mock("../../prisma/prisma.js", () => ({
  prismaClient: {
    user: {
      findUnique: mocks.userFindUnique,
      create: mocks.userCreate,
    },
  },
}));

vi.mock("./utils/hash.js", () => ({
  getHashPassword: mocks.getHashPassword,
  verifyPassword: mocks.verifyPassword,
}));

vi.mock("./utils/jwt.js", () => ({
  signJwt: mocks.signJwt,
}));

import { AuthService } from "./auth.service";

describe("AuthService", () => {
  const service = new AuthService();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("logIn", () => {
    it("should log in an existing user with a valid password", async () => {
      const user = {
        id: "user-1",
        email: "john@example.com",
        name: "John",
        password: "hashed-password",
      };

      mocks.userFindUnique.mockResolvedValue(user);
      mocks.verifyPassword.mockResolvedValue(true);
      mocks.signJwt
        .mockReturnValueOnce("access-token")
        .mockReturnValueOnce("refresh-token");

      const result = await service.logIn({
        email: user.email,
        password: "secret",
      } as any);

      expect(mocks.userFindUnique).toHaveBeenCalledWith({
        where: { email: user.email },
      });
      expect(mocks.verifyPassword).toHaveBeenCalledWith(
        "secret",
        "hashed-password",
      );
      expect(mocks.signJwt).toHaveBeenNthCalledWith(
        1,
        { id: user.id, email: user.email },
        "15m",
      );
      expect(mocks.signJwt).toHaveBeenNthCalledWith(
        2,
        { id: user.id, email: user.email },
        "1d",
      );
      expect(result).toEqual({
        token: "access-token",
        refreshToken: "refresh-token",
        user,
      });
    });

    it("should throw when the user does not exist", async () => {
      mocks.userFindUnique.mockResolvedValue(null);

      await expect(
        service.logIn({
          email: "missing@example.com",
          password: "secret",
        } as any),
      ).rejects.toThrow("User does not exist");

      expect(mocks.verifyPassword).not.toHaveBeenCalled();
      expect(mocks.signJwt).not.toHaveBeenCalled();
    });

    it("should throw when the password is invalid", async () => {
      mocks.userFindUnique.mockResolvedValue({
        id: "user-1",
        email: "john@example.com",
        password: "hashed-password",
      });
      mocks.verifyPassword.mockResolvedValue(false);

      await expect(
        service.logIn({
          email: "john@example.com",
          password: "wrong",
        } as any),
      ).rejects.toThrow("Invalid user password");

      expect(mocks.signJwt).not.toHaveBeenCalled();
    });
  });

  describe("register", () => {
    it("should register a new user and hashes the password", async () => {
      mocks.userFindUnique.mockResolvedValue(null);
      mocks.getHashPassword.mockResolvedValue("hashed-password");

      const user = {
        id: "user-1",
        email: "john@example.com",
        name: "John",
        password: "hashed-password",
      };

      mocks.userCreate.mockResolvedValue(user);
      mocks.signJwt
        .mockReturnValueOnce("access-token")
        .mockReturnValueOnce("refresh-token");

      const result = await service.register({
        name: "John",
        email: "john@example.com",
        password: "secret",
      } as any);

      expect(mocks.getHashPassword).toHaveBeenCalledWith("secret");
      expect(mocks.userCreate).toHaveBeenCalledWith({
        data: {
          name: "John",
          email: "john@example.com",
          password: "hashed-password",
        },
      });
      expect(result).toEqual({
        token: "access-token",
        refreshToken: "refresh-token",
        user,
      });
    });

    it("should throw when registering an existing email", async () => {
      mocks.userFindUnique.mockResolvedValue({
        id: "user-1",
        email: "john@example.com",
      });

      await expect(
        service.register({
          name: "John",
          email: "john@example.com",
          password: "secret",
        } as any),
      ).rejects.toThrow("User email already in use");

      expect(mocks.getHashPassword).not.toHaveBeenCalled();
      expect(mocks.userCreate).not.toHaveBeenCalled();
    });
  });
});
