# ✅ Quick Start: Add GitHub Secrets

**Time to complete: ~5 minutes**

## Step 1: Go to GitHub Repository Settings

1. Open your GitHub repository in a browser
2. Click **Settings** tab at the top
3. In the left sidebar, click **Secrets and variables**
4. Click **Actions**

## Step 2: Add Each Secret

Click **New repository secret** and add these 10 secrets:

### Infrastructure Secrets

- **CONVEX_DEPLOYMENT**: `dev:fastidious-grouse-706`
- **NEXT_PUBLIC_CONVEX_URL**: `https://fastidious-grouse-706.convex.cloud`
- **NEXT_PUBLIC_CONVEX_SITE_URL**: `https://fastidious-grouse-706.convex.site`
- **CONVEX_DEPLOY_KEY**: `dev:fastidious-grouse-706|eyJ2MiI6IjQ1OGUwYzRlZTk2OTRkN2I5NGY2OWZhMWFhNzVjYjljIn0=`

### Site Configuration

- **NEXT_PUBLIC_SITE_URL**: `http://localhost:3000`
- **SITE_URL**: `http://localhost:3000`

### EdgeStore Secrets (🔒 Keep Secure!)

- **EDGE_STORE_ACCESS_KEY**: `9JiAnRTJi7zMGaOecBIhJMHTM1L962sY`
- **EDGE_STORE_SECRET_KEY**: `U5aJXhfmawvMTPXFkI6FhPF8PdXsJlpVFilqig2UJqHYZ3du`

### GitHub OAuth (🔒 Keep Secure!)

- **GITHUB_CLIENT_ID**: `Ov23liml81gVRWeYW6Dg`
- **GITHUB_CLIENT_SECRET**: `05a6bd83efcff407e00cb047924466145f9e9d6b`

## Step 3: Verify

After adding all 10 secrets, you should see them listed on the Secrets page.

## Step 4: Test

1. Make a small commit and push to `main` branch
2. Go to **Actions** tab
3. Watch the workflow run
4. Build should now succeed! ✨

## ❓ Need Help?

- See `GITHUB_SECRETS_SETUP.md` for detailed instructions
- See `CI_FIX_SUMMARY.md` for technical overview
- Run `bash check-env.sh` locally to verify environment

---

**That's it!** Your CI/CD pipeline should now build successfully. 🎉

