'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

const Heading = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await authClient.getSession();
        console.log('Session response:', result);
        // The result should have data.user if authenticated
        const hasUser = result?.data?.user;
        setIsAuthenticated(!!hasUser);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  function enterBotion() {
    if (isAuthenticated) {
      router.push('/documents');
    } else {
      router.push('/auth/signup');
    }
  }

  if (loading) return null;

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Work, Thoughts, & Plans. Coalesced. Welcome to{' '}
        <span className="underline">Botion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Botion is a connected workspace where great, gratuitous work happens.
      </h3>
      <Button onClick={enterBotion}>
        Enter Botion
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
export default Heading;
