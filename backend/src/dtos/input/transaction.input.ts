import { Field, GraphQLISODateTime, InputType } from "type-graphql";

import { TransactionType } from "../../../generated/prisma/enums";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: string;

  @Field(() => Number)
  amount!: number;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class TransactionFilterInput {
  @Field(() => String, { nullable: true })
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}
