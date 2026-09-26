export const ROUTES = {
  base: "/",
  private: {
    account: "/account",
    categories: "/categories",
    dashboard: "/dashboard",
    transactions: "/transactions",
  },
  public: {
    login: "/login",
    register: "/register",
    reset_password: "/reset-password",
  },
} as const;
