import ChatApp from "./chat-app"

export default function Page() {
  return (
    <main className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Chat Application</h1>
        <ChatApp />
      </div>
    </main>
  )
}
