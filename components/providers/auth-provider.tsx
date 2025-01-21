'use client';

import { AuthContextType } from '@/lib/types';
import React, { createContext, useState, useContext } from 'react';
import { useSessionStore } from '@/lib/session-store';

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