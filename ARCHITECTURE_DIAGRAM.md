# 🏗️ Architecture Diagram: EdgeStore Fix

## Before (BROKEN) ❌

```
lib/edgestore.ts (Client Component)
    ↓
    imports type from
    ↓
app/api/edgestore/.../types.ts
    ↓
    contains: initEdgeStore.create()
    ↓
    @edgestore/server module bundled into client code
    ↓
    Build error: Missing EDGE_STORE_ACCESS_KEY
    ↓
❌ FAILS IN GITHUB ACTIONS
```

---

## After (FIXED) ✅

```
lib/edgestore.ts (Client Component)
    ↓
    imports TYPE ONLY from
    ↓
app/api/edgestore/.../types.ts
    ├─ Pure type definition
    └─ Safe for client import
         ↓
         imports type from
         ↓
    app/api/edgestore/.../router.server.ts (.server.ts = Server only)
        ├─ Contains: initEdgeStore.create()
        ├─ Next.js won't bundle into client
        └─ Only used by route handler
             ↓
    app/api/edgestore/.../route.ts
        ├─ Server-only route
        ├─ Imports router from router.server.ts
        └─ Handles API requests
             ↓
✅ No server code in client bundle
✅ Client-safe type imports
✅ Build succeeds locally
```

---

## CI/CD Before (BROKEN) ❌

```
GitHub Actions Workflow
    ↓
    Runs: bun run build
    ↓
    Build process starts
    ↓
    Tries to initialize EdgeStore
    ↓
    Needs: EDGE_STORE_ACCESS_KEY
    ↓
    Environment variable NOT available
    ↓
❌ Build fails with credential error
```

---

## CI/CD After (FIXED) ✅

```
GitHub Actions Workflow
    ↓
    Reads: GitHub Secrets (10 values)
    ↓
    Passes to: bun run build
    ├─ env: EDGE_STORE_ACCESS_KEY ✓
    ├─ env: EDGE_STORE_SECRET_KEY ✓
    ├─ env: CONVEX_DEPLOYMENT ✓
    ├─ env: NEXT_PUBLIC_CONVEX_URL ✓
    ├─ env: NEXT_PUBLIC_CONVEX_SITE_URL ✓
    ├─ env: NEXT_PUBLIC_SITE_URL ✓
    ├─ env: SITE_URL ✓
    ├─ env: GITHUB_CLIENT_SECRET ✓
    ├─ env: GITHUB_CLIENT_ID ✓
    └─ env: CONVEX_DEPLOY_KEY ✓
    ↓
    Build process starts
    ↓
    All environment variables available
    ↓
✅ Build succeeds
✅ Deploy to production
```

---

## File Dependency Graph

### OLD (BROKEN)

```
route.ts → types.ts → initEdgeStore (SERVER CODE)
                ↑
                └─ imported by lib/edgestore.ts (CLIENT)
                   
Result: Server code bundled in client ❌
```

### NEW (FIXED)

```
lib/edgestore.ts (CLIENT)
    ↓
    imports TYPE from
    ↓
types.ts (PURE TYPE)
    ↓
    imports TYPE from
    ↓
router.server.ts (SERVER ONLY)
    └─ .server.ts naming prevents client bundling ✅

AND

route.ts (SERVER)
    ↓
    imports ROUTER from
    ↓
router.server.ts (SERVER ONLY)
    ↓
    Contains: initEdgeStore.create()
    ↓
    Only loaded server-side ✅
```

---

## Component Interaction

### Runtime Flow

```
1. User visits botion.com
                ↓
2. Browser loads client code
   (lib/edgestore.ts with type only)
                ↓
3. Client creates EdgeStoreProvider
   (uses type but no server code)
                ↓
4. User uploads file
                ↓
5. Browser calls: /api/edgestore/...
                ↓
6. Next.js routes to: route.ts
                ↓
7. route.ts loads: router.server.ts
   (initializes EdgeStore with credentials)
                ↓
8. Handler processes upload
                ↓
9. File stored in EdgeStore
                ↓
✅ SUCCESS
```

---

## Build Process

### GitHub Actions Build

```
Step 1: Checkout code
Step 2: Setup Bun
Step 3: Install dependencies
Step 4: Lint
Step 5: Build
    ├─ Load environment variables from GitHub Secrets
    │  ├─ EDGE_STORE_ACCESS_KEY ✓
    │  ├─ EDGE_STORE_SECRET_KEY ✓
    │  └─ ... (8 more)
    │
    ├─ Analyze files
    │  ├─ types.ts (pure type - client safe)
    │  ├─ router.server.ts (server only - won't bundle)
    │  └─ route.ts (server route)
    │
    ├─ Build server code
    │  ├─ initEdgeStore.create() executed
    │  ├─ Credentials available ✓
    │  └─ Router created
    │
    ├─ Build client code
    │  ├─ No server code bundled ✓
    │  ├─ Only type imported
    │  └─ Bundle is lean
    │
    └─ ✅ Build succeeds
```

---

## Key Concepts

### 1. `.server.ts` Naming Convention

```
Next.js recognizes .server.ts as server-only code
Won't attempt to bundle into client code
Safe to have server-only dependencies like @edgestore/server
```

### 2. Type-Only Imports

```typescript
// Safe for client (tree-shakeable)
import { type EdgeStoreRouter } from './types';

// NOT safe for client (bundled)
import { edgeStoreRouter } from './types';
```

### 3. GitHub Secrets

```
Stored encrypted in GitHub
Only available to authorized users
Passed to build process via environment
Masked in logs for security
```

---

## Summary

| Aspect              | Before ❌                   | After ✅                         |
|---------------------|----------------------------|---------------------------------|
| **Code Separation** | Server code in client      | Clean separation                |
| **Client Bundle**   | Includes @edgestore/server | Only types                      |
| **Build Process**   | No env vars                | 10 env vars available           |
| **Credentials**     | Not available              | Available from GitHub Secrets   |
| **Type Safety**     | Type imports               | Type imports + server-only code |
| **Result**          | Build fails                | Build succeeds                  |

---

## How It All Works Together

```
┌─────────────────────────────────────────────────────┐
│  Developer writes code with proper separation      │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│  Client components import types only                │
│  Server routes import full router                   │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│  Developer pushes to main branch                    │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│  GitHub Actions triggers                           │
│  Loads 10 secrets from GitHub                      │
│  Passes them to build process                      │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│  Build process runs with all env vars               │
│  Client code: clean, no server deps                │
│  Server code: full access to credentials           │
└─────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────┐
│  ✅ Build succeeds!                                │
│  App deployed to production                        │
└─────────────────────────────────────────────────────┘
```

---

Perfect architecture = Happy deployments! 🎉

