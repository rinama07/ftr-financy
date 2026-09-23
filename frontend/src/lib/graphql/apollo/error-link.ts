import { APP_EVENTS } from "@/constants/events";
import { CombinedGraphQLErrors } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";

export const errorLink = new ErrorLink(({ error }) => {
  if (!CombinedGraphQLErrors.is(error)) {
    return;
  }

  const isUnauthenticated = error.errors.some(
    (graphqlError) => graphqlError.extensions?.code === "UNAUTHENTICATED",
  );

  if (!isUnauthenticated) {
    return;
  }

  window.dispatchEvent(new Event(APP_EVENTS.AUTH_UNAUTHENTICATED));
});
