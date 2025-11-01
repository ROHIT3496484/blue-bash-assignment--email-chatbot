// Registry for managing connected micro-frontends

export interface RegisteredApp {
  name: string
  version: string
  capabilities: string[]
  status: "active" | "inactive"
  lastHeartbeat: number
}

class AppRegistry {
  private apps: Map<string, RegisteredApp> = new Map()
  private heartbeatInterval: NodeJS.Timeout | null = null

  /**
   * Register a micro-frontend
   */
  register(name: string, version: string, capabilities: string[]) {
    this.apps.set(name, {
      name,
      version,
      capabilities,
      status: "active",
      lastHeartbeat: Date.now(),
    })
  }

  /**
   * Unregister a micro-frontend
   */
  unregister(name: string) {
    this.apps.delete(name)
  }

  /**
   * Get all registered apps
   */
  getAll(): RegisteredApp[] {
    return Array.from(this.apps.values())
  }

  /**
   * Get a specific app
   */
  get(name: string): RegisteredApp | undefined {
    return this.apps.get(name)
  }

  /**
   * Check if an app is registered
   */
  isRegistered(name: string): boolean {
    return this.apps.has(name)
  }

  /**
   * Update heartbeat for an app
   */
  updateHeartbeat(name: string) {
    const app = this.apps.get(name)
    if (app) {
      app.lastHeartbeat = Date.now()
    }
  }

  /**
   * Get apps by capability
   */
  getByCapability(capability: string): RegisteredApp[] {
    return Array.from(this.apps.values()).filter((app) => app.capabilities.includes(capability))
  }
}

export const appRegistry = new AppRegistry()
