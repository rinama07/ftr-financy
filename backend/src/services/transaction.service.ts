import type {
  Transaction,
  TransactionType,
} from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";

export class TransactionService {
  async findTransaction(id: string, userId: string): Promise<Transaction> {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      throw new Error("Transaction does not exist!");
    }

    return transaction;
  }

  async findTransactionList(userId: string): Promise<Transaction[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: {
        userId,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new Error("Transactions not found!");
    }

    return transactions;
  }

  async createTransaction(data: CreateTransactionInput, userId: string) {
    return await prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
        userId,
      },
    });
  }

  async updateTransaction(data: UpdateTransactionInput, userId: string) {
    return await prismaClient.transaction.update({
      where: {
        id: data.id,
        userId,
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

  async deleteTransaction(transactionId: string, userId: string) {
    return await prismaClient.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });
  }

  async findTransactionByDescription(
    description: string,
    userId: string,
  ): Promise<Transaction[]> {
    console.info({ description });
    const transactions = await prismaClient.transaction.findMany({
      where: {
        description: {
          contains: description,
        },
        userId,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new Error("Transactions not found!");
    }

    return transactions;
  }

  async findTransactionByType(
    type: TransactionType,
    userId: string,
  ): Promise<Transaction[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: {
        type,
        userId,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new Error("Transactions not found!");
    }

    return transactions;
  }

  async findTransactionByCategory(
    categoryId: string,
    userId: string,
  ): Promise<Transaction[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: {
        categoryId,
        userId,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new Error("Transactions not found!");
    }

    return transactions;
  }

  async findTransactionByDateRange(
    startDate: Date,
    endDate: Date,
    userId: string,
  ): Promise<Transaction[]> {
    const transactions = await prismaClient.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        userId,
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new Error("Transactions not found!");
    }

    return transactions;
  }
}
