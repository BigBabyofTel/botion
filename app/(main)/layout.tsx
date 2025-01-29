'use client';

import { Spinner } from '@/components/spinner';
import { useAuth } from '@/components/providers/auth-provider';

import Navigation from './_components/navigation';
import React from 'react';
import { user } from '@/services/user.service';
//import { SearchCommand } from "@/components/search-command";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    /** add user info */
  }

  const isAuthenticated = user.getIsAuthenticated;

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