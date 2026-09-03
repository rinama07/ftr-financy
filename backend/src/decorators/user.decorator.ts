import { createParameterDecorator, type ResolverData } from "type-graphql";
import type { User } from "../../generated/prisma/client";
import { prismaClient } from "../../prisma/prisma";
import type { GraphqlContext } from "../graphql/context";

export function getGraphqlUser() {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
      if (!context || !context.user) {
        return null;
      }

      try {
        const user = await prismaClient.user.findUnique({
          where: { id: context.user },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        throw new Error("Error fetching user: " + (error as Error).message);
      }
    },
  );
}
