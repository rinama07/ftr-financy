import { describe, expect, it, vi } from "vitest";
import { AuthResolver } from "./auth.resolver";

describe("AuthResolver", () => {
  it("should delegate login to AuthService", async () => {
    const resolver = new AuthResolver();
    const service = (resolver as any).authService;
    const result = { token: "a", refreshToken: "r", user: { id: "user-1" } };
    vi.spyOn(service, "logIn").mockResolvedValue(result);

    const input = { email: "john@example.com", password: "secret" };
    await expect(resolver.login(input as any)).resolves.toEqual(result);
    expect(service.logIn).toHaveBeenCalledWith(input);
  });

  it("should delegate register to AuthService", async () => {
    const resolver = new AuthResolver();
    const service = (resolver as any).authService;
    const result = { token: "a", refreshToken: "r", user: { id: "user-1" } };
    vi.spyOn(service, "register").mockResolvedValue(result);

    const input = {
      name: "John",
      email: "john@example.com",
      password: "secret",
    };
    await expect(resolver.register(input as any)).resolves.toEqual(result);
    expect(service.register).toHaveBeenCalledWith(input);
  });
});
