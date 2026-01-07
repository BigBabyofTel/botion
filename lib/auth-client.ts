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
  return 'http://localhost:3000';
};

let _authClient: ReturnType<typeof createAuthClient> | null = null;

export const authClient = new Proxy({} as ReturnType<typeof createAuthClient>, {
  get(_target, prop) {
    if (!_authClient) {
      // Lazy initialization - only create when first accessed
      const baseURL = getBaseURL();

      _authClient = createAuthClient({
        baseURL,
        plugins: [convexClient()],
      });
    }
    return _authClient[prop as keyof typeof _authClient];
  },
});
