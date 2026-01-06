# GitHub Secrets Setup Guide

This guide will help you add the required environment variables as GitHub Secrets so that CI/CD builds succeed.

## Why This is Needed

The build process needs access to sensitive credentials like EdgeStore API keys. These should never be committed to the
repository, so we use GitHub Secrets instead.

## Required Secrets

Add these secrets to your repository by going to: **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name                   | Description                    | Example                                           |
|-------------------------------|--------------------------------|---------------------------------------------------|
| `CONVEX_DEPLOYMENT`           | Convex deployment ID           | `dev:fastidious-grouse-706`                       |
| `NEXT_PUBLIC_CONVEX_URL`      | Public Convex URL              | `https://fastidious-grouse-706.convex.cloud`      |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | Public Convex site URL         | `https://fastidious-grouse-706.convex.site`       |
| `NEXT_PUBLIC_SITE_URL`        | Your public site URL           | `http://localhost:3000` or your production domain |
| `SITE_URL`                    | Internal site URL              | `http://localhost:3000` or your production domain |
| `EDGE_STORE_ACCESS_KEY`       | EdgeStore API access key       | From EdgeStore dashboard                          |
| `EDGE_STORE_SECRET_KEY`       | EdgeStore API secret key       | From EdgeStore dashboard (keep confidential!)     |
| `GITHUB_CLIENT_ID`            | GitHub OAuth app client ID     | From GitHub app settings                          |
| `GITHUB_CLIENT_SECRET`        | GitHub OAuth app client secret | From GitHub app settings (keep confidential!)     |
| `CONVEX_DEPLOY_KEY`           | Convex deployment key          | From your Convex project                          |

## How to Add Secrets

### Option 1: Using GitHub Web UI (Recommended)

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** button
5. Enter the secret name (e.g., `EDGE_STORE_ACCESS_KEY`)
6. Paste the secret value from your `.env` file
7. Click **Add secret**
8. Repeat for all secrets listed above

### Option 2: Using GitHub CLI

If you have the GitHub CLI installed, you can add secrets using:

```bash
gh secret set EDGE_STORE_ACCESS_KEY --body "9JiAnRTJi7zMGaOecBIhJMHTM1L962sY"
gh secret set EDGE_STORE_SECRET_KEY --body "U5aJXhfmawvMTPXFkI6FhPF8PdXsJlpVFilqig2UJqHYZ3du"
gh secret set CONVEX_DEPLOYMENT --body "dev:fastidious-grouse-706"
# ... etc for all secrets
```

## Security Best Practices

⚠️ **Important:**

- Never commit `.env` files to your repository
- Only add secrets that are truly needed for CI/CD builds
- Use separate secrets for development and production environments
- Rotate secrets periodically
- Never paste secrets in chat/logs/issues

## Troubleshooting

If the build still fails with "Missing EDGE_STORE_ACCESS_KEY":

1. **Verify secrets exist**: Go to Settings → Secrets and verify all secrets are listed
2. **Check CI workflow**: Ensure `.github/workflows/ci.yml` includes all required environment variables
3. **Re-run workflow**: After adding secrets, the next push to `main` branch will use them
4. **Check logs**: View the GitHub Actions logs to see which environment variables are available

## Files Modified

- `.github/workflows/ci.yml` - Updated to pass environment variables to build step
- `.env.example` - Template file showing which environment variables are needed

