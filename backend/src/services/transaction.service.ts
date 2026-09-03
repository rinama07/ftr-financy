import type { Transaction } from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";

export class TransactionService {
  async findTransaction(id: string, authorId: string): Promise<Transaction> {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
        authorId,
      },
    });

    if (!transaction) {
      throw new Error("Transaction does not exist!");
    }

    return transaction;
  }

  async findTransactionList(authorId: string): Promise<Transaction[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: {
        authorId,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new Error("Transactions not found!");
    }

    return transactions;
  }

  async createTransaction(data: CreateTransactionInput, authorId: string) {
    return await prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
        authorId,
      },
    });
  }

  async updateTransaction(data: UpdateTransactionInput, authorId: string) {
    return await prismaClient.transaction.update({
      where: {
        id: data.id,
        authorId,
      },
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
      },
    });
  }

  async deleteTransaction(transactionId: string, authorId: string) {
    return await prismaClient.transaction.delete({
      where: {
        id: transactionId,
        authorId,
      },
    });
  }
}
