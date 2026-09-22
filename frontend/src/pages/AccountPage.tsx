import { LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { Avatar } from "@/components/Avatar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { EmailField } from "@/components/forms/EmailField";
import { TextField } from "@/components/forms/TextField";
import { LogOutButton } from "@/components/LogOutButton";
import { Card } from "@/components/ui/card";
import { FieldGroup, FieldSeparator, FieldSet } from "@/components/ui/field";
import { useAuthStore } from "@/store/auth/auth.store";
import type { UpdateUserInput } from "@/types/User";

const FormFields = {
  name: "name",
  email: "email",
} as const;

export function AccountPage() {
  const user = useAuthStore((state) => state.user);
  const { register, handleSubmit } = useForm<UpdateUserInput>();

  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useAuthStore((state) => state.updateUser);

  const onSubmit: SubmitHandler<UpdateUserInput> = async (data) => {
    setIsLoading(true);

    try {
      const updateMutate = await updateUser(data.name);

      if (updateMutate) {
        toast.success("Dados atualizados com sucesso!");
      }
    } catch (error) {
      toast.error(
        "Não foi possível atualizar os dados. Por favor, tente novamente!",
        {
          id: "update-user-error-toast",
        },
      );

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-md p-8 gap-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-5">
          <Avatar className="h-16 w-16 text-gray-800 text-2xl" />

          <div>
            <p className="text-center font-semibold text-xl mb-0.5">
              {user?.name}
            </p>

            <p className="text-center text-base text-gray-500">{user?.email}</p>
          </div>
        </div>

        <FieldSeparator />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 m-0 p-0"
        >
          <FieldSet>
            <FieldGroup className="flex flex-col gap-4">
              <TextField
                id={FormFields.name}
                label="Nome completo"
                type="name"
                placeholder="Seu nome completo"
                addon={<UserRound />}
                required
                {...register(FormFields.name, {
                  value: user?.name,
                })}
              />

              <EmailField
                description="O e-mail não pode ser alterado"
                disabled
                id={FormFields.email}
                value={user?.email}
              />
            </FieldGroup>
          </FieldSet>

          <PrimaryButton type="submit" disabled={isLoading}>
            <span>Salvar alterações</span>
          </PrimaryButton>
        </form>
      </div>

      <LogOutButton disabled={isLoading}>
        <LogOut className="text-danger" />
        <span>Sair da conta</span>
      </LogOutButton>
    </Card>
  );
}
