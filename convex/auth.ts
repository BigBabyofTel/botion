import { createClient, type GenericCtx } from '@convex-dev/better-auth';
import authSchema from './betterAuth/schema';
import { components } from './_generated/api';
import { DataModel } from './_generated/dataModel';
import { betterAuth, type BetterAuthOptions } from 'better-auth/minimal';

const getSiteUrl = () => {
  const siteUrl = process.env.SITE_URL;
  if (!siteUrl) {
    throw new Error('SITE_URL environment variable is required');
  }
  return siteUrl;
};

export const createAuthOptions = async (ctx: GenericCtx<DataModel>) => {
  const authConfig = (await import('./auth.config')).default;
  return {
    ...authConfig,
    database: authComponent.adapter(ctx),
    baseURL: getSiteUrl(),
  } satisfies BetterAuthOptions;
};

const authComponent = createClient<DataModel, typeof authSchema>(
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