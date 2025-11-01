"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  status: "online" | "offline"
}

export default function ChatApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Welcome to Chat! How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [users] = useState<ChatUser[]>([
    { id: "1", name: "Support Team", avatar: "ST", status: "online" },
    { id: "2", name: "Sales", avatar: "SA", status: "online" },
    { id: "3", name: "Technical", avatar: "TE", status: "offline" },
  ])

  const handleSendMessage = useCallback(() => {
    if (input.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setInput("")

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Thanks for your message! We'll get back to you shortly.",
            sender: "bot",
            timestamp: new Date(),
          },
        ])
      }, 500)
    }
  }, [input])

  return (
    <div className="flex h-full gap-4">
      {/* Sidebar with users */}
      <div className="w-64 border-r border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Conversations</h3>
        </div>
        <ScrollArea className="h-96">
          <div className="space-y-2 p-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className={`text-xs ${user.status === "online" ? "text-green-600" : "text-muted-foreground"}`}>
                    {user.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4">
          <h2 className="text-lg font-semibold text-foreground">Support Team</h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-muted-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  )
}
