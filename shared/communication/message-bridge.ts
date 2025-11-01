// Message bridge for cross-app communication using postMessage API

export interface Message<T = any> {
  id: string
  type: string
  source: string
  target: string
  payload: T
  timestamp: number
}

export interface MessageResponse<T = any> {
  id: string
  success: boolean
  data?: T
  error?: string
}

class MessageBridge {
  private messageHandlers: Map<string, (payload: any) => Promise<any>> = new Map()
  private pendingRequests: Map<string, { resolve: Function; reject: Function; timeout: NodeJS.Timeout }> = new Map()
  private appName: string

  constructor(appName: string) {
    this.appName = appName
    this.setupMessageListener()
  }

  private setupMessageListener() {
    window.addEventListener("message", async (event) => {
      // Validate origin for security
      if (event.origin !== window.location.origin) return

      const message = event.data as Message

      // Handle responses to requests
      if (message.type === "response") {
        const pending = this.pendingRequests.get(message.id)
        if (pending) {
          clearTimeout(pending.timeout)
          const response = message.payload as MessageResponse
          if (response.success) {
            pending.resolve(response.data)
          } else {
            pending.reject(new Error(response.error))
          }
          this.pendingRequests.delete(message.id)
        }
        return
      }

      // Handle requests
      if (message.target === this.appName) {
        const handler = this.messageHandlers.get(message.type)
        if (handler) {
          try {
            const data = await handler(message.payload)
            this.sendResponse(message.id, true, data)
          } catch (error) {
            this.sendResponse(message.id, false, undefined, (error as Error).message)
          }
        }
      }
    })
  }

  /**
   * Register a message handler
   */
  on(messageType: string, handler: (payload: any) => Promise<any>) {
    this.messageHandlers.set(messageType, handler)
  }

  /**
   * Send a message to another app
   */
  async send<T = any>(target: string, type: string, payload: any, timeout = 5000): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = `${this.appName}-${Date.now()}-${Math.random()}`

      const timeoutHandle = setTimeout(() => {
        this.pendingRequests.delete(id)
        reject(new Error(`Message timeout: ${type}`))
      }, timeout)

      this.pendingRequests.set(id, { resolve, reject, timeout: timeoutHandle })

      const message: Message = {
        id,
        type,
        source: this.appName,
        target,
        payload,
        timestamp: Date.now(),
      }

      window.postMessage(message, window.location.origin)
    })
  }

  /**
   * Send a response to a message
   */
  private sendResponse(id: string, success: boolean, data?: any, error?: string) {
    const response: Message = {
      id,
      type: "response",
      source: this.appName,
      target: "*",
      payload: { id, success, data, error } as MessageResponse,
      timestamp: Date.now(),
    }

    window.postMessage(response, window.location.origin)
  }
}

export function createMessageBridge(appName: string) {
  return new MessageBridge(appName)
}
