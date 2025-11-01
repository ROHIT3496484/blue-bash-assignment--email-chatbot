# Communication Layer Guide

## Overview

The micro-frontend architecture uses an **Event Bus** pattern for cross-application communication. This allows the Chat and Email micro-frontends to communicate without direct dependencies.

## Event Bus Architecture

### Core Concept

The Event Bus is a publish-subscribe (pub-sub) pattern that enables:
- **Decoupled Communication**: Apps don't need to know about each other
- **Scalability**: Easy to add new micro-frontends
- **Flexibility**: Any app can publish or subscribe to events

### Implementation

Located in `lib/event-bus.ts`, the Event Bus provides:

\`\`\`typescript
// Subscribe to events
const unsubscribe = eventBus.subscribe('event-name', (data) => {
  console.log('Event received:', data)
})

// Publish events
eventBus.publish('event-name', { key: 'value' })

// Unsubscribe
unsubscribe()
\`\`\`

## Available Events

### Email Events

- **EMAIL_SENT**: Triggered when an email is sent
  \`\`\`typescript
  eventBus.publish(Events.EMAIL_SENT, { 
    email: { id, from, to, subject, body } 
  })
  \`\`\`

- **EMAIL_STARRED**: Triggered when an email is starred/unstarred
  \`\`\`typescript
  eventBus.publish(Events.EMAIL_STARRED, { 
    emailId: string, 
    starred: boolean 
  })
  \`\`\`

- **EMAIL_ARCHIVED**: Triggered when an email is archived/unarchived
  \`\`\`typescript
  eventBus.publish(Events.EMAIL_ARCHIVED, { 
    emailId: string, 
    archived: boolean 
  })
  \`\`\`

- **EMAIL_SELECTED**: Triggered when an email is opened
  \`\`\`typescript
  eventBus.publish(Events.EMAIL_SELECTED, { 
    emailId: string 
  })
  \`\`\`

### Chat Events

- **CHAT_MESSAGE_SENT**: Triggered when user sends a message
  \`\`\`typescript
  eventBus.publish(Events.CHAT_MESSAGE_SENT, { 
    message: string 
  })
  \`\`\`

- **CHAT_MESSAGE_RECEIVED**: Triggered when AI responds
  \`\`\`typescript
  eventBus.publish(Events.CHAT_MESSAGE_RECEIVED, { 
    message: string 
  })
  \`\`\`

### System Events

- **THEME_CHANGED**: Triggered when theme changes
  \`\`\`typescript
  eventBus.publish(Events.THEME_CHANGED, { 
    theme: 'light' | 'dark' 
  })
  \`\`\`

- **USER_LOGGED_IN**: Triggered on user login
  \`\`\`typescript
  eventBus.publish(Events.USER_LOGGED_IN, { 
    user: { id, name, email } 
  })
  \`\`\`

- **USER_LOGGED_OUT**: Triggered on user logout
  \`\`\`typescript
  eventBus.publish(Events.USER_LOGGED_OUT, {})
  \`\`\`

## Usage Examples

### Example 1: Cross-App Notification

When an email is sent, notify the chat app:

\`\`\`typescript
// In Email App
eventBus.publish(Events.EMAIL_SENT, { 
  to: 'user@example.com',
  subject: 'Hello'
})

// In Chat App
eventBus.subscribe(Events.EMAIL_SENT, (data) => {
  console.log(`Email sent to ${data.to}`)
  // Show notification in chat
})
\`\`\`

### Example 2: Shared State Sync

Keep user state synchronized across apps:

\`\`\`typescript
// In any app
import { useSharedState } from '@/lib/design-system'

const MyComponent = () => {
  const { user, setUser } = useSharedState()
  
  const handleLogin = (userData) => {
    setUser(userData)
    eventBus.publish(Events.USER_LOGGED_IN, { user: userData })
  }
  
  return <div>Welcome, {user?.name}</div>
}
\`\`\`

### Example 3: Analytics Tracking

Track user actions across all micro-frontends:

\`\`\`typescript
// Analytics service
eventBus.subscribe(Events.EMAIL_SENT, (data) => {
  analytics.track('email_sent', data)
})

eventBus.subscribe(Events.CHAT_MESSAGE_SENT, (data) => {
  analytics.track('chat_message_sent', data)
})
\`\`\`

## Best Practices

### 1. Type Safety

Always use the predefined event constants:

\`\`\`typescript
// Good
eventBus.publish(Events.EMAIL_SENT, data)

// Bad
eventBus.publish('email-sent', data)
\`\`\`

### 2. Clean Up Subscriptions

Always unsubscribe when components unmount:

\`\`\`typescript
useEffect(() => {
  const unsubscribe = eventBus.subscribe(Events.EMAIL_SENT, handler)
  
  return () => {
    unsubscribe()
  }
}, [])
\`\`\`

### 3. Avoid Circular Dependencies

Don't create event loops:

\`\`\`typescript
// Bad - creates infinite loop
eventBus.subscribe(Events.EMAIL_SENT, () => {
  eventBus.publish(Events.EMAIL_SENT, {})
})
\`\`\`

### 4. Keep Events Focused

Each event should represent a single action:

\`\`\`typescript
// Good
eventBus.publish(Events.EMAIL_SENT, { emailId })
eventBus.publish(Events.EMAIL_STARRED, { emailId })

// Bad
eventBus.publish(Events.EMAIL_ACTION, { 
  type: 'sent', 
  emailId 
})
\`\`\`

## Adding New Events

To add a new event:

1. Add the event constant to `lib/event-bus.ts`:
   \`\`\`typescript
   export const Events = {
     // ... existing events
     NEW_EVENT: "new:event",
   } as const
   \`\`\`

2. Document the event in this guide

3. Publish the event where needed:
   \`\`\`typescript
   eventBus.publish(Events.NEW_EVENT, { data })
   \`\`\`

4. Subscribe to the event in consuming apps:
   \`\`\`typescript
   eventBus.subscribe(Events.NEW_EVENT, (data) => {
     // Handle event
   })
   \`\`\`

## Debugging

To monitor all events in development:

\`\`\`typescript
// Add to your app
Object.values(Events).forEach(event => {
  eventBus.subscribe(event, (data) => {
    console.log(`[Event] ${event}:`, data)
  })
})
\`\`\`

Or use the `CommunicationDemo` component to visualize events in real-time.
