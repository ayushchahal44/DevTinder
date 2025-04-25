import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 })
  }

  try {
    // Exchange code for access token
    // In a real implementation, you would make a request to GitHub's OAuth API
    // For demo purposes, we'll simulate a successful response

    // Simulate GitHub API response
    const githubUser = {
      id: "12345678",
      login: "github_username",
      name: "GitHub User",
      avatar_url: "https://github.com/github.png",
      email: "user@example.com",
      bio: "Full stack developer with experience in React, Node.js, and Docker",
      location: "San Francisco, CA",
      html_url: "https://github.com/github_username",
      public_repos: 15,
    }

    // In a real implementation, you would:
    // 1. Save the user to your database or update existing user
    // 2. Create a JWT token for authentication
    // 3. Set cookies or return the token

    return NextResponse.json({
      success: true,
      user: {
        id: githubUser.id,
        username: githubUser.login,
        name: githubUser.name,
        email: githubUser.email,
        avatar: githubUser.avatar_url,
        bio: githubUser.bio,
        location: githubUser.location,
        githubUrl: githubUser.html_url,
      },
    })
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.json({ error: "Failed to authenticate with GitHub" }, { status: 500 })
  }
}
