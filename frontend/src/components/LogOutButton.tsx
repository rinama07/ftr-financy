import type { ComponentProps } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth/auth.store";
import { OutlineButton } from "./buttons/OutlineButton";
import type { Button } from "./ui/button";

type LogOutButtonProps = ComponentProps<typeof Button>;

export function LogOutButton({ children, className }: LogOutButtonProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const onLogOut = () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      toast.error("Não foi possível deslogar. Por favor, tente novamente!", {
        id: "logout-error-toast",
      });

      console.error({ error });
    }
  };

  return (
    <OutlineButton className={className} onClick={onLogOut}>
      {children}
    </OutlineButton>
  );
}
