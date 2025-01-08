'use client';

import { Spinner } from '@/components/spinner';
import { useAuth } from '@/components/providers/auth-provider';

import Navigation from './_components/navigation';
import React from 'react';
//import { SearchCommand } from "@/components/search-command";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    /** add user info */
  }
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
  }
  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      {/**
       <SearchCommand />
       */}
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}