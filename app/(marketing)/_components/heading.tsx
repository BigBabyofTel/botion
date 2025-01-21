'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getGithubAccessToken, getGitHubUser } from '@/app/actions';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';

export const Heading = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  function getCodeFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }

  async function getUser() {
    const codeParam = getCodeFromUrl() as string;
    if (codeParam) {
      const accessToken = await getGithubAccessToken(codeParam);
      if (accessToken.accessToken) {
        const user = await getGitHubUser(accessToken.accessToken);
        console.log(user);
        setUser(user);
      }
    }
    //router.push('/documents');
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
      <Button onClick={getUser}>
        Enter Botion
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};