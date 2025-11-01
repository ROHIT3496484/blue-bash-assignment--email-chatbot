# Email & Chat Platform

A modern communication platform combining Gmail-style email management with an AI-powered chatbot, built with Next.js and designed with micro-frontend principles.

## What's Inside

- **Gmail-Like Email App**: Full-featured email client with all the tools you need to stay organized
- **AI Chat Assistant**: Chat with an intelligent assistant that understands your messages
- **Draggable Chat Widget**: Floating chat box you can move anywhere on your screen
- **Beautiful Design**: Clean, modern interface inspired by Gmail
- **Real-Time Responses**: Get instant AI-powered chat responses

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm or yarn

### Quick Start

1. Clone the project:
   \`\`\`bash
   git clone https://github.com/ROHIT3496484/blue-bash-assignment--email-chatbot/
   cd email-chat-platform
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install --legacy-peer-deps
   npm cache clean --force
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser and start using the app!

## Features

### Email App
- **All Email Categories**: Inbox, Starred, Snoozed, Important, Sent, Drafts, and more
- **Compose & Send**: Write and send emails with proper validation
- **Organize**: Star, archive, or delete emails with one click
- **Search**: Find emails quickly with the search bar
- **Drafts**: Save your work and come back to it later
- **Sorting**: View emails newest or oldest first
- **Categories**: Automatically organize emails by type (Promotions, Social, Updates, etc.)

### Chat App
- **AI Conversations**: Chat with an intelligent AI assistant
- **Draggable Interface**: Move the chat box anywhere on your screen
- **Full Screen Mode**: Expand chat to see more details
- **Message History**: Your conversation history is saved
- **Always Available**: Chat widget stays accessible while you use email

## How It Works

### Email
The email app works like Gmail - you can compose new messages, read received emails, organize them with stars and archives, and manage drafts. Emails are validated to ensure they have the correct format (username@domain.com).

### Chat
The chat app uses AI to understand what you're asking and provide helpful responses. Just type your question or message and the AI will respond in real-time.

## Project Structure

\`\`\`
├── app/
│   ├── api/              # API endpoints for chat and email
│   ├── page.tsx          # Main app page
│   └── globals.css       # Global styles
├── components/
│   ├── email-app.tsx     # Email application
│   ├── chat-app.tsx      # Chat application
│   ├── floating-chat-widget.tsx  # Draggable chat box
│   └── ui/               # UI components
├── lib/
│   ├── design-system/    # Shared design components
│   ├── event-bus.ts      # Communication between apps
│   └── design-tokens.ts  # Colors and styling
└── README.md             # This file
\`\`\`

## API Endpoints

### Chat Endpoint
- **POST** `/api/chat`
- Send a message and get AI-powered responses

### Email Endpoint
- **POST** `/api/email/send`
- Send emails with validation

## Customization

### Adding More Emails
Edit `components/email-app.tsx` and add more email objects to the `mockEmails` array to populate the inbox with more sample emails.

### Changing Colors
Edit `lib/design-tokens.ts` to customize the color scheme throughout the app.

### Extending Chat
Modify `app/api/chat/route.ts` to change how the chat AI responds.

## Troubleshooting

### Chat Not Responding
- Check your internet connection
- Verify the API is running
- Try clearing your browser cache
- Wait a moment and try again (API might be warming up)

### Emails Not Appearing
- Make sure you're viewing the correct folder
- Check the search bar - clear it if you have a search active
- Refresh the page

### Styling Issues
- Clear your browser cache
- Make sure all dependencies are installed (`npm install`)
- Try restarting the dev server

## Technology Stack

- **Framework**: Next.js 14
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: React hooks + Zustand
- **AI**: Groq API for chat responses
- **Icons**: Lucide React

## Deployment

Ready to go live? Deploy with:

\`\`\`bash
npm run build
npm start
\`\`\`

Or deploy to Vercel with one click - just connect your GitHub repo!

## Need Help?

- Check the documentation files in the repo
- Review the component code - it's well-commented
- Look at the console for error messages
- Create an issue on GitHub

## License

MIT - Feel free to use this project however you like!

## Credits

Built with Next.js, Tailwind CSS, and a passion for clean code.

---

**Ready to get started?** Run `npm run dev` and start exploring!
