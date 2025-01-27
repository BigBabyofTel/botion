'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import { decodeAccessToken } from '@/utils/jwt';

export const Heading = () => {
  const { AccessToken } = useAuth();
  const router = useRouter();

  async function enterBotion() {
    if (!AccessToken) {
      return router.push('/login');
    }
    const userData = await decodeAccessToken(AccessToken as string);
    const payload = JSON.stringify(userData.payload);
    sessionStorage.setItem('userData', payload);
    if (AccessToken) {
      sessionStorage.setItem('access_token', AccessToken);
      return router.push('/documents');
    }
  }

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