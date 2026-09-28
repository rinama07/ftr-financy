export function getUserNameInitials(name: string) {
  const userName = name.trim();

  if (!userName) {
    return "";
  }

  return userName

    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
