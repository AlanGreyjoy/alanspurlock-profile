# Railway CI/CD Setup Instructions

This project uses GitHub Actions to automatically deploy the API to Railway.

## Prerequisites

1. Create a Railway account at https://railway.app
2. Create a new project in Railway
3. Add a service in your Railway project (name it `api-gateway`)

## GitHub Secrets Required

### RAILWAY_TOKEN

1. Go to Railway → Account Settings → Tokens
2. Click "Create Token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token
5. Go to your GitHub repo → Settings → Secrets and variables → Actions
6. Click "New repository secret"
7. Name: `RAILWAY_TOKEN`
8. Value: Paste the token from Railway

## Railway Project Setup

### Option 1: Using Railway CLI (Recommended for initial setup)

1. Install Railway CLI locally:

   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:

   ```bash
   railway login
   ```

3. Link your project:

   ```bash
   railway link
   ```

4. Create a service for the API:

   ```bash
   railway service create api-gateway
   ```

5. Set the start command:
   ```bash
   railway service api-gateway --start-command "node dist/apps/api-gateway/main.js"
   ```

### Option 2: Using Railway Dashboard

1. Go to your Railway project dashboard
2. Click "New Service" → "Empty Service"
3. Name it `api-gateway`
4. Go to Settings → Deploy
   - **Start Command**: `node dist/apps/api-gateway/main.js`
   - **Build Command**: Leave empty (GitHub Actions will build)
5. Go to Settings → Variables and add any environment variables your API needs

## Environment Variables

If your API needs environment variables (database URLs, API keys, etc.), add them in Railway:

1. Go to your service in Railway
2. Click "Variables"
3. Add your environment variables

## How It Works

### On Push to Main (API Changes):

- ✅ Installs dependencies
- ✅ Builds the API with `pnpm build:api`
- ✅ Deploys to Railway using Railway CLI

### Manual Trigger:

You can manually trigger a deployment from the Actions tab:

1. Go to GitHub → Actions → "Deploy API to Railway"
2. Click "Run workflow"
3. Select the branch and click "Run workflow"

## Workflow File

The workflow is located at: `.github/workflows/deploy-api.yml`

## Testing

Once you've set up the secrets:

1. Push a change to `apps/api-gateway/` on the main branch
2. The workflow will run automatically
3. Check the "Actions" tab in GitHub to see the progress
4. Once complete, check your Railway dashboard for the deployment

## Troubleshooting

### Build Fails

- Check that `pnpm build:api` works locally
- Ensure all dependencies are in `package.json`
- Check the Actions logs for detailed error messages

### Deployment Fails

- Verify `RAILWAY_TOKEN` is set correctly in GitHub secrets
- Ensure the service name `api-gateway` matches your Railway service
- Check Railway logs for runtime errors

### puppeteer Issues

If you're using puppeteer, Railway might need additional configuration:

1. In Railway, go to your service → Settings → Variables
2. Add: `PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable`
3. You may need to add a custom Nixpacks configuration for Chrome dependencies

## Alternative: Railway GitHub Integration

Railway also supports direct GitHub integration:

1. In Railway, click "New Service" → "GitHub Repo"
2. Connect your repository
3. Select the repo and configure:
   - **Root Directory**: `/` (it's a monorepo)
   - **Build Command**: `pnpm build:api`
   - **Start Command**: `node dist/apps/api-gateway/main.js`
4. Set up environment variables in Railway dashboard

This approach auto-deploys on every push without needing GitHub Actions, but the GitHub Actions approach gives you more control over the deployment process.
