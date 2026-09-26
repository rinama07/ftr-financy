import { Query, Resolver, UseMiddleware } from "type-graphql";

import { type User } from "../../generated/prisma/client";
import { getGraphqlUser } from "../decorators/user.decorator";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { DashboardModel } from "../model/dashboard.model.js";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => DashboardModel)
@UseMiddleware(isAuthenticated)
export class DashboardResolver {
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();

  @Query(() => DashboardModel)
  async getDashboardData(
    @getGraphqlUser() user: User,
  ): Promise<DashboardModel> {
    const [summary, monthAggregates, recentTransactions, categories] =
      await Promise.all([
        this.transactionService.getTotalFinancialSummary(user.id),
        this.transactionService.getCurrentMonthFinancialSummary(user.id),
        this.transactionService.getTransactions(user.id, 5),
        this.categoryService.getAllActiveCategoriesWithMetrics(user.id),
      ]);

    return {
      balance: summary.balance,
      monthIncomes: monthAggregates.income,
      monthExpenses: monthAggregates.expense,
      recentTransactions,
      categories,
    };
  }
}
