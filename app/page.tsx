"use client"
import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import micro-frontends with fallback
const EmailApp = dynamic(() => import("@/components/email-app"), {
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Email App...</p>
      </div>
    </div>
  ),
  ssr: false,
})

const FloatingChatWidget = dynamic(() => import("@/components/floating-chat-widget"), {
  loading: () => null,
  ssr: false,
})

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <EmailApp />
        <FloatingChatWidget />
      </Suspense>
    </main>
  )
}
