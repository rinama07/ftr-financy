import type { LoginInput, RegisterInput, User } from "@/types";

export type LoginMutationData = {
  login: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

export type RegisterMutationData = {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
};

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (data: LoginInput) => Promise<boolean>;
  logout: () => void;
  signup: (data: RegisterInput) => Promise<boolean>;
}
