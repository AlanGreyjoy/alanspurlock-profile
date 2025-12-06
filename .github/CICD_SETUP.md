# CI/CD Setup Instructions

This project uses GitHub Actions to automatically build, lint, and deploy to Netlify.

## GitHub Secrets Required

You need to add the following secrets to your GitHub repository:

### 1. NETLIFY_AUTH_TOKEN

1. Go to Netlify → User Settings → Applications
2. Click "New access token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token
5. Go to your GitHub repo → Settings → Secrets and variables → Actions
6. Click "New repository secret"
7. Name: `NETLIFY_AUTH_TOKEN`
8. Value: Paste the token from Netlify

### 2. NETLIFY_SITE_ID

1. Go to your Netlify site dashboard
2. Go to Site settings → General → Site details
3. Copy the "Site ID" (or "API ID")
4. Go to your GitHub repo → Settings → Secrets and variables → Actions
5. Click "New repository secret"
6. Name: `NETLIFY_SITE_ID`
7. Value: Paste the Site ID from Netlify

## How It Works

### On Pull Requests:

- ✅ Installs dependencies
- ✅ Runs linting
- ✅ Builds the project
- ✅ Creates a Netlify preview deployment
- ✅ Comments on the PR with the preview URL

### On Push to Main:

- ✅ Installs dependencies
- ✅ Runs linting
- ✅ Builds the project
- ✅ Deploys to production on Netlify

## Workflow File

The workflow is located at: `.github/workflows/deploy.yml`

## Testing

Once you've set up the secrets:

1. Create a new branch
2. Make a change
3. Push and create a PR
4. The workflow will run automatically
5. Check the "Actions" tab in GitHub to see the progress

## Troubleshooting

- If deployment fails, check that both secrets are set correctly
- Make sure your Netlify site is connected to the correct repository
- Check the Actions logs for detailed error messages
