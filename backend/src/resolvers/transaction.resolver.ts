import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { type User } from "../../generated/prisma/client";
import { getGraphqlUser } from "../decorators/user.decorator";
import {
  CreateTransactionInput,
  TransactionFilterInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { CategoryModel } from "../model/category.model";
import { TransactionModel } from "../model/transaction.model.js";
import { UserModel } from "../model/user.model";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";

@Resolver(() => TransactionModel)
@UseMiddleware(isAuthenticated)
export class TransactionResolver {
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();
  private userService = new UserService();

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg("id", () => String) id: string,
    @getGraphqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.getTransaction(id, user.id);
  }

  @Query(() => [TransactionModel])
  async getAllTransactions(
    @getGraphqlUser() user: User,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getTransactions(user.id);
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @getGraphqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @getGraphqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @getGraphqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.deleteTransaction(id, user.id);
  }

  @Query(() => [TransactionModel])
  async getTransactionsByFilter(
    @Arg("filter", () => TransactionFilterInput) filter: TransactionFilterInput,
    @getGraphqlUser() user: User,
  ): Promise<TransactionModel[]> {
    return this.transactionService.getTransactionByFilter(filter, user.id);
  }

  // Resolvers
  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.getUser(transaction.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
  ): Promise<CategoryModel> {
    return this.categoryService.getCategory(
      transaction.categoryId,
      transaction.userId,
    );
  }
}
