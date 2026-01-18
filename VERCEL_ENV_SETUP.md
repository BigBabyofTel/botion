# Vercel Environment Variables - REQUIRED FIX

## Problem

`POST /api/auth/sign-in/social` returns **403 Forbidden** because Better Auth's origin validation is rejecting the
request.

**Root Cause:** Vercel environment variables are not properly configured.

## Solution: Set Environment Variables in Vercel Dashboard

1. Go to: **https://vercel.com/projects/botion** (your project dashboard)
2. Click **Settings** → **Environment Variables**
3. Add the following variables for **Production**:

### Required Production Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://botion-five.vercel.app
SITE_URL=https://botion-five.vercel.app
NEXT_PUBLIC_CONVEX_URL=https://fastidious-grouse-706.convex.cloud
CONVEX_SITE_URL=https://fastidious-grouse-706.convex.site
NEXT_PUBLIC_CONVEX_SITE_URL=https://fastidious-grouse-706.convex.site
```

### GitHub OAuth Secrets (Production)

```
GITHUB_CLIENT_ID=Ov23liml81gVRWeYW6Dg
GITHUB_CLIENT_SECRET=<your_secret_here>
```

### Edge Store Secrets (Production)

```
EDGE_STORE_ACCESS_KEY=9JiAnRTJi7zMGaOecBIhJMHTM1L962sY
EDGE_STORE_SECRET_KEY=U5aJXhfmawvMTPXFkI6FhPF8PdXsJlpVFilqig2UJqHYZ3du
```

## How to Set Them

1. **For each variable**, click **"Add Environment Variable"**
2. **Key:** (e.g., `NEXT_PUBLIC_SITE_URL`)
3. **Value:** (e.g., `https://botion-five.vercel.app`)
4. **Environments:** Select **Production**
5. Click **Save**

## Verify the Fix

After setting the variables:

1. **Redeploy** in Vercel (or wait for automatic deployment)
2. Visit **https://botion-five.vercel.app/auth/login**
3. Click **"Sign in with GitHub"**
4. Should now work without 403 error ✅

## Local Development

Keep `.env.local` as:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_URL=http://localhost:3000
```

This allows local testing on `http://localhost:3000` while production uses the correct domain.

## Why This Fixes the 403 Error

- **Before:** Vercel had no `NEXT_PUBLIC_SITE_URL` set
    - Fallback to `https://botion-five.vercel.app` ✓
    - But Better Auth might not be initializing correctly
    - Result: Origin validation fails → 403 Forbidden ✗

- **After:** Vercel explicitly sets `NEXT_PUBLIC_SITE_URL=https://botion-five.vercel.app`
    - Better Auth initializes with correct trusted origins
    - Request to `/api/auth/sign-in/social` origin matches config
    - Result: Request accepted ✅

## Troubleshooting

If still getting 403 after setting variables:

1. **Hard refresh** your browser (Cmd+Shift+R or Ctrl+Shift+R)
2. **Clear cache:** In Vercel dashboard → Deployments → Redeploy
3. **Wait 2-3 minutes** for environment variables to propagate
4. **Check logs:** Vercel → Analytics → Logs for detailed errors

