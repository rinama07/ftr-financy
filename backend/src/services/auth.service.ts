import type { User } from "@prisma/client";

import { prismaClient } from "../../prisma/prisma.js";
import { RegisterInput } from "../dtos/input/auth.input.js";
import { getHashPassword } from "./utils/hash.js";
import { signJwt } from "./utils/jwt.js";
import type { RegisterOutput } from "../dtos/output/auth.output.js";

export class AuthService {
  async register(data: RegisterInput): Promise<RegisterOutput> {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("User email already in use");
    }

    const hashPassword = await getHashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
      },
    });

    return this.generateTokens(user);
  }

  generateTokens(user: User) {
    const token = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "15m",
    );

    const refreshToken = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "1d",
    );

    return { token, refreshToken, user };
  }
}
