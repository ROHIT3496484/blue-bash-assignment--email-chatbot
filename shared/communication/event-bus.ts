// Event bus for inter-app communication

type EventCallback<T = any> = (data: T) => void

interface EventListener<T = any> {
  callback: EventCallback<T>
  once?: boolean
}

class EventBus {
  private events: Map<string, EventListener[]> = new Map()

  /**
   * Subscribe to an event
   */
  on<T = any>(eventName: string, callback: EventCallback<T>): () => void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }

    const listener: EventListener<T> = { callback }
    this.events.get(eventName)!.push(listener)

    // Return unsubscribe function
    return () => {
      const listeners = this.events.get(eventName)
      if (listeners) {
        const index = listeners.indexOf(listener)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }

  /**
   * Subscribe to an event once
   */
  once<T = any>(eventName: string, callback: EventCallback<T>): () => void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }

    const listener: EventListener<T> = { callback, once: true }
    this.events.get(eventName)!.push(listener)

    return () => {
      const listeners = this.events.get(eventName)
      if (listeners) {
        const index = listeners.indexOf(listener)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }

  /**
   * Emit an event
   */
  emit<T = any>(eventName: string, data?: T): void {
    const listeners = this.events.get(eventName)
    if (!listeners) return

    listeners.forEach((listener) => {
      listener.callback(data)
      if (listener.once) {
        const index = listeners.indexOf(listener)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    })
  }

  /**
   * Remove all listeners for an event
   */
  off(eventName: string): void {
    this.events.delete(eventName)
  }

  /**
   * Clear all events
   */
  clear(): void {
    this.events.clear()
  }
}

export const eventBus = new EventBus()
