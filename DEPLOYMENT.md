# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)

### Step 1: Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit: Micro-frontend architecture"
git branch -M main
git remote add origin https://github.com/yourusername/micro-frontend-architecture.git
git push -u origin main
\`\`\`

### Step 2: Deploy Host Application

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Other" as the framework
4. Set build command: `cd host && npm install && npm run build`
5. Set output directory: `host/dist`
6. Deploy

### Step 3: Deploy Chat Micro-Frontend

1. Create a new Vercel project
2. Same repository, different configuration
3. Set build command: `cd chat-app && npm install && npm run build`
4. Set output directory: `chat-app/dist`
5. Deploy and note the URL (e.g., `chat-app.vercel.app`)

### Step 4: Deploy Email Micro-Frontend

1. Create another Vercel project
2. Set build command: `cd email-app && npm install && npm run build`
3. Set output directory: `email-app/dist`
4. Deploy and note the URL (e.g., `email-app.vercel.app`)

### Step 5: Update Host Configuration

Update `host/webpack.config.js` with production URLs:

\`\`\`javascript
remotes: {
  chat: 'chat@https://chat-app.vercel.app/remoteEntry.js',
  email: 'email@https://email-app.vercel.app/remoteEntry.js',
}
\`\`\`

Redeploy the host application.

## Docker Deployment

### Create Docker Images

**Dockerfile for Host**
\`\`\`dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY host/package*.json ./
RUN npm install
COPY host . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY host/server.js .
COPY host/package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

### Build and Run

\`\`\`bash
# Build
docker build -t micro-frontend-host:latest .

# Run
docker run -p 3000:3000 micro-frontend-host:latest
\`\`\`

## AWS Deployment

### Using AWS Amplify

1. Connect GitHub repository to AWS Amplify
2. Create separate apps for each micro-frontend
3. Configure build settings for each
4. Enable auto-deployment on push

### Using EC2

1. Launch EC2 instance (Ubuntu 20.04)
2. Install Node.js and npm
3. Clone repository
4. Install dependencies
5. Build applications
6. Use PM2 for process management

\`\`\`bash
npm install -g pm2

pm2 start host/server.js --name "host"
pm2 start chat-app/server.js --name "chat"
pm2 start email-app/server.js --name "email"

pm2 save
pm2 startup
\`\`\`

## Environment Variables

Create `.env` files for each application:

**host/.env**
\`\`\`
REACT_APP_CHAT_URL=https://chat-app.vercel.app
REACT_APP_EMAIL_URL=https://email-app.vercel.app
\`\`\`

**chat-app/.env**
\`\`\`
REACT_APP_API_URL=https://api.example.com
\`\`\`

**email-app/.env**
\`\`\`
REACT_APP_API_URL=https://api.example.com
\`\`\`

## Performance Optimization

### 1. Enable Gzip Compression

In webpack.config.js:
\`\`\`javascript
output: {
  filename: '[name].[contenthash].js',
  // Gzip is handled by production servers
}
\`\`\`

### 2. Code Splitting

Already configured in Module Federation:
\`\`\`javascript
plugins: [
  new ModuleFederationPlugin({
    // Automatically splits code
  })
]
\`\`\`

### 3. Caching

Set cache headers in production:
\`\`\`javascript
output: {
  filename: '[name].[contenthash].js', // Hash ensures cache busting
}
\`\`\`

## Monitoring & Logging

### Sentry Integration

\`\`\`bash
npm install @sentry/react
\`\`\`

\`\`\`javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
\`\`\`

### Application Performance Monitoring

Use services like:
- New Relic
- Datadog
- CloudWatch (AWS)

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **CORS Configuration**: Restrict origins appropriately
3. **Content Security Policy**: Implement CSP headers
4. **Dependency Updates**: Regularly update dependencies
5. **Environment Variables**: Never commit secrets

## Rollback Strategy

### Using Git Tags

\`\`\`bash
git tag v1.0.0
git push origin v1.0.0

# To rollback
git checkout v1.0.0
npm run build
\`\`\`

### Using Vercel

Vercel automatically keeps deployment history. You can rollback from the dashboard.

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
\`\`\`

## Troubleshooting Deployment

### Issue: Build fails on Vercel

**Solution**: Check build logs and ensure all dependencies are listed in package.json

### Issue: Micro-frontends not loading

**Solution**: Verify remote URLs are correct and accessible

### Issue: Styling not applied

**Solution**: Ensure CSS files are included in build output

## Performance Metrics

Monitor these metrics:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

Use Google Lighthouse to measure performance.
