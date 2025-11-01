# Quick Start Guide

## Prerequisites

- Node.js 16+ (Download from https://nodejs.org/)
- npm 8+ (comes with Node.js)
- Git

## Step-by-Step Setup

### 1. Extract the Project

\`\`\`bash
unzip micro-frontend-architecture.zip
cd micro-frontend-architecture
\`\`\`

### 2. Install Dependencies

Run this command in each directory:

\`\`\`bash
# Host Application
cd host
npm install
cd ..

# Chat Micro-Frontend
cd chat-app
npm install
cd ..

# Email Micro-Frontend
cd email-app
npm install
cd ..
\`\`\`

### 3. Start Development Servers

Open three terminal windows and run:

**Terminal 1 - Host (Main Application)**
\`\`\`bash
cd host
npm run dev
\`\`\`
Access at: http://localhost:3000

**Terminal 2 - Chat Micro-Frontend**
\`\`\`bash
cd chat-app
npm run dev
\`\`\`
Access at: http://localhost:3001

**Terminal 3 - Email Micro-Frontend**
\`\`\`bash
cd email-app
npm run dev
\`\`\`
Access at: http://localhost:3002

### 4. Access the Application

Open your browser and go to: **http://localhost:3000**

You should see:
- Dashboard with feature cards
- Navigation to Chat and Email applications
- Fully functional micro-frontend system

## Features to Try

### Chat Application
1. Click "Chat" in the navigation
2. Select a user from the sidebar
3. Type a message and press Enter or click Send
4. See real-time message updates

### Email Application
1. Click "Email" in the navigation
2. Click "Compose" to write a new email
3. Fill in recipient, subject, and message
4. Click "Send" to send the email
5. Click on emails in the list to view details

### Notifications
- Perform actions in Chat or Email
- See notifications appear in the top-right corner
- Notifications auto-dismiss after 3 seconds

## Building for Production

### Build All Applications

\`\`\`bash
# Host
cd host && npm run build && cd ..

# Chat
cd chat-app && npm run build && cd ..

# Email
cd email-app && npm run build && cd ..
\`\`\`

### Run Production Servers

\`\`\`bash
# Terminal 1
cd host && npm start

# Terminal 2
cd chat-app && npm start

# Terminal 3
cd email-app && npm start
\`\`\`

## Project Structure

\`\`\`
micro-frontend-architecture/
├── host/              # Main host application (Port 3000)
├── chat-app/          # Chat micro-frontend (Port 3001)
├── email-app/         # Email micro-frontend (Port 3002)
├── README.md          # Full documentation
└── SETUP_GUIDE.md     # This file
\`\`\`

## Common Issues & Solutions

### Port Already in Use

If a port is already in use, you can change it in webpack.config.js:

\`\`\`javascript
devServer: {
  port: 3000, // Change this number
}
\`\`\`

### Module Not Found Error

Make sure all dependencies are installed:

\`\`\`bash
npm install
\`\`\`

### CORS Errors

This is normal in development. The webpack dev server is configured to handle it.

## Next Steps

1. Explore the code structure
2. Modify components and see hot-reload in action
3. Add new features to existing micro-frontends
4. Create new micro-frontends following the same pattern
5. Deploy to production using Vercel or Docker

## Support

For detailed documentation, see README.md
\`\`\`

Finally, let me create a deployment guide:
