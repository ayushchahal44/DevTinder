// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "your_github_client_id"
const GITHUB_REDIRECT_URI =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/auth/github/callback`
    : "http://localhost:3000/api/auth/github/callback"

/**
 * Redirects the user to GitHub's authorization page
 */
export function redirectToGitHubLogin() {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&scope=user:email,read:user`

  window.location.href = githubAuthUrl
}

/**
 * Handles the GitHub OAuth callback
 * @param code The authorization code from GitHub
 * @returns The user data from GitHub
 */
export async function handleGitHubCallback(code: string) {
  try {
    const response = await fetch(`/api/auth/github?code=${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to authenticate with GitHub")
    }

    return await response.json()
  } catch (error) {
    console.error("GitHub callback error:", error)
    throw error
  }
}
