import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  id: string;
  email: string;
};

export function signJwt(payload: JwtPayload, expiresIn?: string) {
  const secret: Secret = process.env.JWT_SECRET as unknown as Secret;
  let options: SignOptions = {};

  if (expiresIn) {
    options = {
      ...options,
      expiresIn: expiresIn as unknown as NonNullable<SignOptions["expiresIn"]>,
    };
  }

  return jwt.sign(payload, secret, options);
}
