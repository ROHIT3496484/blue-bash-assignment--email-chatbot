# Micro-Frontend Architecture - Quick Start Guide

This project demonstrates a production-ready micro-frontend architecture using Next.js and Module Federation.

## Project Structure

\`\`\`
├── app/                    # Host application (Port 3000)
├── chat/                   # Chat micro-frontend (Port 3001)
├── email/                  # Email micro-frontend (Port 3002)
└── components/ui/          # Shared UI components
\`\`\`

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation & Setup

### 1. Install Dependencies

\`\`\`bash
# Install host dependencies
npm install

# Install chat app dependencies
cd chat && npm install && cd ..

# Install email app dependencies
cd email && npm install && cd ..
\`\`\`

### 2. Run All Applications

You need to run three separate development servers in different terminals:

**Terminal 1 - Host Application (Port 3000):**
\`\`\`bash
npm run dev
\`\`\`

**Terminal 2 - Chat Micro-Frontend (Port 3001):**
\`\`\`bash
cd chat && npm run dev
\`\`\`

**Terminal 3 - Email Micro-Frontend (Port 3002):**
\`\`\`bash
cd email && npm run dev
\`\`\`

### 3. Access the Application

Open your browser and navigate to:
- **Host Application**: http://localhost:3000
- **Chat App (standalone)**: http://localhost:3001
- **Email App (standalone)**: http://localhost:3002

## Features

- **Module Federation**: Seamless micro-frontend integration
- **Shared Design System**: Consistent styling across all apps
- **Independent Deployment**: Each app can be deployed separately
- **Real-time Communication**: Chat and email functionality
- **Responsive Design**: Works on all screen sizes

## How It Works

1. The **Host Application** (port 3000) acts as the main container
2. **Chat** and **Email** micro-frontends are loaded dynamically via Module Federation
3. Each micro-frontend can be developed and deployed independently
4. All apps share the same design system and UI components

## Troubleshooting

### Port Already in Use
If a port is already in use, you can specify a different port:
\`\`\`bash
npm run dev -- -p 3003
\`\`\`

### Module Federation Not Loading
- Ensure all three applications are running
- Check browser console for errors
- Clear `.next` folders and rebuild:
  \`\`\`bash
  rm -rf .next chat/.next email/.next
  npm run build
  cd chat && npm run build && cd ..
  cd email && npm run build && cd ..
  \`\`\`

### Styling Issues
- Ensure `globals.css` is imported in each app's layout
- Check that Tailwind CSS is properly configured
- Clear browser cache and hard refresh

## Building for Production

\`\`\`bash
# Build host
npm run build

# Build chat
cd chat && npm run build && cd ..

# Build email
cd email && npm run build && cd ..
\`\`\`

## Deployment

Each application can be deployed independently to Vercel, AWS, or any hosting platform that supports Next.js.

For Vercel deployment:
\`\`\`bash
vercel deploy
\`\`\`

## Architecture Benefits

- **Scalability**: Add new micro-frontends without affecting existing ones
- **Team Independence**: Different teams can work on different micro-frontends
- **Technology Flexibility**: Each micro-frontend can use different versions of libraries
- **Faster Development**: Smaller codebases are easier to maintain and test
- **Independent Deployment**: Deploy updates without redeploying the entire application

## Next Steps

1. Explore the chat and email applications
2. Modify components to customize the UI
3. Add new features to individual micro-frontends
4. Deploy to production when ready
