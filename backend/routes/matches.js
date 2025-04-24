import express from "express"
import Match from "../models/Match.js"
import User from "../models/User.js"
import Conversation from "../models/Conversation.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Create a new match request
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { targetUserId, matchScore } = req.body
    const initiatorId = req.user.userId

    // Validate target user exists
    const targetUser = await User.findById(targetUserId)
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" })
    }

    // Check if match already exists
    const existingMatch = await Match.findOne({
      users: { $all: [initiatorId, targetUserId] },
    })

    if (existingMatch) {
      return res.status(400).json({ message: "Match already exists" })
    }

    // Create new match
    const match = new Match({
      users: [initiatorId, targetUserId],
      initiator: initiatorId,
      status: "pending",
      matchScore: matchScore || 0,
    })

    await match.save()

    res.status(201).json(match)
  } catch (error) {
    console.error("Create match error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all matches for current user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    // Find all matches where current user is involved
    const matches = await Match.find({ users: userId })
      .populate("users", "name email title bio skills location avatar")
      .populate("initiator", "name email")
      .sort({ createdAt: -1 })

    res.json(matches)
  } catch (error) {
    console.error("Get matches error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update match status (accept/reject)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { status } = req.body
    const userId = req.user.userId

    // Find the match
    const match = await Match.findById(req.params.id)
    if (!match) {
      return res.status(404).json({ message: "Match not found" })
    }

    // Verify user is part of this match
    if (!match.users.includes(userId)) {
      return res.status(403).json({ message: "Not authorized to update this match" })
    }

    // Verify user is not the initiator
    if (match.initiator.toString() === userId) {
      return res.status(400).json({ message: "Initiator cannot accept/reject their own match request" })
    }

    // Update match status
    match.status = status
    await match.save()

    // If match is accepted, create a conversation
    if (status === "accepted") {
      const conversation = new Conversation({
        participants: match.users,
      })

      await conversation.save()
    }

    res.json(match)
  } catch (error) {
    console.error("Update match error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
