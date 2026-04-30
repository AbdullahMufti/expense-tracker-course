Deploy the application to staging by running quality checks, building the production bundle, and pushing to the staging branch.

## Steps

Execute the following steps **in order**, stopping immediately if any step fails and reporting the error to the user.

### 1. Quality checks

This project has no test suite. Run linting as the quality gate:

```bash
npm run lint
```

If lint fails, report the errors and do NOT proceed. Ask the user to fix them first.

### 2. Production build

```bash
npm run build
```

Confirm the `dist/` folder was created and report the output bundle size from the Vite build summary.

### 3. Push to staging

Stage everything and push to the `staging` branch:

```bash
git add -A
git stash  # stash any uncommitted changes so we work from committed state
git push origin master:staging --force-with-lease
git stash pop  # restore any stashed changes
```

> If the `staging` remote branch does not exist yet, create it with:
> `git push origin master:staging`

### Completion

Report a summary:
- Lint: passed
- Build: passed (include bundle size)
- Staging push: success (include the branch name and commit SHA)
