type EventCallback = (data: any) => void

class EventBus {
  private events: Map<string, EventCallback[]> = new Map()

  subscribe(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(event)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  publish(event: string, data?: any) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  unsubscribe(event: string, callback: EventCallback) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }
}

// Singleton instance
export const eventBus = new EventBus()

// Event types for type safety
export const Events = {
  EMAIL_SELECTED: "email:selected",
  EMAIL_SENT: "email:sent",
  EMAIL_STARRED: "email:starred",
  EMAIL_ARCHIVED: "email:archived",
  CHAT_MESSAGE_SENT: "chat:message:sent",
  CHAT_MESSAGE_RECEIVED: "chat:message:received",
  THEME_CHANGED: "theme:changed",
  USER_LOGGED_IN: "user:logged:in",
  USER_LOGGED_OUT: "user:logged:out",
} as const
