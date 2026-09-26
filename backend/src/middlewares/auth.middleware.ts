import { GraphQLError } from "graphql";
import type { MiddlewareFn } from "type-graphql";

import type { GraphqlContext } from "../graphql/context";

export const isAuthenticated: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  if (!context.user) {
    throw new GraphQLError("Unauthenticated user", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  return next();
};
