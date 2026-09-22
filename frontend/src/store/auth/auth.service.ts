import { apolloClient } from "@/lib/graphql/apollo";
import { LOGIN, REGISTER } from "@/lib/graphql/auth/mutations";
import { UPDATE_USER } from "@/lib/graphql/user/mutations";
import type { LoginInput, RegisterInput } from "@/types";

export const authService = {
  async login(loginData: LoginInput) {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        data: {
          email: loginData.email,
          password: loginData.password,
        },
      },
    });

    return data?.login ?? null;
  },

  async signup(registerData: RegisterInput) {
    const { data } = await apolloClient.mutate({
      mutation: REGISTER,
      variables: {
        data: {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        },
      },
    });

    return data?.register ?? null;
  },

  async updateUser(name: string) {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_USER,
      variables: {
        data: {
          name,
        },
      },
    });

    return data?.updateUser ?? null;
  },
};
