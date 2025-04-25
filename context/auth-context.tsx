"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { initializeSocket, disconnectSocket } from "@/lib/socket"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
  githubUrl?: string
  skills?: string[]
  title?: string
  bio?: string
  location?: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGithub: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        if (storedToken) {
          setToken(storedToken)
          // Initialize socket connection with token
          initializeSocket(storedToken)
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      setUser(data.user)
      setToken(data.token)

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

      // Initialize socket connection with token
      initializeSocket(data.token)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGithub = () => {
    // This function is implemented in lib/github-auth.ts
    // It redirects to GitHub's OAuth page
    const redirectToGitHubLogin = () => {
      const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
      const GITHUB_REDIRECT_URI = `${window.location.origin}/api/auth/github/callback`
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        GITHUB_REDIRECT_URI,
      )}&scope=user:email,read:user`

      window.location.href = githubAuthUrl
    }

    redirectToGitHubLogin()
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, you would make an API call to your backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        throw new Error("Signup failed")
      }

      const data = await response.json()
      setUser(data.user)
      setToken(data.token)

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

      // Initialize socket connection with token
      initializeSocket(data.token)
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    // Disconnect socket on logout
    disconnectSocket()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGithub, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
