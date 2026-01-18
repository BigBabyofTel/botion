'use client';
import { ReactNode } from 'react';
import { ConvexReactClient } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { env } from '@/lib/env';

// Get Convex URL from environment
const getConvexURL = () => {
  if (!env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('NEXT_PUBLIC_CONVEX_URL environment variable is required');
  }
  return env.NEXT_PUBLIC_CONVEX_URL;
};

const convex = new ConvexReactClient(getConvexURL());

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken?: string | null;
}) {
  return (
    <ConvexBetterAuthProvider
      client={convex}
      authClient={authClient}
      initialToken={initialToken}
    >
      {children}
    </ConvexBetterAuthProvider>
  );
}
