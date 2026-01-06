import { z } from 'zod';

const envSchema = z.object({
  CONVEX_DEPLOYMENT: z.string().min(1),
  NEXT_PUBLIC_CONVEX_URL: z.string(),
  CONVEX_SITE_URL: z.string(),
  NEXT_PUBLIC_CONVEX_SITE_URL: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string(),
  SITE_URL: z.string(),
  EDGE_STORE_ACCESS_KEY: z.string().min(1),
  EDGE_STORE_SECRET_KEY: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  CONVEX_DEPLOY_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
