import { LogOut } from "lucide-react";

import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function LogOutButton() {
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
    <Button onClick={onLogOut}>
      <LogOut />
    </Button>
  );
}
