import type { LoginInput, RegisterInput, User } from "@/types";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (data: LoginInput) => Promise<boolean>;
  logout: () => void;
  signup: (data: RegisterInput) => Promise<boolean>;
}
