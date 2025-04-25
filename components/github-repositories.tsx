"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, GitBranch, Star } from "lucide-react"
import { fetchUserRepositories, extractGitHubUsername } from "@/lib/github"
import { Skeleton } from "@/components/ui/skeleton"

type Repository = {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

export function GitHubRepositories({ githubUrl }: { githubUrl: string }) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadRepositories() {
      const username = extractGitHubUsername(githubUrl)

      if (!username) {
        setError("Invalid GitHub URL")
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const repos = await fetchUserRepositories(username)
        setRepositories(repos)
      } catch (err) {
        setError("Failed to load repositories")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (githubUrl) {
      loadRepositories()
    }
  }, [githubUrl])

  if (!githubUrl) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>GitHub Repositories</CardTitle>
          <CardDescription>Connect your GitHub account to display your repositories</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Connect GitHub</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Repositories</CardTitle>
        <CardDescription>Recent repositories from your GitHub profile</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">{error}</p>
            <Button variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        ) : repositories.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-2">No repositories found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {repositories.map((repo) => (
              <div key={repo.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline flex items-center"
                  >
                    {repo.name}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center mr-3">
                      <Star className="mr-1 h-3 w-3" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center">
                      <GitBranch className="mr-1 h-3 w-3" />
                      {repo.forks_count}
                    </div>
                  </div>
                </div>
                {repo.description && <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>}
                <div className="flex flex-wrap gap-2">
                  {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
                  <span className="text-xs text-muted-foreground">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
