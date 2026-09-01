import { Arg, Query, Resolver } from "type-graphql";

import { UserModel } from "../model/user.model.js";
import { UserService } from "../services/user.service.js";

@Resolver(() => UserModel)
export class UserResolver {
  private userService = new UserService();

  @Query(() => UserModel)
  async getUser(@Arg("id", () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id);
  }
}
