import Conversation from "../models/Conversation.js"
import Message from "../models/Message.js"

// Map to store active users
const activeUsers = new Map()

export const handleSocketConnection = (io, socket) => {
  const userId = socket.userId

  console.log(`User connected: ${userId}`)

  // Add user to active users
  activeUsers.set(userId, socket.id)

  // Join user to their own room for private messages
  socket.join(userId)

  // Notify friends that user is online
  notifyUserStatus(io, userId, true)

  // Handle joining conversation rooms
  socket.on("join_conversation", async (conversationId) => {
    try {
      const conversation = await Conversation.findById(conversationId)
      if (!conversation) {
        return socket.emit("error", { message: "Conversation not found" })
      }

      // Check if user is part of this conversation
      if (!conversation.participants.includes(userId)) {
        return socket.emit("error", { message: "Not authorized to join this conversation" })
      }

      // Join the conversation room
      socket.join(`conversation:${conversationId}`)
      console.log(`User ${userId} joined conversation ${conversationId}`)

      // Mark messages as read
      await Message.updateMany(
        { conversation: conversationId, sender: { $ne: userId }, isRead: false },
        { isRead: true },
      )

      // Notify other participants that user has read messages
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() !== userId) {
          io.to(participantId.toString()).emit("messages_read", { conversationId, userId })
        }
      })
    } catch (error) {
      console.error("Error joining conversation:", error)
      socket.emit("error", { message: "Failed to join conversation" })
    }
  })

  // Handle new message
  socket.on("send_message", async (data) => {
    try {
      const { conversationId, content } = data

      const conversation = await Conversation.findById(conversationId)
      if (!conversation) {
        return socket.emit("error", { message: "Conversation not found" })
      }

      // Check if user is part of this conversation
      if (!conversation.participants.includes(userId)) {
        return socket.emit("error", { message: "Not authorized to send messages in this conversation" })
      }

      // Create new message
      const message = new Message({
        conversation: conversationId,
        sender: userId,
        content,
        isRead: false,
      })

      await message.save()

      // Update conversation's lastMessage
      conversation.lastMessage = message._id
      conversation.updatedAt = Date.now()
      await conversation.save()

      // Populate sender info
      const populatedMessage = await Message.findById(message._id).populate("sender", "name avatar")

      // Emit message to all participants in the conversation
      io.to(`conversation:${conversationId}`).emit("new_message", populatedMessage)

      // Send notification to offline participants
      conversation.participants.forEach((participantId) => {
        const participantIdStr = participantId.toString()
        if (participantIdStr !== userId) {
          // If participant is not in the conversation room, send notification
          io.to(participantIdStr).emit("message_notification", {
            conversationId,
            message: populatedMessage,
          })
        }
      })
    } catch (error) {
      console.error("Error sending message:", error)
      socket.emit("error", { message: "Failed to send message" })
    }
  })

  // Handle typing status
  socket.on("typing", (data) => {
    const { conversationId, isTyping } = data

    // Broadcast typing status to conversation room
    socket.to(`conversation:${conversationId}`).emit("user_typing", {
      userId,
      conversationId,
      isTyping,
    })
  })

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${userId}`)

    // Remove user from active users
    activeUsers.delete(userId)

    // Notify friends that user is offline
    notifyUserStatus(io, userId, false)
  })
}

// Notify user's status (online/offline) to friends
const notifyUserStatus = async (io, userId, isOnline) => {
  try {
    // In a real app, you would get the user's friends or conversation participants
    // For simplicity, we'll notify all users who have conversations with this user
    const conversations = await Conversation.find({ participants: userId })

    const notifiedUsers = new Set()

    conversations.forEach((conversation) => {
      conversation.participants.forEach((participantId) => {
        const participantIdStr = participantId.toString()
        if (participantIdStr !== userId && !notifiedUsers.has(participantIdStr)) {
          io.to(participantIdStr).emit("user_status", { userId, isOnline })
          notifiedUsers.add(participantIdStr)
        }
      })
    })
  } catch (error) {
    console.error("Error notifying user status:", error)
  }
}

// Get active users
export const getActiveUsers = () => {
  return activeUsers
}
