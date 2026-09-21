import { useAuthStore } from "@/store/auth.store";
import { getUserNameInitials } from "@/utils/user";

export function Avatar() {
  const { user } = useAuthStore();

  const userName = getUserNameInitials(user?.name ?? "");

  return (
    <div className="bg-gray-300 flex items-center justify-center p-2 rounded-full w-8 h-8 ">
      <span className="text-gray-800 text-sm">{userName}</span>
    </div>
  );
}
