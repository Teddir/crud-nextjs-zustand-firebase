export interface AuthState {
  isAuthenticated: boolean;
  user: { username?: string; email?: string } | null;
  setUser: (user: { username?: string; email?: string } | null) => void;
  login: (provider: string) => void;
  logout: () => void;
}
