import { Field, ID, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;
}
