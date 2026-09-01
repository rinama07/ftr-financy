import type { User } from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";

export class UserService {
  async findUser(id: string): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User does not exist!");
    }

    return user;
  }
}
