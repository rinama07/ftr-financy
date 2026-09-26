import {
  TransactionType,
  type Prisma,
  type Transaction,
} from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import type {
  CreateTransactionInput,
  TransactionFilterInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import type {
  TransactionPaginationModel,
  TransactionSummaryModel,
} from "../model/transaction.model.js";

export class TransactionService {
  async getTransaction(id: string, userId: string): Promise<Transaction> {
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

  async getTransactions(
    userId: string,
    limit?: number,
  ): Promise<Transaction[]> {
    const queryArgs: Prisma.TransactionFindManyArgs = {
      where: { userId },
      orderBy: {
        date: "desc",
      },
    };

    if (limit) {
      queryArgs.take = limit;
    }

    const transactions = await prismaClient.transaction.findMany(queryArgs);

    if (!transactions) {
      throw new Error("Transactions not found!");
    }

    return transactions;
  }

  async createTransaction(
    data: CreateTransactionInput,
    userId: string,
  ): Promise<Transaction> {
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

  async updateTransaction(
    data: UpdateTransactionInput,
    userId: string,
  ): Promise<Transaction> {
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

  async deleteTransaction(
    transactionId: string,
    userId: string,
  ): Promise<Transaction> {
    return await prismaClient.transaction.delete({
      where: {
        id: transactionId,
        userId,
      },
    });
  }

  async getTransactionByFilter(
    filter: TransactionFilterInput,
    userId: string,
    page = 1,
    pageSize = 10,
  ): Promise<TransactionPaginationModel> {
    const where: Prisma.TransactionWhereInput = {
      userId,
    };

    if (filter.description) {
      where.description = {
        contains: filter.description,
      };
    }

    if (filter.type) {
      where.type = filter.type;
    }

    if (filter.categoryId) {
      where.categoryId = filter.categoryId;
    }

    if (filter.startDate && filter.endDate) {
      where.date = {
        gte: filter.startDate,
        lte: filter.endDate,
      };
    }

    const skip = (page - 1) * pageSize;

    const [transactions, total] = await Promise.all([
      prismaClient.transaction.findMany({
        where,
        orderBy: {
          date: "desc",
        },
        skip,
        take: pageSize,
        include: {
          category: true,
        },
      }),

      prismaClient.transaction.count({
        where,
      }),
    ]);

    return {
      transactions,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getTotalFinancialSummary(
    userId: string,
  ): Promise<TransactionSummaryModel> {
    const [incomes, expenses] = await Promise.all([
      prismaClient.transaction.aggregate({
        where: { userId, type: TransactionType.income },
        _sum: { amount: true },
      }),
      prismaClient.transaction.aggregate({
        where: { userId, type: TransactionType.expense },
        _sum: { amount: true },
      }),
    ]);

    const income = Number(incomes._sum.amount || 0);
    const expense = Number(expenses._sum.amount || 0);

    return {
      balance: income - expense,
      expense,
      income,
    };
  }

  async getCurrentMonthFinancialSummary(
    userId: string,
  ): Promise<TransactionSummaryModel> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const [income, expense] = await Promise.all([
      this.getMonthIncomeAmount(userId, {
        year: currentYear,
        month: currentMonth,
      }),
      this.getMonthExpenseAmount(userId, {
        year: currentYear,
        month: currentMonth,
      }),
    ]);

    return {
      balance: income - expense,
      expense,
      income,
    };
  }

  getMonthIncomeAmount = async (
    userId: string,
    { year, month }: { year: number; month: number },
  ): Promise<number> =>
    this.getMonthTransactionAmountByType(userId, TransactionType.income, {
      year,
      month,
    });

  getMonthExpenseAmount = async (
    userId: string,
    { year, month }: { year: number; month: number },
  ): Promise<number> =>
    this.getMonthTransactionAmountByType(userId, TransactionType.expense, {
      year,
      month,
    });

  private async getMonthTransactionAmountByType(
    userId: string,
    type: TransactionType,
    { year, month }: { year: number; month: number },
  ): Promise<number> {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const transactions = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type: type,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      _sum: { amount: true },
    });

    return Number(transactions._sum.amount || 0);
  }
}
