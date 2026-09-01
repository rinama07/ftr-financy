import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { UserModel } from "../model/user.model.js";
import { UserService } from "../services/user.service.js";

@Resolver(() => UserModel)
@UseMiddleware(isAuthenticated)
export class UserResolver {
  private userService = new UserService();

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id);
  }
}
