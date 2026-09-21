import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name!: string;
}
