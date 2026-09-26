import { Link } from "react-router";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ROUTES } from "@/routes";

export function ResetPasswordPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-center">
        Funcionalidade não implementada!
        <br /> Por favor, entre em contato com o suporte.
      </h1>

      <Link to={ROUTES.base} className="mt-10">
        <PrimaryButton>
          <span>Voltar para Início</span>
        </PrimaryButton>
      </Link>
    </div>
  );
}
