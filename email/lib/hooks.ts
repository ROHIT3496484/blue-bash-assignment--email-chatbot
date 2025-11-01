"use client"

import { useState, useCallback } from "react"

export interface Email {
  id: string
  from: string
  subject: string
  preview: string
  body: string
  timestamp: Date
  read: boolean
}

export function useEmail() {
  const [emails, setEmails] = useState<Email[]>([])

  const addEmail = useCallback((email: Omit<Email, "id">) => {
    const newEmail: Email = {
      ...email,
      id: Date.now().toString(),
    }
    setEmails((prev) => [newEmail, ...prev])
    return newEmail
  }, [])

  const deleteEmail = useCallback((id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id))
  }, [])

  const markAsRead = useCallback((id: string) => {
    setEmails((prev) => prev.map((email) => (email.id === id ? { ...email, read: true } : email)))
  }, [])

  return { emails, addEmail, deleteEmail, markAsRead }
}
