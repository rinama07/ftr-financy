import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import type { User } from "../../generated/prisma/client.js";
import { getGraphqlUser } from "../decorators/user.decorator.js";
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { UserModel } from "../model/user.model.js";
import { UserService } from "../services/user.service.js";

@Resolver(() => UserModel)
@UseMiddleware(isAuthenticated)
export class UserResolver {
  private userService = new UserService();

  @Mutation(() => UserModel)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput,
  ): Promise<UserModel> {
    return this.userService.createUser(data);
  }

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.getUser(id);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @getGraphqlUser() user: User,
  ): Promise<UserModel> {
    return this.userService.updateUser(data, user.id);
  }
}
