import { UserState } from "./User";

export interface AuthState {
  isAuthenticated: boolean;
  user: { name?: string; email?: string } | null;
  setUser: (user: { name?: string; email?: string } | null) => void;
  login: (provider: string) => void;
  logout: () => void;
}
