import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // In a real app, you would validate input and check if user already exists
    if (!name || !email || !email.includes("@") || !password) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    // Mock user data
    const user = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      avatar: "/placeholder.svg?height=100&width=100",
      title: "New Developer",
      bio: "",
      skills: [],
      location: "",
    }

    // In a real app, you would generate a JWT token
    const token = "mock_jwt_token_" + Math.random().toString(36).substr(2, 9)

    return NextResponse.json({
      success: true,
      user,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
