import { describe, expect, it, vi } from "vitest";
import { CategoryResolver } from "./category.resolver";

describe("CategoryResolver", () => {
  it("should delegate getCategory", async () => {
    const resolver = new CategoryResolver();
    const service = (resolver as any).categoryService;
    const result = { id: "cat1", userId: "user-1" };
    vi.spyOn(service, "getCategory").mockResolvedValue(result);

    await expect(
      resolver.getCategory("cat1", { id: "user-1" } as any),
    ).resolves.toEqual(result);

    expect(service.getCategory).toHaveBeenCalledWith("cat1", "user-1");
  });

  it("should delegate getAllActiveCategories", async () => {
    const resolver = new CategoryResolver();
    const service = (resolver as any).categoryService;
    const result = [{ id: "cat1" }];
    vi.spyOn(service, "getAllActiveCategories").mockResolvedValue(result);

    await expect(
      resolver.getAllActiveCategories({ id: "user-1" } as any),
    ).resolves.toEqual(result);

    expect(service.getAllActiveCategories).toHaveBeenCalledWith("user-1");
  });

  it("should delegate createCategory", async () => {
    const resolver = new CategoryResolver();
    const service = (resolver as any).categoryService;
    const input = { title: "Food" };
    const result = { id: "cat1", ...input };
    vi.spyOn(service, "createCategory").mockResolvedValue(result);

    await expect(
      resolver.createCategory(input as any, { id: "user-1" } as any),
    ).resolves.toEqual(result);

    expect(service.createCategory).toHaveBeenCalledWith(input, "user-1");
  });

  it("should delegate updateCategory", async () => {
    const resolver = new CategoryResolver();
    const service = (resolver as any).categoryService;
    const input = { id: "cat1", title: "Food" };
    vi.spyOn(service, "updateCategory").mockResolvedValue(input);

    await resolver.updateCategory(input as any, { id: "user-1" } as any);

    expect(service.updateCategory).toHaveBeenCalledWith(input, "user-1");
  });

  it("should delegate deleteCategory", async () => {
    const resolver = new CategoryResolver();
    const service = (resolver as any).categoryService;
    const result = { id: "cat1", isActive: false };
    vi.spyOn(service, "deleteCategory").mockResolvedValue(result);

    await expect(
      resolver.deleteCategory("cat1", { id: "user-1" } as any),
    ).resolves.toEqual(result);

    expect(service.deleteCategory).toHaveBeenCalledWith("cat1", "user-1");
  });

  it("should delegate the category user field resolver", async () => {
    const resolver = new CategoryResolver();
    const service = (resolver as any).userService;
    const user = { id: "user-1", name: "John" };
    vi.spyOn(service, "getUser").mockResolvedValue(user);

    await expect(resolver.user({ userId: "user-1" } as any)).resolves.toEqual(
      user,
    );

    expect(service.getUser).toHaveBeenCalledWith("user-1");
  });
});
