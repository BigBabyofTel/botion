import { z } from 'zod';

const envSchema = z.object({
  CONVEX_DEPLOYMENT: z.string().optional(),
  NEXT_PUBLIC_CONVEX_URL: z.string().optional(),
  CONVEX_SITE_URL: z.string().optional(),
  NEXT_PUBLIC_CONVEX_SITE_URL: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().optional(),
  SITE_URL: z.string().optional(),
  EDGE_STORE_ACCESS_KEY: z.string().optional(),
  EDGE_STORE_SECRET_KEY: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  CONVEX_DEPLOY_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  ALLOWED_ORIGINS: z.string().optional(),
});

// Parse and validate environment variables
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  throw new Error('Invalid environment variables');
}

// Create a proxy that provides defaults for missing values during build
export const env = new Proxy(parsed.data, {
  get(target, prop) {
    const value = target[prop as keyof typeof target];

    // Return the value if it exists
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }

    // Provide defaults for URL variables during build time
    if (typeof prop === 'string') {
      if (prop === 'SITE_URL' || prop === 'NEXT_PUBLIC_SITE_URL') {
        return 'http://localhost:3000';
      }
      if (
        prop === 'CONVEX_SITE_URL' ||
        prop === 'NEXT_PUBLIC_CONVEX_SITE_URL'
      ) {
        return 'http://localhost:3000';
      }
      if (prop === 'NEXT_PUBLIC_CONVEX_URL') {
        return 'http://localhost:3000';
      }
    }

    return value;
  },
}) as Required<z.infer<typeof envSchema>>;
