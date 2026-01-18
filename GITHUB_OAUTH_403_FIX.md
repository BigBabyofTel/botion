# Fix for 403 Forbidden Error on /api/auth/sign-in/social - COMPLETE ✅

## Problem Identified

From the Vercel logs analysis:

```
POST https://botion-five.vercel.app/api/auth/sign-in/social
Response: 403 Forbidden
Timestamp: 2026-01-18 03:54:55 UTC
```

## Root Cause

Better Auth's origin validation is rejecting the request because:

1. The request comes from `https://botion-five.vercel.app`
2. The `trustedOrigins` configuration doesn't match
3. This happens because Vercel environment variables weren't properly set

## Changes Made

### 1. Fixed `convex/auth.ts`

**File:** `/Users/bigbabyoftel/Documents/GitHub/botion/convex/auth.ts`

Changed from:

```typescript
const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_SITE_URL environment variable is required');
}
```

To:

```typescript
const baseURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://botion-five.vercel.app';
```

**Why:**

- Removed dead code check (after fallback, baseURL is always truthy)
- Changed fallback to production domain instead of localhost
- Removed error throwing to allow Convex deployment

### 2. Created Setup Documentation

**File:** `/Users/bigbabyoftel/Documents/GitHub/botion/VERCEL_ENV_SETUP.md`

Contains step-by-step instructions to set environment variables in Vercel.

## What You Need to Do

### ⚠️ CRITICAL: Set Vercel Environment Variables

Go to **https://vercel.com/projects/botion → Settings → Environment Variables**

Add these for **Production**:

```
NEXT_PUBLIC_SITE_URL=https://botion-five.vercel.app
SITE_URL=https://botion-five.vercel.app
NEXT_PUBLIC_CONVEX_URL=https://fastidious-grouse-706.convex.cloud
CONVEX_SITE_URL=https://fastidious-grouse-706.convex.site
NEXT_PUBLIC_CONVEX_SITE_URL=https://fastidious-grouse-706.convex.site
GITHUB_CLIENT_ID=Ov23liml81gVRWeYW6Dg
GITHUB_CLIENT_SECRET=<your_secret>
EDGE_STORE_ACCESS_KEY=9JiAnRTJi7zMGaOecBIhJMHTM1L962sY
EDGE_STORE_SECRET_KEY=U5aJXhfmawvMTPXFkI6FhPF8PdXsJlpVFilqig2UJqHYZ3du
```

Then **redeploy** or **request production deployment** in Vercel.

### After Setting Variables

1. ✅ Redeploy in Vercel
2. ✅ Wait 2-3 minutes for propagation
3. ✅ Visit https://botion-five.vercel.app/auth/login
4. ✅ Test "Sign in with GitHub"
5. ✅ Should work without 403 error

## Technical Details

### How Better Auth Origin Validation Works

Better Auth compares the request origin against `trustedOrigins`:

```typescript
trustedOrigins: [baseURL]  // From convex/auth.ts
```

| Scenario     | baseURL                          | Request Origin                   | Result            |
|--------------|----------------------------------|----------------------------------|-------------------|
| ❌ Before fix | `http://localhost:3000`          | `https://botion-five.vercel.app` | **403 Forbidden** |
| ✅ After fix  | `https://botion-five.vercel.app` | `https://botion-five.vercel.app` | **Accepted**      |

### Why the Fix Works

1. **Local Development** (`http://localhost:3000`):
    - Uses `.env.local` which sets `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
    - Better Auth trusts `http://localhost:3000` ✅

2. **Production** (`https://botion-five.vercel.app`):
    - Vercel env vars set `NEXT_PUBLIC_SITE_URL=https://botion-five.vercel.app`
    - Better Auth trusts `https://botion-five.vercel.app` ✅
    - If env vars not set, fallback to `https://botion-five.vercel.app` ✅

## Files Changed

1. ✅ `convex/auth.ts` - Updated baseURL fallback
2. ✅ Created `VERCEL_ENV_SETUP.md` - Setup guide
3. ✅ Created `GITHUB_OAUTH_403_FIX.md` - This document

## Verification Checklist

- [ ] Vercel environment variables are set for Production
- [ ] Deployment redeployed or waiting for automatic deploy
- [ ] 2-3 minutes have passed for propagation
- [ ] Visit https://botion-five.vercel.app/auth/login
- [ ] Click "Sign in with GitHub"
- [ ] Successfully redirected to GitHub OAuth (no 403)
- [ ] After approving, successfully authenticated

## Status

✅ **Code fix complete** - Ready for deployment
⏳ **Requires Vercel env vars** - User action needed

