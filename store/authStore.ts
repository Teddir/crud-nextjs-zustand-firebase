import create from "zustand";
import { signIn, signOut } from "next-auth/react";
import { AuthState } from "@/models/auth";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (users) =>
    set(() => ({
      isAuthenticated: !!users,
      user: users,
    })),
  login: async (provider) => await signIn(provider),
  logout: async () => await signOut(),
}));
