'use client';

import { AuthContextType, UserObject } from '@/lib/types';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSessionStore } from '@/lib/session-store';
import { getCookie } from 'cookies-next';
import * as U from '@/services/user.service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    setAccessToken,
    setRefreshToken,
    AccessToken,
    RefreshToken,
    deleteToken,
    deleteUser,
  } = useSessionStore();

  const sessions: AuthContextType = {
    AccessToken,
    RefreshToken,
    isAuthenticated,
    user,
    setAccessToken,
    setRefreshToken,
    setIsAuthenticated,
    setUser,
    deleteToken,
    deleteUser,
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

  useEffect(() => {
    async function fetchData(AccessToken: string) {
      const data = (await U.user.decodeAccessToken(AccessToken)) as UserObject;
      setUser(data);
    }

    void fetchData(AccessToken as string);
  }, [AccessToken, setUser]);

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