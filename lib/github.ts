// GitHub API utilities

/**
 * Fetches a user's GitHub repositories
 * @param username GitHub username
 * @returns Array of repositories
 */
export async function fetchUserRepositories(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos = await response.json()
    return repos
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return []
  }
}

/**
 * Fetches a user's GitHub profile information
 * @param username GitHub username
 * @returns GitHub profile data
 */
export async function fetchGitHubProfile(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching GitHub profile:", error)
    return null
  }
}

/**
 * Extracts a GitHub username from a GitHub URL
 * @param url GitHub profile URL
 * @returns GitHub username
 */
export function extractGitHubUsername(url: string): string | null {
  if (!url) return null

  try {
    const urlObj = new URL(url)
    if (urlObj.hostname !== "github.com") return null

    // Remove leading slash and trailing slash if present
    const path = urlObj.pathname.replace(/^\/|\/$/g, "")

    // The username should be the first segment of the path
    const segments = path.split("/")
    return segments[0] || null
  } catch (error) {
    return null
  }
}
