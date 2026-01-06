import { convexBetterAuthNextJs } from '@convex-dev/better-auth/nextjs';
import { env } from '@/lib/env';

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: env.NEXT_PUBLIC_CONVEX_URL || 'http://localhost:3000',
  convexSiteUrl: env.CONVEX_SITE_URL || 'http://localhost:3000',
});
