import { describe, expect, it, vi } from "vitest";
import { isAuthenticated } from "./auth.middleware";

describe("isAuthenticated", () => {
  it("should call next when a user exists in the context", async () => {
    const next = vi.fn().mockResolvedValue(undefined);

    await isAuthenticated({ context: { user: { id: "user-1" } } } as any, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it("should throw when the context has no user", async () => {
    const next = vi.fn();

    await expect(isAuthenticated({ context: {} } as any, next)).rejects.toThrow(
      "Unauthenticated user",
    );

    expect(next).not.toHaveBeenCalled();
  });
});
