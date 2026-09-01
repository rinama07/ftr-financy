import {
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import type { User } from "../../generated/prisma/client";
import { getGraphqlUser } from "../decorators/user.decorator";
import { CreateCategoryInput } from "../dtos/input/category.input";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { CategoryModel } from "../model/category.model.js";
import { UserModel } from "../model/user.model";
import { CategoryService } from "../services/category.service";
import { UserService } from "../services/user.service";

@Resolver(() => CategoryModel)
@UseMiddleware(isAuthenticated)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private userService = new UserService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @getGraphqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @FieldResolver(() => UserModel)
  async author(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.authorId);
  }
}
