"use client"

import { useCallback, useRef } from "react"
import { eventBus } from "../communication/event-bus"
import { createMessageBridge } from "../communication/message-bridge"

export function useInterAppCommunication(appName: string) {
  const bridgeRef = useRef(createMessageBridge(appName))

  const subscribe = useCallback(<T = any>(eventName: string, callback: (data: T) => void) => {
    return eventBus.on(eventName, callback)
  }, [])

  const emit = useCallback(<T = any>(eventName: string, data?: T) => {
    eventBus.emit(eventName, data)
  }, [])

  const sendMessage = useCallback(async <T = any>(target: string, type: string, payload: any) => {
    return bridgeRef.current.send<T>(target, type, payload)
  }, [])

  const onMessage = useCallback((messageType: string, handler: (payload: any) => Promise<any>) => {
    bridgeRef.current.on(messageType, handler)
  }, [])

  return {
    subscribe,
    emit,
    sendMessage,
    onMessage,
  }
}
