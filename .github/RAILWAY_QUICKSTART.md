# Railway Deployment Quick Start

> **No Railway CLI needed!** Everything runs via GitHub Actions.

## What's Configured

✅ GitHub Actions workflow to deploy all services to Railway
✅ Railway configuration files for each service
✅ `serve` package added to dependencies for static file serving

## Services Being Deployed

1. **api-gateway** - NestJS API (port: $PORT from Railway)
2. **website** - React frontend (served via `serve`)
3. **storybook** - Component library docs (served via `serve`)

## Setup Steps (5 minutes - No CLI Required!)

### 1. Install Dependencies

```bash
pnpm install
```

This installs the `serve` package needed for Railway deployments.

### 2. Create Railway Project & Services

1. Go to https://railway.app/dashboard
2. Click "New Project" → "Empty Project"
3. Name it (e.g., "alanspurlock-profile")
4. Click "New" → "Empty Service" three times to create:
   - Service 1: Name it `api-gateway`
   - Service 2: Name it `website`
   - Service 3: Name it `storybook`

**Important**: Use these exact names (lowercase, with hyphen for api-gateway)

### 3. Set Root Directories in Railway

For each service, go to Settings → General → Root Directory:

- **api-gateway**: `apps/api-gateway`
- **website**: `apps/frontend`
- **storybook**: `libs/spurlock-ui`

Each service has a `railway.json` file that handles build/start commands automatically.

### 4. Get Railway Token

1. Go to https://railway.app/account/tokens
2. Click "Create Token"
3. Name it "GitHub Actions"
4. Copy the token

### 5. Add GitHub Secret

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `RAILWAY_TOKEN`
4. Value: Paste your Railway token
5. Click "Add secret"

### 6. Add Environment Variables (Optional)

If your API needs environment variables (database URLs, API keys, etc.):

1. Go to Railway → Select Service → Variables tab
2. Add each variable
3. The `$PORT` variable is automatically provided by Railway

### 7. Deploy!

**Push to main** (triggers automatic deployment):

```bash
git add .
git commit -m "Configure Railway deployment"
git push origin main
```

**Or manually trigger**:

1. Go to GitHub → Actions
2. Select "Deploy to Railway"
3. Click "Run workflow"
4. Select branch and click "Run workflow"

GitHub Actions will build everything and deploy all three services automatically!

## Verify Deployment

1. Check GitHub Actions to see the deployment progress
2. Check Railway dashboard to see all three services online
3. Click on each service to get its public URL

## Troubleshooting

### Build fails

- Run `pnpm build:api`, `pnpm build`, and `pnpm build:storybook` locally first
- Check GitHub Actions logs for errors

### Service won't start

- Check Railway service logs
- Verify root directory is set correctly
- Verify `railway.json` exists in each service directory

### Port issues

- Railway automatically provides `$PORT` environment variable
- API already uses `process.env.PORT || 3000`
- Frontend/Storybook use `serve -p $PORT`

## File Structure

```
.github/
├── workflows/
│   ├── ci.yml                  # Lint & build verification
│   ├── deploy-netlify.yml      # Deploy frontend to Netlify
│   └── deploy-railway.yml      # Deploy all services to Railway
├── CICD_SETUP.md               # Netlify setup instructions
├── RAILWAY_SETUP.md            # Detailed Railway setup instructions
└── RAILWAY_QUICKSTART.md       # This file

apps/
├── api-gateway/
│   └── railway.json            # Railway config for API
└── frontend/
    └── railway.json            # Railway config for website

libs/
└── spurlock-ui/
    └── railway.json            # Railway config for Storybook
```

## Next Steps

Once deployed:

- Configure custom domains in Railway (optional)
- Set up environment-specific variables
- Configure CORS in API to allow your Railway website URL
- Update any hardcoded URLs in your frontend to use Railway API URL
