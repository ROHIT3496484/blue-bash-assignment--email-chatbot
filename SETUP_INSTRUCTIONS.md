# Detailed Setup Instructions

## System Requirements

- Node.js 18.17 or later
- npm 9+ or yarn 3+
- Git
- A code editor (VS Code recommended)

## Step-by-Step Setup

### Step 1: Clone or Download the Repository

\`\`\`bash
git clone <repository-url>
cd micro-frontend-architecture
\`\`\`

### Step 2: Install Root Dependencies

\`\`\`bash
npm install
\`\`\`

This installs dependencies for the host application.

### Step 3: Install Micro-Frontend Dependencies

\`\`\`bash
# Chat app
cd chat
npm install
cd ..

# Email app
cd email
npm install
cd ..
\`\`\`

### Step 4: Verify Installation

Check that all dependencies are installed correctly:

\`\`\`bash
# Check host
npm list next

# Check chat
cd chat && npm list next && cd ..

# Check email
cd email && npm list next && cd ..
\`\`\`

### Step 5: Start Development Servers

Open three terminal windows and run:

**Terminal 1:**
\`\`\`bash
npm run dev
# Output: ▲ Next.js 15.x.x
# - Local: http://localhost:3000
\`\`\`

**Terminal 2:**
\`\`\`bash
cd chat && npm run dev
# Output: ▲ Next.js 15.x.x
# - Local: http://localhost:3001
\`\`\`

**Terminal 3:**
\`\`\`bash
cd email && npm run dev
# Output: ▲ Next.js 15.x.x
# - Local: http://localhost:3002
\`\`\`

### Step 6: Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Open Chat" to load the chat micro-frontend
3. Click "Open Email" to load the email micro-frontend
4. Test the functionality of each app

## Common Issues & Solutions

### Issue: "Port 3000 is already in use"

**Solution:**
\`\`\`bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3003
\`\`\`

### Issue: "Module not found" errors

**Solution:**
\`\`\`bash
# Clear all node_modules and reinstall
rm -rf node_modules chat/node_modules email/node_modules
npm install
cd chat && npm install && cd ..
cd email && npm install && cd ..
\`\`\`

### Issue: "Cannot find module 'chat/app'"

**Solution:**
- Ensure the chat app is running on port 3001
- Check that `chat/next.config.mjs` has the correct Module Federation configuration
- Clear `.next` folders:
  \`\`\`bash
  rm -rf .next chat/.next email/.next
  \`\`\`

### Issue: Styling not applied

**Solution:**
- Ensure `globals.css` is imported in `app/layout.tsx`
- Check that Tailwind CSS is configured in `next.config.mjs`
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

## File Structure Explanation

\`\`\`
project-root/
├── app/                          # Host application
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main dashboard page
│   └── globals.css              # Global styles
├── chat/                         # Chat micro-frontend
│   ├── app/
│   │   ├── layout.tsx           # Chat layout
│   │   ├── page.tsx             # Chat page
│   │   └── chat-app.tsx         # Chat component
│   ├── lib/
│   │   └── hooks.ts             # Chat hooks
│   ├── next.config.mjs          # Module Federation config
│   ├── package.json
│   └── tsconfig.json
├── email/                        # Email micro-frontend
│   ├── app/
│   │   ├── layout.tsx           # Email layout
│   │   ├── page.tsx             # Email page
│   │   └── email-app.tsx        # Email component
│   ├── lib/
│   │   └── hooks.ts             # Email hooks
│   ├── next.config.mjs          # Module Federation config
│   ├── package.json
│   └── tsconfig.json
├── components/ui/               # Shared UI components
├── lib/                          # Shared utilities
├── next.config.mjs              # Host Module Federation config
├── package.json
└── tsconfig.json
\`\`\`

## Next Steps

1. Customize the chat and email components
2. Add new features to each micro-frontend
3. Implement backend APIs
4. Deploy to production
5. Monitor performance and user feedback
