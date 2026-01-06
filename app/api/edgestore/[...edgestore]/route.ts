import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { NextRequest } from 'next/server';
import { getEdgeStoreRouter } from './router.server';

// Lazy initialization - only create handler when first accessed at runtime
let cachedHandler: ReturnType<typeof createEdgeStoreNextHandler> | null = null;

function getHandler() {
  if (!cachedHandler) {
    cachedHandler = createEdgeStoreNextHandler({
      router: getEdgeStoreRouter(),
    });
  }
  return cachedHandler;
}

// Export handlers that lazily initialize on first request
export const GET = (request: NextRequest) => getHandler()(request);
export const POST = (request: NextRequest) => getHandler()(request);

export type EdgeStoreRouter = ReturnType<typeof getEdgeStoreRouter>;
