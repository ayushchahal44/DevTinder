import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would validate credentials against your database
    // For demo purposes, we'll accept any login with a valid email format
    if (!email || !email.includes("@") || !password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 })
    }

    // Mock user data
    const user = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
      avatar: "/placeholder.svg?height=100&width=100",
      title: "Software Developer",
      bio: "Passionate about web development and new technologies.",
      skills: ["JavaScript", "React", "Node.js"],
      location: "San Francisco, CA",
    }

    // In a real app, you would generate a JWT token
    const token = "mock_jwt_token_" + Math.random().toString(36).substr(2, 9)

    return NextResponse.json({
      success: true,
      user,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
