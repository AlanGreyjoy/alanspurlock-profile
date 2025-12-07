# GitHub Actions Workflows Documentation

This project uses an optimized CI/CD pipeline with three separate workflows for different purposes.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Pull Request                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ├─► CI Workflow (ci.yml)
                           │   └─► Lint & Build All
                           │
                           └─► Netlify Deployment (deploy-netlify.yml)
                               └─► Preview Deployment + PR Comment

┌─────────────────────────────────────────────────────────┐
│                    Push to Main                          │
└─────────────────────────────────────────────────────────┘
                           │
                           ├─► CI Workflow (ci.yml)
                           │   └─► Lint & Build All
                           │
                           ├─► Netlify Deployment (deploy-netlify.yml)
                           │   └─► Production Deployment
                           │
                           └─► Railway Deployment (deploy-railway.yml)
                               ├─► Build Job (once)
                               └─► Deploy Jobs (parallel matrix)
                                   ├─► api-gateway
                                   ├─► website
                                   └─► storybook
```

## Workflows

### 1. CI Workflow (`ci.yml`)

**Purpose**: Quality assurance - ensures all code is linted and builds successfully

**Triggers**:

- All pull requests to `main`
- All pushes to `main`

**Jobs**:

1. **lint-and-build**
   - Lints entire codebase
   - Builds API Gateway (`pnpm build:api`)
   - Builds Frontend (`pnpm build`)
   - Builds Storybook (`pnpm build:storybook`)
   - Verifies all build artifacts exist

**Why separate?**

- Runs on every PR to catch issues early
- Faster feedback than waiting for deployments
- Can fail independently of deployment workflows

---

### 2. Netlify Deployment (`deploy-netlify.yml`)

**Purpose**: Deploy frontend application to Netlify with PR previews

**Triggers**:

- Pull requests to `main` (when frontend or libs change)
- Push to `main` (when frontend or libs change)
- Manual workflow dispatch

**Jobs**:

1. **deploy**
   - Builds frontend only
   - Deploys to Netlify
   - Creates preview URL for PRs
   - Comments on PR with preview link
   - Deploys to production on main

**Path Filters**:

```yaml
paths:
  - 'apps/frontend/**'
  - 'libs/**'
  - 'package.json'
  - 'pnpm-lock.yaml'
```

**Secrets Required**:

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

---

### 3. Railway Deployment (`deploy-railway.yml`)

**Purpose**: Deploy all services to Railway production environment

**Triggers**:

- Push to `main` (when apps or libs change)
- Manual workflow dispatch

**Jobs**:

#### Job 1: Build (Sequential)

- Installs dependencies once
- Builds all three projects:
  - API Gateway
  - Website
  - Storybook
- Uploads build artifacts for deployment jobs

#### Job 2: Deploy (Parallel Matrix)

Uses a **matrix strategy** to deploy all services simultaneously:

```yaml
strategy:
  matrix:
    service:
      - name: api-gateway
        root: apps/api-gateway
      - name: website
        root: apps/frontend
      - name: storybook
        root: libs/spurlock-ui
  fail-fast: false
```

Each service:

- Downloads build artifacts
- Deploys to Railway independently
- Continues even if another service fails (`fail-fast: false`)

**Path Filters**:

```yaml
paths:
  - 'apps/**'
  - 'libs/**'
  - 'package.json'
  - 'pnpm-lock.yaml'
  - '.github/workflows/deploy-railway.yml'
```

**Secrets Required**:

- `RAILWAY_TOKEN`

**Important**: No Railway CLI is needed locally. The Railway CLI is installed and used within the GitHub Actions runner to deploy the services. All deployments happen automatically via GitHub Actions.

---

## Workflow Optimization Strategies

### 1. **Separation of Concerns**

- CI is separate from CD (deployment)
- Each deployment target has its own workflow
- Easy to debug and maintain

### 2. **Path Filtering**

- Workflows only run when relevant files change
- Saves CI minutes and speeds up feedback

### 3. **Caching**

- pnpm store is cached across all workflows
- Same cache key: `${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}`
- Reduces install time from ~2min to ~30sec

### 4. **Matrix Strategy (Railway)**

- Build once, deploy three services in parallel
- Reduces total deployment time by ~60%
- Independent failure handling per service

### 5. **Build Artifacts**

- Railway workflow uses GitHub Actions artifacts
- Build job uploads, deploy jobs download
- Avoids rebuilding three times

### 6. **Fail-Fast: False**

- Railway deployments continue even if one service fails
- Allows partial deployments (e.g., API succeeds, frontend fails)
- Better for debugging deployment issues

---

## Workflow Comparison

| Feature          | CI  | Netlify | Railway |
| ---------------- | --- | ------- | ------- |
| Runs on PR       | ✅  | ✅      | ❌      |
| Runs on Main     | ✅  | ✅      | ✅      |
| Builds API       | ✅  | ❌      | ✅      |
| Builds Frontend  | ✅  | ✅      | ✅      |
| Builds Storybook | ✅  | ❌      | ✅      |
| Deploys          | ❌  | ✅      | ✅      |
| PR Comments      | ❌  | ✅      | ❌      |
| Matrix Strategy  | ❌  | ❌      | ✅      |
| Artifacts        | ❌  | ❌      | ✅      |

---

## Manual Triggering

All workflows support manual triggers via `workflow_dispatch`:

1. Go to GitHub → Actions
2. Select the workflow
3. Click "Run workflow"
4. Select branch
5. Click "Run workflow" button

---

## Debugging Workflows

### CI Fails

1. Check the lint output for code style issues
2. Check each build step for errors
3. Verify all dependencies are in `package.json`

### Netlify Deployment Fails

1. Check if frontend builds locally: `pnpm build`
2. Verify Netlify secrets are set correctly
3. Check Netlify dashboard for deployment logs

### Railway Deployment Fails

1. Check if all builds work locally:
   - `pnpm build:api`
   - `pnpm build`
   - `pnpm build:storybook`
2. Verify `RAILWAY_TOKEN` secret is set
3. Check Railway dashboard logs for each service
4. Verify service names match exactly:
   - `api-gateway`
   - `website`
   - `storybook`
5. Check that `railway.json` files exist in each service root

---

## Performance Metrics

Typical execution times:

| Workflow                     | Cold Cache | Warm Cache |
| ---------------------------- | ---------- | ---------- |
| CI                           | ~4 min     | ~2 min     |
| Netlify                      | ~2 min     | ~1 min     |
| Railway Build                | ~3 min     | ~1.5 min   |
| Railway Deploy (per service) | ~1 min     | ~1 min     |
| **Total Railway**            | ~6 min     | ~4.5 min   |

**Note**: Railway deploys run in parallel, so total time is Build + Deploy, not Build + (Deploy × 3)

---

## Future Improvements

Potential optimizations for consideration:

1. **Composite Actions**

   - Extract common setup steps (node, pnpm, cache) into reusable composite action
   - Reduces duplication across workflows

2. **Test Coverage**

   - Add unit/integration tests to CI workflow
   - Generate and upload coverage reports

3. **Docker Caching**

   - If using Docker, add layer caching
   - Speeds up container builds

4. **Deployment Notifications**

   - Add Slack/Discord notifications for deployment status
   - Alert on failures

5. **Environment-Specific Deployments**
   - Add staging environment
   - Deploy to staging on develop branch
   - Deploy to production on main branch

---

## Setup Instructions

For detailed setup instructions, see:

- [Netlify Setup](.github/CICD_SETUP.md)
- [Railway Setup](.github/RAILWAY_SETUP.md)
- [Railway Quick Start](.github/RAILWAY_QUICKSTART.md)
