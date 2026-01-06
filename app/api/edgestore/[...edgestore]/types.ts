/**
 * Pure type re-exports for client-side usage.
 * This file only re-exports types from route.ts (which is a server file).
 * This prevents importing router.server.ts directly, which could cause
 * @edgestore/server module to be bundled into client code.
 */

export type { EdgeStoreRouter } from './route';
