'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { getGithubAccessToken, getGitHubUser } from '@/app/actions';

export const Heading = () => {
  const { isAuthenticated } = useAuth();

  async function getUser() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code') as string;
    const accessToken = await getGithubAccessToken(codeParam);
    const user = await getGitHubUser(accessToken.accessToken);
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

      {isAuthenticated && (
        <Button onClick={() => {}}>
          Enter Botion
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};