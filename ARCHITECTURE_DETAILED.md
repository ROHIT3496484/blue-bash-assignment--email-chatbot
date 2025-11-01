# How Everything Works Together

This guide explains how the email and chat apps work together and how to extend the system.

## System Overview

Think of this project as two separate applications that live in one place:

1. **Email App** - Handles all your email needs
2. **Chat App** - Provides AI-powered conversations
3. **Connection Layer** - Allows them to communicate

## The Three Layers

### 1. User Interface Layer

This is what you see and interact with:

- **Email App** (`components/email-app.tsx`): The Gmail-like interface with folders, email list, and compose window
- **Chat App** (`components/chat-app.tsx`): The conversation interface in the floating widget
- **UI Components** (`components/ui/`): Buttons, inputs, cards, etc. that everything uses

### 2. Application Logic Layer

This is where the work happens:

- **Chat API** (`app/api/chat/route.ts`): Handles your messages and gets responses from AI
- **Email API** (`app/api/email/send/route.ts`): Validates and processes email sending

### 3. Communication & Shared Resources

This allows different parts to work together:

- **Event Bus** (`lib/event-bus.ts`): A messaging system where apps can send notifications to each other
- **Design System** (`lib/design-system/`): Shared buttons, inputs, and styling that both apps use
- **Design Tokens** (`lib/design-tokens.ts`): Centralized colors, spacing, and font sizes

## How Email Works

1. You open the app - the email list appears
2. You see sample emails in your inbox
3. You click an email to read it
4. You can star, archive, or delete emails
5. You can compose new emails and send them
6. Emails get validated (must be user@domain.com format)
7. Sent emails appear in your "Sent" folder

## How Chat Works

1. You click the chat button in the bottom right
2. The chat window opens (you can drag it around)
3. You type a message and press send
4. Your message goes to the AI API
5. The AI responds with a helpful answer
6. You see the response in real-time
7. You can continue the conversation

## Communication Between Apps

The Event Bus is like a messenger service:

\`\`\`
Email App sends event:
  "Someone starred an email!"
  
Other apps listening:
  "Oh, I heard that! Let me update my display."
\`\`\`

### Available Events

- `EMAIL_SENT` - When you send an email
- `EMAIL_STARRED` - When you star/unstar an email
- `EMAIL_ARCHIVED` - When you archive/unarchive an email
- `CHAT_MESSAGE_SENT` - When you send a chat message
- `CHAT_MESSAGE_RECEIVED` - When you get a response

## State Management

### Local State
Each app manages its own data:
- Emails are stored in the Email App
- Chat messages are stored in the Chat App

### Global State
Some data is shared across apps using Zustand:
- User information
- App theme
- Global settings

## Adding a New Feature

### Example: Add a New Email Category

1. **Update the Email App**:
   - Add the category to the sidebar
   - Add a button to filter emails by this category

2. **Update Email Data**:
   - Add the category when creating new emails
   - Update the `getEmailCount()` function to include the new category

3. **Test It**:
   - Create emails with the new category
   - Verify they appear in the new folder

### Example: Connect Chat to Email

1. **Subscribe to Events**:
   \`\`\`typescript
   eventBus.subscribe(Events.EMAIL_SENT, (data) => {
     console.log('New email sent!', data)
   })
   \`\`\`

2. **Publish Events**:
   \`\`\`typescript
   eventBus.publish(Events.EMAIL_SENT, { email: newEmail })
   \`\`\`

## Performance Tips

### Reduce Load Times
- The app only loads emails once on startup
- Chat responses stream in real-time
- UI updates are fast and responsive

### Optimize for Production
- Minimize JavaScript bundle size
- Use CDN for static assets
- Enable caching where possible

## Security Considerations

### Email Validation
- Emails must be in format: user@domain.com
- Input is checked before sending

### API Security
- Chat API has rate limiting
- Email API validates all data

### Data Privacy
- Emails are stored locally in your browser
- No data is sent to external servers (except chat API)

## Debugging

### Enable Debug Logging
Add console.log statements to track what's happening:

\`\`\`typescript
console.log('[v0] Email received:', email)
console.log('[v0] Chat message sent:', message)
\`\`\`

### Check Browser Console
- Open DevTools (F12)
- Go to Console tab
- Look for error messages
- Check network tab to see API calls

### Common Issues

**Chat not responding?**
- Check if API is running
- Look at network tab for failed requests
- Check API response in console

**Emails not saving?**
- Verify email format is correct
- Check browser console for validation errors
- Make sure all fields are filled

**Styling looks wrong?**
- Clear browser cache
- Rebuild the app
- Check design tokens

## Future Improvements

### Planned Features
- Email attachments
- Rich text editor
- Chat message attachments
- Multiple chat conversations
- Email search filters
- Contact suggestions

### Scalability
- Move to distributed micro-frontends
- Add backend database
- Implement real email sending
- Add user authentication

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [Lucide Icons](https://lucide.dev)
