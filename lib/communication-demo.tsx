"use client"

import { useEffect, useState } from "react"
import { eventBus, Events } from "@/lib/design-system"

export function CommunicationDemo() {
  const [events, setEvents] = useState<Array<{ type: string; data: any; timestamp: string }>>([])

  useEffect(() => {
    // Subscribe to all events for demonstration
    const unsubscribers = [
      eventBus.subscribe(Events.EMAIL_SENT, (data) => {
        setEvents((prev) => [...prev, { type: "EMAIL_SENT", data, timestamp: new Date().toLocaleTimeString() }])
      }),
      eventBus.subscribe(Events.EMAIL_STARRED, (data) => {
        setEvents((prev) => [...prev, { type: "EMAIL_STARRED", data, timestamp: new Date().toLocaleTimeString() }])
      }),
      eventBus.subscribe(Events.EMAIL_ARCHIVED, (data) => {
        setEvents((prev) => [...prev, { type: "EMAIL_ARCHIVED", data, timestamp: new Date().toLocaleTimeString() }])
      }),
      eventBus.subscribe(Events.CHAT_MESSAGE_SENT, (data) => {
        setEvents((prev) => [...prev, { type: "CHAT_MESSAGE_SENT", data, timestamp: new Date().toLocaleTimeString() }])
      }),
      eventBus.subscribe(Events.CHAT_MESSAGE_RECEIVED, (data) => {
        setEvents((prev) => [
          ...prev,
          { type: "CHAT_MESSAGE_RECEIVED", data, timestamp: new Date().toLocaleTimeString() },
        ])
      }),
    ]

    return () => {
      unsubscribers.forEach((unsub) => unsub())
    }
  }, [])

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md max-h-96 overflow-y-auto z-40">
      <h3 className="font-semibold mb-2">Event Bus Monitor</h3>
      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-sm text-gray-500">No events yet...</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="text-xs bg-gray-50 p-2 rounded">
              <div className="font-semibold text-blue-600">{event.type}</div>
              <div className="text-gray-600">{event.timestamp}</div>
              <pre className="text-gray-800 mt-1 overflow-x-auto">{JSON.stringify(event.data, null, 2)}</pre>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
