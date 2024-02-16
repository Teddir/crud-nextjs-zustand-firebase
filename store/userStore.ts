import { UserState } from "@/models/User";
import create from "zustand";

export const useUserStore = create<UserState>((set) => ({
  profile: {
    name: "John Doe",
    email: "john@example.com",
  },
  updateProfile: (name, email) => set(() => ({ profile: { name, email } })),
}));
