import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface SharedState {
  user: User | null
  theme: "light" | "dark"
  setUser: (user: User | null) => void
  setTheme: (theme: "light" | "dark") => void
}

export const useSharedState = create<SharedState>((set) => ({
  user: null,
  theme: "light",
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
}))
