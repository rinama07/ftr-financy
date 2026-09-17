import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  findUnique: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
}));

vi.mock("../../prisma/prisma.js", () => ({
  prismaClient: {
    user: {
      findUnique: mocks.findUnique,
      create: mocks.create,
      update: mocks.update,
    },
  },
}));

import { UserService } from "./user.service";

describe("UserService", () => {
  const service = new UserService();

  beforeEach(() => vi.resetAllMocks());

  describe("getUser", () => {
    it("should return a user by id", async () => {
      const user = { id: "user-1", name: "John", email: "john@example.com" };
      mocks.findUnique.mockResolvedValue(user);

      await expect(service.getUser("user-1")).resolves.toEqual(user);
      expect(mocks.findUnique).toHaveBeenCalledWith({
        where: { id: "user-1" },
      });
    });

    it("should throw when getting a missing user", async () => {
      mocks.findUnique.mockResolvedValue(null);

      await expect(service.getUser("user-1")).rejects.toThrow(
        "User does not exist!",
      );
    });
  });

  describe("createUser", () => {
    it("should create a user when the email is not already used", async () => {
      mocks.findUnique.mockResolvedValue(null);
      const user = { id: "user-1", name: "John", email: "john@example.com" };
      mocks.create.mockResolvedValue(user);

      const data = {
        name: "John",
        email: "john@example.com",
      };

      await expect(service.createUser(data as any)).resolves.toEqual(user);

      expect(mocks.findUnique).toHaveBeenCalledWith({
        where: { email: data.email },
      });
      expect(mocks.create).toHaveBeenCalledWith({
        data: {
          name: data.name,
          email: data.email,
        },
      });
    });

    it("should throw when creating a duplicate user", async () => {
      mocks.findUnique.mockResolvedValue({ id: "user-1" });

      await expect(
        service.createUser({
          name: "John",
          email: "john@example.com",
        } as any),
      ).rejects.toThrow("User already exists!");

      expect(mocks.create).not.toHaveBeenCalled();
    });
  });

  describe("updateUser", () => {
    it("should update a user that exists", async () => {
      mocks.findUnique.mockResolvedValue({ id: "user-1" });
      const updated = {
        id: "user-1",
        name: "Jane",
        email: "john@example.com",
      };
      mocks.update.mockResolvedValue(updated);

      const data = { id: "user-1", name: "Jane" };

      await expect(service.updateUser(data as any)).resolves.toEqual(updated);

      expect(mocks.findUnique).toHaveBeenCalledWith({
        where: { id: "user-1" },
      });
      expect(mocks.update).toHaveBeenCalledWith({
        where: { id: "user-1" },
        data: { name: "Jane" },
      });
    });

    it("should throw when updating a missing user", async () => {
      mocks.findUnique.mockResolvedValue(null);

      await expect(
        service.updateUser({ id: "user-1", name: "Jane" } as any),
      ).rejects.toThrow("User does not exist!");

      expect(mocks.update).not.toHaveBeenCalled();
    });
  });
});
