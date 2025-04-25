"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { handleGitHubCallback } from "@/lib/github-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function GitHubCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function processCallback() {
      try {
        const code = searchParams.get("code")

        if (!code) {
          setError("No authorization code provided")
          setLoading(false)
          return
        }

        const data = await handleGitHubCallback(code)

        if (data.success) {
          // In a real app, you would store the user data and token in localStorage or a state management solution
          localStorage.setItem("user", JSON.stringify(data.user))

          // Redirect to profile page or dashboard
          router.push("/profile")
        } else {
          setError(data.error || "Failed to authenticate with GitHub")
        }
      } catch (err) {
        console.error("GitHub callback error:", err)
        setError("An error occurred during authentication")
      } finally {
        setLoading(false)
      }
    }

    processCallback()
  }, [searchParams, router])

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>GitHub Authentication</CardTitle>
          <CardDescription>Processing your GitHub login</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <p>Authenticating with GitHub...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <p>
                <a href="/login" className="text-purple-600 hover:underline">
                  Return to login
                </a>
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-green-600 mb-4">Authentication successful!</p>
              <p>Redirecting to your profile...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
