import { initEdgeStore } from '@edgestore/server';

// Lazy initialization - only create router when first accessed
let edgeStoreRouter: ReturnType<
  ReturnType<typeof initEdgeStore.create>['router']
> | null = null;

function createRouter() {
  const es = initEdgeStore.create();

  return es.router({
    publicFiles: es.fileBucket().beforeDelete(() => {
      return true;
    }),
  });
}

export function getEdgeStoreRouter() {
  if (!edgeStoreRouter) {
    edgeStoreRouter = createRouter();
  }
  return edgeStoreRouter;
}
