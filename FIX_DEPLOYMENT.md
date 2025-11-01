# Fixing Deployment Issues

## React Version Mismatch Error

If you see an error like:
\`\`\`
unhandledRejection Error: Minified React error #527
\`\`\`

This means React and React-DOM versions don't match.

### Solution

1. **Delete the lock file:**
   \`\`\`bash
   rm pnpm-lock.yaml
   \`\`\`

2. **Reinstall dependencies:**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Verify versions are correct:**
   \`\`\`bash
   pnpm list react react-dom
   \`\`\`
   Both should show version 18.3.1

4. **Commit and push:**
   \`\`\`bash
   git add pnpm-lock.yaml package.json
   git commit -m "Fix: Sync pnpm lock file with correct React versions"
   git push
   \`\`\`

5. **Redeploy to Vercel:**
   - Go to your Vercel dashboard
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger automatic deployment

## Verification

After deployment, check that:
- Build completes successfully
- No React version mismatch errors
- Chat and Email apps load correctly

## If Issues Persist

1. Clear Vercel cache:
   - Go to Project Settings → Git
   - Click "Clear Build Cache"
   - Redeploy

2. Check environment variables:
   - Ensure all required env vars are set in Vercel dashboard
