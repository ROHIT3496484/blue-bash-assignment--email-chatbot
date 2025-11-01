class EventBusClass {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data))
    }
    // Also emit as custom event for cross-app communication
    window.dispatchEvent(new CustomEvent(event, { detail: data }))
  }
}

export const EventBus = new EventBusClass()
