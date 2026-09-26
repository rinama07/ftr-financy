import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";

import { Prisma } from "../../generated/prisma/client";
import type { TransactionType } from "../../generated/prisma/enums";
import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: Prisma.Decimal;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => String)
  categoryId!: string;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;
}

@ObjectType()
export class TransactionSummaryModel {
  @Field(() => Number)
  balance!: number;

  @Field(() => Number)
  expense!: number;

  @Field(() => Number)
  income!: number;
}

@ObjectType()
export class TransactionPaginationModel {
  @Field(() => [TransactionModel])
  transactions!: TransactionModel[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  pageSize!: number;

  @Field(() => Int)
  totalPages!: number;
}
