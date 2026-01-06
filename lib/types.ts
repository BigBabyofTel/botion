export interface AuthContextType {
  AccessToken: string | null;
  RefreshToken: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  user: UserObject | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setUser: (user: UserObject) => void;
  setUserId: (userId: string) => void;
  deleteUser: () => void;
  deleteToken: () => void;
  deleteUserId: () => void;
}

export interface FormState {
  username: string;
  password: string;
}

export interface FormData {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  email: string;
  username: string;
  password: string;
}

export interface CreateTypes {
  title: string;
  AccessToken: string | null;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserObject {
  username: string | null;
  email: string | null;
  userId: string | null;
}

export interface GithubAccessToken {
  accessToken: string;
  scope: string;
  token_type: string;
}

export interface DecodedToken {
  payload: {
    username: string;
    email: string;
    exp: number;
  };
}

export interface SessionStore {
  user: UserObject | null;
  setUser: (user: UserObject) => void;
  deleteUser: () => void;
}

export interface BetterAuthUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  userId?: string | null;
}
