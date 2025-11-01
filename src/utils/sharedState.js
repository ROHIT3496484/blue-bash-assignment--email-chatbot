class SharedStateManager {
  constructor() {
    this.state = {
      user: null,
      theme: "light",
      notifications: [],
    }
    this.listeners = []
  }

  subscribe(listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.listeners.forEach((listener) => listener(this.state))
  }

  getState() {
    return this.state
  }
}

export const sharedState = new SharedStateManager()
