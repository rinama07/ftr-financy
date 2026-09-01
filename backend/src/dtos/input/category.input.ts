import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  icon_name!: string;

  @Field(() => String)
  color!: string;
}
