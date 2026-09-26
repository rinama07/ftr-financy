import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";

import type { Prisma } from "../../generated/prisma/client";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  icon_name!: string;

  @Field(() => String)
  color!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => Int, { nullable: true })
  transactionsCount?: number;

  @Field(() => Number, { nullable: true })
  transactionsBalance?: Prisma.Decimal;
}
