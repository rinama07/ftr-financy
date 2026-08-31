import bcrypt from "bcryptjs";

export async function getHashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(plainPassword, salt);
}
