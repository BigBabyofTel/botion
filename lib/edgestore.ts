'use client';

import { type EdgeStoreRouter } from '@/app/api/edgestore/[...edgestore]/types';
import { createEdgeStoreProvider } from '@edgestore/react';

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };
