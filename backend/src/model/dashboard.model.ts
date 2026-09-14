import { Field, ObjectType } from "type-graphql";

import { CategoryModel } from "./category.model";
import { TransactionModel } from "./transaction.model";

@ObjectType()
export class DashboardModel {
  @Field(() => Number)
  balance!: number;

  @Field(() => Number)
  monthIncomes!: number;

  @Field(() => Number)
  monthExpenses!: number;

  @Field(() => [TransactionModel])
  recentTransactions!: TransactionModel[];

  @Field(() => [CategoryModel])
  categories!: CategoryModel[];
}
