import { createAuth } from '../auth';

// Export a static instance for Better Auth schema generation
// This file should only have this auth export for schema generation
export const auth = createAuth({} as any);
