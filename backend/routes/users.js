import express from "express"
import User from "../models/User.js"
import { authenticateToken } from "../middleware/auth.js"
import { matchUsers } from "../utils/matchingAlgorithm.js"

const router = express.Router()

// Get all users (with optional filtering)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { skills, location } = req.query
    const query = {}

    if (skills) {
      query.skills = { $in: skills.split(",") }
    }

    if (location) {
      query.location = { $regex: location, $options: "i" }
    }

    const users = await User.find(query).select("-password").sort({ createdAt: -1 })

    res.json(users)
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get user by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    console.error("Get user error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update user profile
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { name, title, bio, skills, location, githubUrl, preferences } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update fields
    if (name) user.name = name
    if (title) user.title = title
    if (bio) user.bio = bio
    if (skills) user.skills = skills
    if (location) user.location = location
    if (githubUrl) user.githubUrl = githubUrl
    if (preferences) user.preferences = preferences

    await user.save()

    res.json(user)
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get recommended matches for a user
router.get("/matches/recommended", authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.userId)
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" })
    }

    // Get all users except current user
    const allUsers = await User.find({ _id: { $ne: req.user.userId } }).select("-password")

    // Use matching algorithm to find compatible users
    const matches = matchUsers(currentUser, allUsers)

    res.json(matches)
  } catch (error) {
    console.error("Get recommended matches error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
