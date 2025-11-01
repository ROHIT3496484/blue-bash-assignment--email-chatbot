# Module Federation Architecture Guide

## Overview

This document provides an in-depth explanation of the Module Federation architecture used in this project.

## What is Module Federation?

Module Federation is a JavaScript architecture that allows multiple JavaScript applications to dynamically load code from each other at runtime. It enables:

- **Independent Deployment**: Each micro-frontend can be deployed independently
- **Shared Dependencies**: Common libraries are loaded once and shared
- **Dynamic Loading**: Applications can be loaded on-demand
- **Version Management**: Different versions of dependencies can coexist

## Architecture Layers

### 1. Host Application Layer

The host application serves as the orchestrator:
- Loads and manages micro-frontends
- Provides the main UI shell
- Handles routing and navigation
- Manages global state

**Key Files:**
- `host/next.config.mjs` - Module Federation configuration
- `host/app/page.tsx` - Main dashboard with app switcher

### 2. Micro-Frontend Layer

Each micro-frontend is an independent application:
- Exposes its main component via Module Federation
- Manages its own state and logic
- Can be developed and deployed independently
- Follows the same design system

**Chat Micro-Frontend:**
- Real-time messaging
- User conversations
- Message history

**Email Micro-Frontend:**
- Email management
- Search and filtering
- Read/unread status

### 3. Shared Layer

Shared utilities and components used across all applications:
- Design tokens and theme system
- Reusable components
- Communication utilities
- Helper functions

### 4. Communication Layer

Enables inter-app communication:
- **Event Bus**: Pub/Sub pattern for simple events
- **Message Bridge**: Request/Response pattern for complex interactions
- **App Registry**: Tracks connected applications

## Module Federation Configuration

### Exposes

Each application exposes specific modules:

\`\`\`javascript
exposes: {
  './app': './app/chat-app.tsx',
  './hooks': './lib/hooks.ts',
}
\`\`\`

This allows other applications to import:
\`\`\`tsx
const ChatApp = dynamic(() => import('chat/app'))
const { useChat } = await import('chat/hooks')
\`\`\`

### Remotes

Applications declare which remote modules they consume:

\`\`\`javascript
remotes: {
  chat: 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
  email: 'http://localhost:3002/_next/static/chunks/remoteEntry.js',
}
\`\`\`

### Shared Dependencies

Shared dependencies prevent duplication:

\`\`\`javascript
shared: {
  react: { singleton: true, requiredVersion: false },
  'react-dom': { singleton: true, requiredVersion: false },
}
\`\`\`

## Communication Patterns

### Pattern 1: Event Bus (Pub/Sub)

**Use Case**: Simple notifications and state changes

\`\`\`tsx
// Publisher
emit('user-logged-in', { id: 1, name: 'John' })

// Subscriber
subscribe('user-logged-in', (userData) => {
  console.log('User logged in:', userData)
})
\`\`\`

**Advantages:**
- Simple and lightweight
- Decoupled communication
- Multiple subscribers supported

**Disadvantages:**
- No response mechanism
- Fire-and-forget pattern

### Pattern 2: Message Bridge (Request/Response)

**Use Case**: Complex interactions requiring responses

\`\`\`tsx
// Handler
onMessage('get-unread-count', async () => {
  return { count: 5 }
})

// Requester
const result = await sendMessage('chat', 'get-unread-count', {})
\`\`\`

**Advantages:**
- Request/Response pattern
- Error handling
- Timeout support

**Disadvantages:**
- More overhead than events
- Requires handler registration

### Pattern 3: Shared State

**Use Case**: State that needs to sync across apps

\`\`\`tsx
const [user, setUser] = useSharedState('current-user', null)
\`\`\`

**Advantages:**
- Automatic synchronization
- Persistent across apps
- Type-safe

## Performance Considerations

### 1. Code Splitting

Each micro-frontend is code-split independently:
- Reduces initial bundle size
- Enables parallel loading
- Improves time-to-interactive

### 2. Shared Dependencies

Singleton pattern prevents duplication:
- React loaded once
- React-DOM loaded once
- Reduces memory usage

### 3. Lazy Loading

Micro-frontends are loaded on-demand:
\`\`\`tsx
const ChatApp = dynamic(() => import('chat/app'), {
  loading: () => <div>Loading Chat...</div>,
  ssr: false,
})
\`\`\`

## Security Considerations

### 1. Origin Validation

Message bridge validates message origins:
\`\`\`typescript
if (event.origin !== window.location.origin) return
\`\`\`

### 2. Message Signing

Consider implementing message signing for production:
\`\`\`typescript
const signature = sign(message, secret)
\`\`\`

### 3. CORS Configuration

Ensure proper CORS headers on all applications:
\`\`\`
Access-Control-Allow-Origin: https://yourdomain.com
\`\`\`

## Deployment Strategy

### Development

\`\`\`
Host: http://localhost:3000
Chat: http://localhost:3001
Email: http://localhost:3002
\`\`\`

### Production

\`\`\`
Host: https://app.example.com
Chat: https://chat.example.com
Email: https://email.example.com
\`\`\`

Update remote URLs in Module Federation configuration:
\`\`\`javascript
remotes: {
  chat: 'https://chat.example.com/_next/static/chunks/remoteEntry.js',
  email: 'https://email.example.com/_next/static/chunks/remoteEntry.js',
}
\`\`\`

## Monitoring and Debugging

### 1. Check Loaded Modules

\`\`\`javascript
console.log(window.__FEDERATION__)
\`\`\`

### 2. Monitor Communication

\`\`\`typescript
eventBus.on('*', (event) => {
  console.log('Event:', event)
})
\`\`\`

### 3. App Registry Status

\`\`\`typescript
console.log(appRegistry.getAll())
\`\`\`

## Scaling Considerations

### Adding New Micro-Frontends

1. Create new Next.js application
2. Configure Module Federation
3. Expose main component
4. Add to host remotes
5. Update documentation

### Versioning

Implement semantic versioning:
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Dependency Management

Use lock files to ensure consistency:
- `package-lock.json` for npm
- `yarn.lock` for yarn

## Troubleshooting Guide

### Issue: Module not found

**Solution**: Verify expose configuration and import path

### Issue: Shared dependency version mismatch

**Solution**: Update shared configuration to handle versions

### Issue: Communication timeout

**Solution**: Increase timeout or check if target app is running

## References

- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [Next.js Module Federation](https://nextjs.org/docs/app/building-your-application/deploying)
- [Micro-frontends Best Practices](https://micro-frontends.org/)
