import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";
import { Link } from "react-router";

export function ResetPasswordPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-12">
      <h1 className="text-center">
        Funcionalidade não implementada!
        <br /> Por favor, entre em contato com o suporte.
      </h1>

      <Link to={ROUTES.base} className="mt-10">
        <Button>
          <span>Voltar para Início</span>
        </Button>
      </Link>
    </div>
  );
}
