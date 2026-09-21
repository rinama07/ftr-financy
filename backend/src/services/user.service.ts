import type { User } from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "../dtos/input/user.input.js";

export class UserService {
  async getUser(id: string): Promise<User> {
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

  async createUser(data: CreateUserInput): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new Error("User already exists!");
    }

    return prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async updateUser(data: UpdateUserInput, userId: string): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User does not exist!");
    }

    return prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
      },
    });
  }
}
