import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import type { User } from "../../generated/prisma/client";
import { getGraphqlUser } from "../decorators/user.decorator";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";
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

  @Query(() => CategoryModel)
  async getCategory(
    @Arg("id", () => String) id: string,
    @getGraphqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.findCategory(id, user.id);
  }

  @Query(() => [CategoryModel])
  async getAllActiveCategoriesWithCount(
    @getGraphqlUser() user: User,
  ): Promise<CategoryModel[]> {
    return this.categoryService.findAllActiveCategoriesWithCount(user.id);
  }

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @getGraphqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @getGraphqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @getGraphqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.deleteCategory(id, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(category.userId);
  }
}
