import { Navbar } from './_components/navbar';
import React from 'react';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1f1f1f]" suppressHydrationWarning>
      <Navbar />
      <main className="h-full pt-40 dark:bg-[#1f1f1f]">{children}</main>
    </div>
  );
};

export default MarketingLayout;