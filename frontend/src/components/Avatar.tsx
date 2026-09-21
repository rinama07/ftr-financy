import { useAuthStore } from "@/store/auth.store";
import { getUserNameInitials } from "@/utils/user";
import { clsx } from "cn";

interface AvatarProps {
  className?: string;
}

export function Avatar({ className }: AvatarProps) {
  const { user } = useAuthStore();

  const userName = getUserNameInitials(user?.name ?? "");

  return (
    <div
      className={clsx(
        "bg-gray-300 flex items-center justify-center p-2 rounded-full",
        className ?? "w-8 h-8 text-gray-800 text-sm",
      )}
    >
      <span>{userName}</span>
    </div>
  );
}
