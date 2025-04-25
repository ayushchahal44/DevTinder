"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useSocket } from "@/lib/socket"
import { useToast } from "@/components/ui/use-toast"

// Types for our data
type User = {
  id: string
  name: string
  avatar: string
  status: "online" | "offline"
}

type Message = {
  id: string
  senderId: string
  text: string
  timestamp: string
  isRead: boolean
}

type Conversation = {
  id: string
  user: User
  lastMessage: {
    text: string
    timestamp: string
    isRead: boolean
  }
  messages: Message[]
}

// Mock data for conversations (will be replaced with API calls)
const initialConversations: Conversation[] = [
  {
    id: "1",
    user: {
      id: "101",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    lastMessage: {
      text: "Hey, I saw your profile and I'm interested in collaborating on your Docker project.",
      timestamp: "10:30 AM",
      isRead: true,
    },
    messages: [
      {
        id: "1",
        senderId: "101",
        text: "Hey, I saw your profile and I'm interested in collaborating on your Docker project.",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: "2",
        senderId: "me",
        text: "Hi Alex! Thanks for reaching out. I'd love to chat more about it.",
        timestamp: "10:35 AM",
        isRead: true,
      },
      {
        id: "3",
        senderId: "101",
        text: "Great! I have experience with Docker and Kubernetes. What kind of project are you working on?",
        timestamp: "10:40 AM",
        isRead: true,
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "102",
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
    },
    lastMessage: {
      text: "Let me know when you want to discuss the API design.",
      timestamp: "Yesterday",
      isRead: false,
    },
    messages: [
      {
        id: "1",
        senderId: "102",
        text: "Hi, I'm a backend developer and I noticed you're looking for help with an API.",
        timestamp: "Yesterday",
        isRead: true,
      },
      {
        id: "2",
        senderId: "me",
        text: "Hi Sarah! Yes, I'm working on a RESTful API for a mobile app.",
        timestamp: "Yesterday",
        isRead: true,
      },
      {
        id: "3",
        senderId: "102",
        text: "Let me know when you want to discuss the API design.",
        timestamp: "Yesterday",
        isRead: false,
      },
    ],
  },
  {
    id: "3",
    user: {
      id: "103",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    lastMessage: {
      text: "I just pushed some changes to the repo. Can you review them?",
      timestamp: "2 days ago",
      isRead: true,
    },
    messages: [
      {
        id: "1",
        senderId: "103",
        text: "Hey, I'm interested in your project. I have experience with React and Node.js.",
        timestamp: "3 days ago",
        isRead: true,
      },
      {
        id: "2",
        senderId: "me",
        text: "Hi Michael! That's great. I could use some help with the frontend.",
        timestamp: "3 days ago",
        isRead: true,
      },
      {
        id: "3",
        senderId: "103",
        text: "I just pushed some changes to the repo. Can you review them?",
        timestamp: "2 days ago",
        isRead: true,
      },
    ],
  },
]

export default function MessagesPage() {
  const { user } = useAuth()
  const { socket, isConnected } = useSocket()
  const { toast } = useToast()
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Set initial active conversation
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0])
    }
  }, [conversations, activeConversation])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation?.messages])

  // Socket.io event listeners
  useEffect(() => {
    if (!socket || !isConnected) return

    // Join conversation room when active conversation changes
    if (activeConversation) {
      socket.emit("join_conversation", activeConversation.id)
    }

    // Listen for new messages
    const handleNewMessage = (message: any) => {
      setConversations((prevConversations) => {
        return prevConversations.map((conv) => {
          if (conv.id === message.conversation) {
            // Format the message to match our client-side structure
            const newMsg = {
              id: message._id,
              senderId: message.sender._id,
              text: message.content,
              timestamp: new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isRead: message.isRead,
            }

            // Update the conversation
            return {
              ...conv,
              lastMessage: {
                text: message.content,
                timestamp: new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                isRead: message.isRead,
              },
              messages: [...conv.messages, newMsg],
            }
          }
          return conv
        })
      })

      // Clear typing indicator when message is received
      if (activeConversation && message.sender._id !== user?.id) {
        setTypingUsers((prev) => ({ ...prev, [message.sender._id]: false }))
      }
    }

    // Listen for typing status
    const handleUserTyping = (data: { userId: string; conversationId: string; isTyping: boolean }) => {
      if (activeConversation?.id === data.conversationId) {
        setTypingUsers((prev) => ({ ...prev, [data.userId]: data.isTyping }))
      }
    }

    // Listen for user status changes
    const handleUserStatus = (data: { userId: string; isOnline: boolean }) => {
      setConversations((prevConversations) => {
        return prevConversations.map((conv) => {
          if (conv.user.id === data.userId) {
            return {
              ...conv,
              user: {
                ...conv.user,
                status: data.isOnline ? "online" : "offline",
              },
            }
          }
          return conv
        })
      })
    }

    // Listen for message read status updates
    const handleMessagesRead = (data: { conversationId: string; userId: string }) => {
      if (activeConversation?.id === data.conversationId) {
        setConversations((prevConversations) => {
          return prevConversations.map((conv) => {
            if (conv.id === data.conversationId) {
              return {
                ...conv,
                messages: conv.messages.map((msg) => {
                  if (msg.senderId === user?.id && !msg.isRead) {
                    return { ...msg, isRead: true }
                  }
                  return msg
                }),
                lastMessage: {
                  ...conv.lastMessage,
                  isRead: true,
                },
              }
            }
            return conv
          })
        })
      }
    }

    // Listen for errors
    const handleError = (error: { message: string }) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }

    socket.on("new_message", handleNewMessage)
    socket.on("user_typing", handleUserTyping)
    socket.on("user_status", handleUserStatus)
    socket.on("messages_read", handleMessagesRead)
    socket.on("error", handleError)

    return () => {
      socket.off("new_message", handleNewMessage)
      socket.off("user_typing", handleUserTyping)
      socket.off("user_status", handleUserStatus)
      socket.off("messages_read", handleMessagesRead)
      socket.off("error", handleError)
    }
  }, [socket, isConnected, activeConversation, user, toast])

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !activeConversation) return

    // Clear typing indicator
    handleStopTyping()

    // In a real app with Socket.io, you would emit the message to the server
    if (socket && isConnected) {
      socket.emit("send_message", {
        conversationId: activeConversation.id,
        content: newMessage,
      })
    } else {
      // Fallback for when socket is not connected
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

      // Update local state
      const newMsg = {
        id: `local_${Date.now()}`,
        senderId: "me",
        text: newMessage,
        timestamp,
        isRead: false,
      }

      setConversations((prevConversations) => {
        return prevConversations.map((conv) => {
          if (conv.id === activeConversation.id) {
            return {
              ...conv,
              lastMessage: {
                text: newMessage,
                timestamp,
                isRead: false,
              },
              messages: [...conv.messages, newMsg],
            }
          }
          return conv
        })
      })

      toast({
        title: "Offline Mode",
        description: "Your message will be sent when you reconnect.",
        variant: "default",
      })
    }

    setNewMessage("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)

    // Handle typing indicator
    if (!isTyping && activeConversation && socket && isConnected) {
      setIsTyping(true)
      socket.emit("typing", {
        conversationId: activeConversation.id,
        isTyping: true,
      })
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(handleStopTyping, 2000)
  }

  const handleStopTyping = () => {
    if (isTyping && activeConversation && socket && isConnected) {
      setIsTyping(false)
      socket.emit("typing", {
        conversationId: activeConversation.id,
        isTyping: false,
      })
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }

  // Check if any user in the active conversation is typing
  const isAnyoneTyping = activeConversation
    ? Object.entries(typingUsers).some(([userId, isTyping]) => userId !== user?.id && isTyping)
    : false

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        <p className="mb-6">Please log in to view your messages.</p>
        <Button asChild>
          <a href="/login">Log In</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          <span className="text-sm text-muted-foreground">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Conversations List */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden">
          <div className="p-4 border-b bg-muted">
            <h2 className="font-semibold">Conversations</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center gap-4 p-4 hover:bg-muted cursor-pointer border-b ${
                  activeConversation?.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                    <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.user.status === "online" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{conversation.user.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
                  </div>
                  <p
                    className={`text-sm truncate ${!conversation.lastMessage.isRead ? "font-semibold" : "text-gray-500"}`}
                  >
                    {conversation.lastMessage.text}
                  </p>
                </div>
                {!conversation.lastMessage.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Active Conversation */}
        <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-muted flex items-center gap-4">
            {activeConversation ? (
              <>
                <Avatar>
                  <AvatarImage
                    src={activeConversation.user.avatar || "/placeholder.svg"}
                    alt={activeConversation.user.name}
                  />
                  <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{activeConversation.user.name}</h2>
                  <p className="text-xs text-gray-500">
                    {activeConversation.user.status === "online" ? "Online" : "Offline"}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-muted-foreground">Select a conversation</div>
            )}
          </div>

          {activeConversation ? (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <p
                          className={`text-xs ${message.senderId === "me" ? "text-primary-foreground/70" : "text-gray-500"}`}
                        >
                          {message.timestamp}
                        </p>
                        {message.senderId === "me" && (
                          <span className="text-xs">
                            {message.isRead ? (
                              <span className="text-blue-400">✓✓</span>
                            ) : (
                              <span className="text-gray-400">✓</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isAnyoneTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t">
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                >
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={handleInputChange}
                    disabled={!isConnected}
                  />
                  <Button type="submit" size="icon" disabled={!isConnected || newMessage.trim() === ""}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
