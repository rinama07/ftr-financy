import type { User } from "@/types";

export interface AuthMutationData {
  token: string;
  user: User;
}

export interface LoginMutationResponse {
  login: AuthMutationData;
}

export interface RegisterMutationResponse {
  register: AuthMutationData;
}
