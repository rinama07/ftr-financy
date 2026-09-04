import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";

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
