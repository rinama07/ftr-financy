import { create } from "zustand";
import { persist } from "zustand/middleware";

import { apolloClient } from "@/lib/graphql/apollo";
import type { LoginInput, RegisterInput } from "@/types";
import { authService } from "./auth.service";
import type { AuthState } from "./auth.types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,

      login: async (loginData: LoginInput) => {
        try {
          const result = await authService.login(loginData);

          if (result) {
            set({
              isAuthenticated: true,
              token: result.token,
              user: result.user,
            });

            return true;
          }

          return false;
        } catch (error) {
          console.error("Couldn't complete login", error);
          throw error;
        }
      },

      logout: () => {
        set({ isAuthenticated: false, token: null, user: null });

        apolloClient.clearStore();
      },

      signup: async (registerData: RegisterInput) => {
        try {
          const result = await authService.signup(registerData);

          if (result) {
            set({
              isAuthenticated: true,
              token: result.token,
              user: result.user,
            });

            return true;
          }

          return false;
        } catch (error) {
          console.error("Couldn't complete registration", error);
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
