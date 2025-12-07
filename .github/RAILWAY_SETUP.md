# Railway CI/CD Setup Instructions

This project uses GitHub Actions to automatically deploy all services to Railway.

## Services

This monorepo deploys three services to Railway:

1. **api-gateway** - NestJS API backend
2. **website** - React frontend application
3. **storybook** - Component library documentation

## Prerequisites

1. Railway account at https://railway.app
2. GitHub repository with push access

**Note**: No Railway CLI needed locally - everything is done via dashboard + GitHub Actions

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

## Railway Project Setup (Dashboard Only)

**Note**: No Railway CLI needed locally. Everything is done via the dashboard and GitHub Actions.

### Step-by-Step Setup

1. **Create a new project in Railway**

   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Empty Project"
   - Name it (e.g., "alanspurlock-profile")

2. **Create three empty services**

   For each service below, click "New" → "Empty Service" in your Railway project:

   **Service 1: API Gateway**

   - Name: `api-gateway`
   - Go to Settings → General → Root Directory: `apps/api-gateway`
   - The `railway.json` in that directory will handle build/start commands

   **Service 2: Website**

   - Name: `website`
   - Go to Settings → General → Root Directory: `apps/frontend`
   - The `railway.json` in that directory will handle build/start commands

   **Service 3: Storybook**

   - Name: `storybook`
   - Go to Settings → General → Root Directory: `libs/spurlock-ui`
   - The `railway.json` in that directory will handle build/start commands

3. **Important**: Service names must match exactly:

   - `api-gateway` (not "API Gateway" or "api_gateway")
   - `website` (not "Website" or "frontend")
   - `storybook` (not "Storybook")

   These names are used in the GitHub Actions workflow.

## Environment Variables

If your API needs environment variables (database URLs, API keys, etc.), add them in Railway:

1. Go to your service in Railway
2. Click "Variables"
3. Add your environment variables

## How It Works

### On Push to Main:

The Railway deployment uses a **matrix strategy** for optimal performance:

**Build Job** (runs once):

- ✅ Installs dependencies with pnpm
- ✅ Builds all three projects:
  - API Gateway: `pnpm build:api`
  - Website: `pnpm build`
  - Storybook: `pnpm build:storybook`
- ✅ Uploads build artifacts

**Deploy Job** (runs in parallel for each service):

- ✅ Downloads build artifacts
- ✅ Deploys to Railway (3 services deploy simultaneously):
  - `api-gateway`
  - `website`
  - `storybook`

### Automatic Deployment:

Once configured, deployments happen automatically:

1. Push changes to `main` branch
2. If any files in `apps/` or `libs/` changed, the workflow triggers
3. GitHub Actions builds all projects
4. All three services deploy to Railway in parallel

### Manual Trigger:

You can also manually trigger a deployment:

1. Go to GitHub → Actions → "Deploy to Railway"
2. Click "Run workflow"
3. Select the branch and click "Run workflow"
4. All three services will be built and deployed

**No Railway CLI needed on your local machine** - everything runs in GitHub Actions!

## Configuration Files

- **CI Workflow**: `.github/workflows/ci.yml` - Runs linting and builds
- **Railway Deployment**: `.github/workflows/deploy-railway.yml` - Deploys all services
- **API Railway Config**: `apps/api-gateway/railway.json`
- **Frontend Railway Config**: `apps/frontend/railway.json`
- **Storybook Railway Config**: `libs/spurlock-ui/railway.json`

## Testing

Once you've set up the secrets:

1. Push any change to `apps/` or `libs/` on the main branch
2. The workflow will run automatically
3. Check the "Actions" tab in GitHub to see the progress
4. Once complete, check your Railway dashboard for all three deployments

## Troubleshooting

### Build Fails

- Check that builds work locally:
  - `pnpm build:api`
  - `pnpm build`
  - `pnpm build:storybook`
- Ensure all dependencies are in `package.json` (including `serve`)
- Check the Actions logs for detailed error messages

### Deployment Fails

- Verify `RAILWAY_TOKEN` is set correctly in GitHub secrets
- Ensure service names match exactly:
  - `api-gateway`
  - `website`
  - `storybook`
- Check Railway logs for each service to see runtime errors
- Verify the root directory is set correctly for each service in Railway

### puppeteer Issues

If you're using puppeteer, Railway might need additional configuration:

1. In Railway, go to your service → Settings → Variables
2. Add: `PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable`
3. You may need to add a custom Nixpacks configuration for Chrome dependencies

## Port Configuration

Railway automatically sets the `$PORT` environment variable. Each service uses it:

- **API Gateway**: NestJS listens on `process.env.PORT || 3000`
- **Website**: Served via `serve` on `$PORT`
- **Storybook**: Served via `serve` on `$PORT`

Make sure your NestJS main.ts file uses the PORT environment variable:

```typescript
const port = process.env.PORT || 3000;
await app.listen(port);
```

## Alternative: Railway GitHub Integration

Railway also supports direct GitHub integration, but for monorepos, the GitHub Actions approach is recommended as it gives you:

- Better control over build order
- Ability to build all services once
- Parallel deployments
- Easier debugging of build issues
