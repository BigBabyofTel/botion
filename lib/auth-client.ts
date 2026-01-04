import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
});

export function useAuth() {
  return {
    signIn: authClient.signIn.email,
    signOut: authClient.signOut,
    getSession: authClient.getSession,
  };
}

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: 'github',
  });
};
