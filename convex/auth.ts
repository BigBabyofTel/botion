import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { createClient, type GenericCtx } from '@convex-dev/better-auth';
import { convex } from '@convex-dev/better-auth/plugins';
import authSchema from './betterAuth/schema';
import { components } from './_generated/api';
import { DataModel } from './_generated/dataModel';
import authConfig from './auth.config';

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  const options: Partial<BetterAuthOptions> = {
    ...authConfig,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
    trustedOrigins: [process.env.NEXT_PUBLIC_SITE_URL!],
    plugins: [
      // The Convex plugin is required for Convex compatibility
      convex({ authConfig }),
    ],
  };

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    options.socialProviders = {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        scope: ['user'],
      },
    };
  }

  return options as BetterAuthOptions;
};

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.

export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
  }
);
export default authComponent;

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx));
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
/*
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
*/