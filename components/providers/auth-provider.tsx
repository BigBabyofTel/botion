'use client';

import { AuthContextType } from '@/lib/types';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSessionStore } from '@/lib/session-store';
import { getCookie } from 'cookies-next';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [AccessToken, setAccessToken] = useState<string | null>(null);
  const [RefreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { user, setUser } = useSessionStore();

  const sessions: AuthContextType = {
    AccessToken,
    RefreshToken,
    isAuthenticated,
    user,
    setAccessToken,
    setRefreshToken,
    setIsAuthenticated,
    setUser,
  };

  // add condition to check for access token if none then redirect to log in or request it
  useEffect(() => {
    const accessToken = getCookie('accessToken') as string;
    const refreshToken = getCookie('refreshToken') as string;
    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIsAuthenticated(true);
    }
  }, [AccessToken]);

  return (
    <AuthContext.Provider value={sessions}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}