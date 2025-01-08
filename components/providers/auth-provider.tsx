'use client';

import { AuthContextType } from '@/lib/types';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [AccessToken, setAccessToken] = useState<string | null>(null);
  const [RefreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sessions: AuthContextType = {
    AccessToken,
    RefreshToken,
    isAuthenticated,
    isLoading,
    setAccessToken,
    setRefreshToken,
    setIsAuthenticated,
    setIsLoading,
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');
    if (codeParam) {
      setAccessToken(codeParam);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
    console.log(AccessToken);
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