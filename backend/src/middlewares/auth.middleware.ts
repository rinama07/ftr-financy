import type { MiddlewareFn } from "type-graphql";

import type { GraphqlContext } from "../graphql/context";

export const isAuthenticated: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  if (!context.user) {
    throw new Error("Unauthenticated user");
  }

  return next();
};
