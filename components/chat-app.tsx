"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/lib/design-system/components"
import { Input } from "@/lib/design-system/components"
import { eventBus, Events } from "@/lib/event-bus"
import { Send, Loader2, Trash2, Copy } from "lucide-react"

interface Message {
  id: string
  user: string
  text: string
  timestamp: string
  isLoading?: boolean
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "Assistant",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage: Message = {
        id: String(Date.now()),
        user: "You",
        text: input,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      eventBus.publish(Events.CHAT_MESSAGE_SENT, { message: input })

      const loadingMessage: Message = {
        id: String(Date.now() + 1),
        user: "Assistant",
        text: "",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isLoading: true,
      }
      setMessages((prev) => [...prev, loadingMessage])

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const responseText = data.message || "I'm here to help! Feel free to ask me anything."

        setMessages((prev) =>
          prev.map((msg) =>
            msg.isLoading
              ? {
                  ...msg,
                  text: responseText,
                  isLoading: false,
                }
              : msg,
          ),
        )

        eventBus.publish(Events.CHAT_MESSAGE_RECEIVED, { message: responseText })
      } catch (error) {
        console.error("[v0] Chat error:", error)

        const errorMessage = "Sorry, I'm having trouble connecting. Please try again in a moment."

        setMessages((prev) =>
          prev.map((msg) =>
            msg.isLoading
              ? {
                  ...msg,
                  text: errorMessage,
                  isLoading: false,
                }
              : msg,
          ),
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear all messages?")) {
      setMessages([
        {
          id: "1",
          user: "Assistant",
          text: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }
  }

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Message copied to clipboard")
  }

  return (
    <div
      className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100"
      role="main"
      aria-label="Chat Assistant"
    >
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <h2 className="font-semibold text-lg">Chat Assistant</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearChat}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 border-white text-black"
          aria-label="Clear all chat messages"
          title="Clear all messages"
        >
          <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" />
          Clear
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-3 rounded-lg shadow-sm group transition-all ${
                msg.user === "You"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-slate-900 rounded-bl-none border border-slate-200"
              }`}
              role="article"
              aria-label={`Message from ${msg.user}: ${msg.text}`}
            >
              {msg.isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span className="text-sm">Thinking...</span>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{msg.text}</p>
              )}
              <p className={`text-xs mt-1 ${msg.user === "You" ? "opacity-80" : "opacity-60"}`}>{msg.timestamp}</p>
              {!msg.isLoading && msg.user === "Assistant" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  onClick={() => handleCopyMessage(msg.text)}
                  aria-label={`Copy message: ${msg.text.substring(0, 20)}...`}
                  title="Copy message to clipboard"
                >
                  <Copy className="w-3 h-3" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <div className="p-4 border-t border-slate-200 bg-white rounded-b-lg space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
            disabled={isLoading}
            className="flex-1"
            aria-label="Message input"
            aria-describedby="input-help"
          />
          <Button
            onClick={handleSend}
            size="icon"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
            aria-label={isLoading ? "Sending message" : "Send message"}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-4 h-4" aria-hidden="true" />
            )}
          </Button>
        </div>
        <p id="input-help" className="text-xs text-slate-500">
          Press Enter or click Send to send your message
        </p>
      </div>
    </div>
  )
}
