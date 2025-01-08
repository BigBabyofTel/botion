import React from 'react';

export interface AuthContextType {
  AccessToken: string | null;
  RefreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setIsLoading: (loading: boolean) => void;
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