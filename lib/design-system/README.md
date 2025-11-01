# Micro-Frontend Design System

A shared design system package for the micro-frontend architecture, providing consistent UI components, design tokens, and communication utilities.

## Features

- **Design Tokens**: Centralized color palette, typography, spacing, and other design values
- **UI Components**: Pre-built, accessible React components using Radix UI
- **Event Bus**: Cross-application communication system
- **Shared State**: Global state management with Zustand
- **Type Safety**: Full TypeScript support

## Installation

This package is consumed by micro-frontends through Module Federation. No installation needed.

## Usage

### Importing Components

\`\`\`typescript
import { Button, Card, Avatar } from '@micro-frontend/design-system/components'
\`\`\`

### Using Design Tokens

\`\`\`typescript
import { designTokens } from '@micro-frontend/design-system/tokens'

const MyComponent = () => (
  <div style={{ color: designTokens.colors.primary[600] }}>
    Hello World
  </div>
)
\`\`\`

### Event Bus Communication

\`\`\`typescript
import { eventBus, Events } from '@micro-frontend/design-system/event-bus'

// Subscribe to events
eventBus.subscribe(Events.EMAIL_SENT, (data) => {
  console.log('Email sent:', data)
})

// Publish events
eventBus.publish(Events.EMAIL_SENT, { to: 'user@example.com' })
\`\`\`

### Shared State

\`\`\`typescript
import { useSharedState } from '@micro-frontend/design-system/shared-state'

const MyComponent = () => {
  const { user, setUser } = useSharedState()
  
  return <div>Welcome, {user?.name}</div>
}
\`\`\`

## Available Components

- Button
- Input
- Label
- Card (with variants)
- Avatar
- Badge
- Checkbox
- Dialog
- Dropdown Menu
- Scroll Area
- Separator
- Textarea
- Tooltip

## Design Tokens

### Colors
- Primary (Red shades)
- Gray (Neutral shades)
- Blue (Accent shades)

### Typography
- Font families (Sans, Mono)
- Font sizes (xs to 4xl)
- Font weights (normal to bold)

### Spacing
- xs to 2xl scale

### Border Radius
- none to full

### Shadows
- sm to xl elevations
