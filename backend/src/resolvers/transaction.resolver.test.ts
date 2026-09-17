import { describe, expect, it, vi } from "vitest";
import { TransactionResolver } from "./transaction.resolver";

describe("TransactionResolver", () => {
  const user = { id: "user-1" };

  it("should delegate getTransaction", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).transactionService;
    const result = { id: "t1" };
    vi.spyOn(service, "getTransaction").mockResolvedValue(result);

    await expect(resolver.getTransaction("t1", user as any)).resolves.toEqual(
      result,
    );

    expect(service.getTransaction).toHaveBeenCalledWith("t1", "user-1");
  });

  it("should delegate getAllTransactions", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).transactionService;
    const result = [{ id: "t1" }];
    vi.spyOn(service, "getTransactions").mockResolvedValue(result);

    await expect(resolver.getAllTransactions(user as any)).resolves.toEqual(
      result,
    );

    expect(service.getTransactions).toHaveBeenCalledWith("user-1");
  });

  it("should delegate createTransaction", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).transactionService;
    const input = { amount: 100 };
    vi.spyOn(service, "createTransaction").mockResolvedValue({ id: "t1" });

    await resolver.createTransaction(input as any, user as any);

    expect(service.createTransaction).toHaveBeenCalledWith(input, "user-1");
  });

  it("should delegate updateTransaction", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).transactionService;
    const input = { id: "t1", amount: 120 };
    vi.spyOn(service, "updateTransaction").mockResolvedValue({ id: "t1" });

    await resolver.updateTransaction(input as any, user as any);

    expect(service.updateTransaction).toHaveBeenCalledWith(input, "user-1");
  });

  it("should delegate deleteTransaction", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).transactionService;
    vi.spyOn(service, "deleteTransaction").mockResolvedValue({ id: "t1" });

    await resolver.deleteTransaction("t1", user as any);

    expect(service.deleteTransaction).toHaveBeenCalledWith("t1", "user-1");
  });

  it("should delegate getTransactionsByFilter", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).transactionService;
    const filter = { type: "expense" };
    vi.spyOn(service, "getTransactionByFilter").mockResolvedValue([]);

    await resolver.getTransactionsByFilter(filter as any, user as any);

    expect(service.getTransactionByFilter).toHaveBeenCalledWith(
      filter,
      "user-1",
    );
  });

  it("should delegate the user field resolver", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).userService;
    const result = { id: "user-1" };
    vi.spyOn(service, "getUser").mockResolvedValue(result);

    await expect(resolver.user({ userId: "user-1" } as any)).resolves.toEqual(
      result,
    );

    expect(service.getUser).toHaveBeenCalledWith("user-1");
  });

  it("should delegate the category field resolver using the transaction owner", async () => {
    const resolver = new TransactionResolver();
    const service = (resolver as any).categoryService;
    const result = { id: "cat1" };
    vi.spyOn(service, "getCategory").mockResolvedValue(result);

    await expect(
      resolver.category({ categoryId: "cat1", userId: "user-1" } as any),
    ).resolves.toEqual(result);

    expect(service.getCategory).toHaveBeenCalledWith("cat1", "user-1");
  });
});
