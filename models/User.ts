export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface UserState {
  profile: {
    name: string;
    email: string;
  };
  updateProfile: (name: string, email: string) => void;
}
