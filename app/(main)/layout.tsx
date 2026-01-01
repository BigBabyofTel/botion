'use client';

import { Spinner } from '@/components/spinner';
import { authClient } from '@/lib/auth-client';

import Navigation from './_components/navigation';
import React, { useEffect, useState } from 'react';
//import { SearchCommand } from "@/components/search-command";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session?.data?.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, []);

  console.log(isAuthenticated, isLoading);

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center dark:bg-[#1f1f1f]">
        <Spinner />
      </div>
    );
  }
  if (isAuthenticated) {
  }
  return (
    <div className="h-dvh flex dark:bg-[#1f1f1f]">
      <Navigation />
      {/**
       <SearchCommand />
       */}
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}
