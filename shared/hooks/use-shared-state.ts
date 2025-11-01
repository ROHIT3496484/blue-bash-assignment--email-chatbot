"use client"

import { useState, useCallback, useRef, useEffect } from "react"

// Custom hook for managing shared state across micro-frontends
export function useSharedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue)
  const stateRef = useRef<T>(initialValue)

  // Broadcast state changes to other micro-frontends
  const updateState = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setState((prev) => {
        const updated = typeof newValue === "function" ? (newValue as (prev: T) => T)(prev) : newValue
        stateRef.current = updated

        // Emit custom event for cross-app communication
        window.dispatchEvent(
          new CustomEvent("shared-state-change", {
            detail: { key, value: updated },
          }),
        )

        return updated
      })
    },
    [key],
  )

  // Listen for state changes from other micro-frontends
  useEffect(() => {
    const handleStateChange = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.key === key) {
        setState(customEvent.detail.value)
      }
    }

    window.addEventListener("shared-state-change", handleStateChange)
    return () => window.removeEventListener("shared-state-change", handleStateChange)
  }, [key])

  return [state, updateState] as const
}
