'use client';
import { ReactNode } from 'react';
import { ConvexReactClient } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { env } from '@/lib/env';

// Ensure we always have a valid URL for ConvexReactClient
const getConvexURL = () => {
  if (env.NEXT_PUBLIC_CONVEX_URL) {
    return env.NEXT_PUBLIC_CONVEX_URL;
  }
  // Build-time fallback
  return 'http://localhost:3000';
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
