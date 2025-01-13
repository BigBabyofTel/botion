import React from 'react';

export interface AuthContextType {
  AccessToken: string | null;
  RefreshToken: string | null;
  isAuthenticated: boolean;
  user: UserObject | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setUser: React.Dispatch<React.SetStateAction<UserObject | null>>;
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
  login: string | null;
  name: string | null;
  avatar_url: string | null;
  email: string | null;
}

export interface GithubAccessToken {
  accessToken: string;
  scope: string;
  token_type: string;
}