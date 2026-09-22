import type { User } from "@/types";

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
