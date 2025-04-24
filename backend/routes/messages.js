import express from "express"
import Message from "../models/Message.js"
import Conversation from "../models/Conversation.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Get all conversations for current user
router.get("/conversations", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    // Find all conversations where current user is a participant
    const conversations = await Conversation.find({ participants: userId })
      .populate("participants", "name email avatar")
      .populate("lastMessage")
      .sort({ updatedAt: -1 })

    res.json(conversations)
  } catch (error) {
    console.error("Get conversations error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get messages for a specific conversation
router.get("/conversations/:conversationId", authenticateToken, async (req, res) => {
  try {
    const { conversationId } = req.params
    const userId = req.user.userId

    // Find the conversation
    const conversation = await Conversation.findById(conversationId)
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" })
    }

    // Verify user is part of this conversation
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ message: "Not authorized to view this conversation" })
    }

    // Get messages
    const messages = await Message.find({ conversation: conversationId }).sort({ createdAt: 1 })

    // Mark unread messages as read
    await Message.updateMany({ conversation: conversationId, sender: { $ne: userId }, isRead: false }, { isRead: true })

    res.json(messages)
  } catch (error) {
    console.error("Get messages error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Send a new message
router.post("/conversations/:conversationId", authenticateToken, async (req, res) => {
  try {
    const { conversationId } = req.params
    const { content } = req.body
    const userId = req.user.userId

    // Find the conversation
    const conversation = await Conversation.findById(conversationId)
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" })
    }

    // Verify user is part of this conversation
    if (!conversation.participants.includes(userId)) {
      return res.status(403).json({ message: "Not authorized to send messages in this conversation" })
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

    res.status(201).json(message)
  } catch (error) {
    console.error("Send message error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create a new conversation
router.post("/conversations", authenticateToken, async (req, res) => {
  try {
    const { participantId, initialMessage } = req.body
    const userId = req.user.userId

    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    })

    if (existingConversation) {
      return res.json(existingConversation)
    }

    // Create new conversation
    const conversation = new Conversation({
      participants: [userId, participantId],
    })

    await conversation.save()

    // If initial message is provided, create it
    if (initialMessage) {
      const message = new Message({
        conversation: conversation._id,
        sender: userId,
        content: initialMessage,
        isRead: false,
      })

      await message.save()

      // Update conversation's lastMessage
      conversation.lastMessage = message._id
      await conversation.save()
    }

    res.status(201).json(conversation)
  } catch (error) {
    console.error("Create conversation error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
