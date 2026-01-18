import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';
import { env } from '@/lib/env';

// Get base URL - prefer environment variable, then window.location for browser
const getBaseURL = () => {
  // Use env variable if available
  if (env.NEXT_PUBLIC_SITE_URL) {
    return env.NEXT_PUBLIC_SITE_URL;
  }
  // Fallback to window.location in browser (always accurate at runtime)
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // This should not happen in normal operation
  throw new Error(
    'Unable to determine base URL. NEXT_PUBLIC_SITE_URL must be set.'
  );
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [convexClient()],
});
