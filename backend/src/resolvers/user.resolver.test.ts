import { describe, expect, it, vi } from "vitest";
import { UserResolver } from "./user.resolver";

describe("UserResolver", () => {
  it("should delegate createUser", async () => {
    const resolver = new UserResolver();
    const service = (resolver as any).userService;
    const input = { name: "John", email: "john@example.com" };
    const result = { id: "user-1", ...input };
    vi.spyOn(service, "createUser").mockResolvedValue(result);

    await expect(resolver.createUser(input as any)).resolves.toEqual(result);
    expect(service.createUser).toHaveBeenCalledWith(input);
  });

  it("should delegate getUser", async () => {
    const resolver = new UserResolver();
    const service = (resolver as any).userService;
    const result = { id: "user-1" };
    vi.spyOn(service, "getUser").mockResolvedValue(result);

    await expect(resolver.getUser("user-1")).resolves.toEqual(result);
    expect(service.getUser).toHaveBeenCalledWith("user-1");
  });

  it("should delegate updateUser", async () => {
    const resolver = new UserResolver();
    const service = (resolver as any).userService;
    const input = { id: "user-1", name: "Jane" };
    const result = { id: "user-1", name: "Jane" };
    vi.spyOn(service, "updateUser").mockResolvedValue(result);

    await expect(resolver.updateUser(input as any)).resolves.toEqual(result);
    expect(service.updateUser).toHaveBeenCalledWith(input);
  });
});
