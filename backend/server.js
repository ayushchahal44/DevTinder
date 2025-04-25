import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { createServer } from "http"
import { Server } from "socket.io"
import jwt from "jsonwebtoken"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import messageRoutes from "./routes/messages.js"
import matchRoutes from "./routes/matches.js"
import { handleSocketConnection } from "./socket/socketHandler.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Create HTTP server
const httpServer = createServer(app)

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// Socket.io middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) {
    return next(new Error("Authentication error: Token missing"))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    socket.userId = decoded.userId
    next()
  } catch (error) {
    next(new Error("Authentication error: Invalid token"))
  }
})

// Socket.io connection handler
io.on("connection", (socket) => {
  handleSocketConnection(io, socket)
})

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/matches", matchRoutes)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
