'use client';

//needs auth added, sign in and sign out features
import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
//import { Spinner } from "@/components/spinner";
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const scrolled = useScrollTop();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await authClient.getSession();
        setAuthenticated(!!session.data?.user);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setAuthenticated(false);
    redirect('/');
  };

  if (loading) return null;

  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <div onClick={() => redirect('/')}>
        <Logo />
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {/** add spinner */}

        {!authenticated && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => redirect('/auth/login')}
            >
              Log in
            </Button>

            <Button size="sm" onClick={() => redirect('/auth/signup')}>
              Get Botion free
            </Button>
          </>
        )}
        {authenticated && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Botion</Link>
            </Button>
            <Button size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
