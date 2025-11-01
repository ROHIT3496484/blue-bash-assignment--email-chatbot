"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Email {
  id: string
  from: string
  subject: string
  preview: string
  body: string
  timestamp: Date
  read: boolean
}

export default function EmailApp() {
  const [emails, setEmails] = useState<Email[]>([
    {
      id: "1",
      from: "support@example.com",
      subject: "Welcome to our platform",
      preview: "Thank you for signing up...",
      body: "Thank you for signing up! We're excited to have you on board.",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: "2",
      from: "team@example.com",
      subject: "Project update",
      preview: "Here's the latest on our project...",
      body: "Here's the latest update on our ongoing project. Everything is on track.",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: "3",
      from: "notifications@example.com",
      subject: "New feature available",
      preview: "Check out our new feature...",
      body: "We've just released a new feature that you might find useful.",
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
  ])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleMarkAsRead = useCallback((id: string) => {
    setEmails((prev) => prev.map((email) => (email.id === id ? { ...email, read: true } : email)))
  }, [])

  const handleDelete = useCallback((id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id))
    setSelectedEmail(null)
  }, [])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex h-full gap-4">
      {/* Sidebar with email list */}
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Input
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => {
                  setSelectedEmail(email)
                  handleMarkAsRead(email.id)
                }}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedEmail?.id === email.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                } ${!email.read ? "font-semibold" : ""}`}
              >
                <p className="text-sm truncate">{email.from}</p>
                <p className="text-xs truncate opacity-75">{email.subject}</p>
                <p className="text-xs opacity-50 mt-1">{formatTime(email.timestamp)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email viewer */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            <div className="border-b border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">{selectedEmail.subject}</h2>
              <p className="text-muted-foreground mb-4">From: {selectedEmail.from}</p>
              <p className="text-sm text-muted-foreground">{selectedEmail.timestamp.toLocaleString()}</p>
            </div>
            <ScrollArea className="flex-1 p-6">
              <p className="text-foreground whitespace-pre-wrap">{selectedEmail.body}</p>
            </ScrollArea>
            <div className="border-t border-border p-4 flex gap-2">
              <Button variant="outline" onClick={() => handleDelete(selectedEmail.id)}>
                Delete
              </Button>
              <Button variant="outline">Reply</Button>
              <Button variant="outline">Forward</Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Select an email to read</p>
          </div>
        )}
      </div>
    </div>
  )
}
