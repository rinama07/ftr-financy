export function getUserNameInitials(userName: string) {
  if (!userName) {
    return "";
  }

  return userName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
