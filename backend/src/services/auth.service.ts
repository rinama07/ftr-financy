import type { User } from "../../generated/prisma/client.js";
import { prismaClient } from "../../prisma/prisma.js";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input.js";
import type {
  LoginOutput,
  RegisterOutput,
} from "../dtos/output/auth.output.js";
import { getHashPassword, verifyPassword } from "./utils/hash.js";
import { signJwt } from "./utils/jwt.js";

export class AuthService {
  async logIn(data: LoginInput): Promise<LoginOutput> {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    const isPasswordValid = await verifyPassword(
      data.password,
      existingUser.password!,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid user password");
    }

    return this.generateTokens(existingUser);
  }

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

  private generateTokens(user: User): LoginOutput {
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
