import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';
import { env } from '@/lib/env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  plugins: [convexClient()],
});

export function useAuth() {
  return {
    signIn: authClient.signIn.email,
    signOut: authClient.signOut,
    getSession: authClient.getSession,
  };
}
