import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';
import { env } from '@/lib/env';

// Ensure we always have a valid absolute URL
const getBaseURL = () => {
  // Use env variable if available
  if (env.NEXT_PUBLIC_SITE_URL) {
    return env.NEXT_PUBLIC_SITE_URL;
  }
  // Fallback to window.location in browser
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Build-time fallback
  return `${process.env.NEXT_PUBLIC_SITE_URL}`;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [convexClient()],
});
