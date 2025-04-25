"use client"

import { io, type Socket } from "socket.io-client"
import { useEffect, useState } from "react"

// Socket.io client instance
let socket: Socket | null = null

export const initializeSocket = (token: string) => {
  if (socket) return socket

  const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    transports: ["websocket"],
    autoConnect: true,
  })

  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id)
  })

  socket.on("disconnect", () => {
    console.log("Socket disconnected")
  })

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message)
  })

  return socket
}

export const getSocket = () => {
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

// React hook for using socket.io
export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!socket) return

    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    // Check initial connection state
    setIsConnected(socket.connected)

    return () => {
      socket?.off("connect", onConnect)
      socket?.off("disconnect", onDisconnect)
    }
  }, [])

  return { socket, isConnected }
}
