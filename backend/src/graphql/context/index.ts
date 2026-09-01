import type { ExpressContextFunctionArgument } from "@as-integrations/express5";

import { verifyJwt } from "../../services/utils/jwt";

export type GraphqlContext = {
  user: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export async function buildContext({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> {
  const authHeader = req.headers.authorization;
  let user: GraphqlContext["user"];
  let token: GraphqlContext["token"];

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length);

    try {
      const payload = verifyJwt(token);
      user = payload.id;
    } catch (error) {}
  }

  return { user, token, req, res };
}
