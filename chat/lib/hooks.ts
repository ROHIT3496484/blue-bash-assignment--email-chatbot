"use client"

import { useState, useCallback } from "react"

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const addMessage = useCallback((text: string, sender: "user" | "bot") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    return newMessage
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return { messages, addMessage, clearMessages }
}
