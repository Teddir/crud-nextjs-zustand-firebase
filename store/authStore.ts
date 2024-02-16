import create from "zustand";
import { signIn, signOut, useSession } from "next-auth/react";
import { AuthState } from "@/models/auth";
import { UserState } from "@/models/User";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (users) =>
    set((state) => ({
      isAuthenticated: !!users,
      user: users,
    })),
  login: async (provider) => await signIn(provider),
  logout: async () => await signOut(),
}));
