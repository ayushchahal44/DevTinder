"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    user: {
      id: 101,
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
        id: 1,
        senderId: 101,
        text: "Hey, I saw your profile and I'm interested in collaborating on your Docker project.",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        senderId: "me",
        text: "Hi Alex! Thanks for reaching out. I'd love to chat more about it.",
        timestamp: "10:35 AM",
      },
      {
        id: 3,
        senderId: 101,
        text: "Great! I have experience with Docker and Kubernetes. What kind of project are you working on?",
        timestamp: "10:40 AM",
      },
    ],
  },
  {
    id: 2,
    user: {
      id: 102,
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
        id: 1,
        senderId: 102,
        text: "Hi, I'm a backend developer and I noticed you're looking for help with an API.",
        timestamp: "Yesterday",
      },
      {
        id: 2,
        senderId: "me",
        text: "Hi Sarah! Yes, I'm working on a RESTful API for a mobile app.",
        timestamp: "Yesterday",
      },
      {
        id: 3,
        senderId: 102,
        text: "Let me know when you want to discuss the API design.",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    user: {
      id: 103,
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
        id: 1,
        senderId: 103,
        text: "Hey, I'm interested in your project. I have experience with React and Node.js.",
        timestamp: "3 days ago",
      },
      {
        id: 2,
        senderId: "me",
        text: "Hi Michael! That's great. I could use some help with the frontend.",
        timestamp: "3 days ago",
      },
      {
        id: 3,
        senderId: 103,
        text: "I just pushed some changes to the repo. Can you review them?",
        timestamp: "2 days ago",
      },
    ],
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // In a real app, you would send this to your API
    console.log(`Sending message to ${activeConversation.user.name}: ${newMessage}`)

    // For demo purposes, we'll just update the local state
    const updatedConversation = {
      ...activeConversation,
      messages: [
        ...activeConversation.messages,
        {
          id: activeConversation.messages.length + 1,
          senderId: "me",
          text: newMessage,
          timestamp: "Just now",
        },
      ],
    }

    setActiveConversation(updatedConversation)
    setNewMessage("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>

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
                  activeConversation.id === conversation.id ? "bg-muted" : ""
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
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConversation.messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.senderId === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${message.senderId === "me" ? "text-primary-foreground/70" : "text-gray-500"}`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
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
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
