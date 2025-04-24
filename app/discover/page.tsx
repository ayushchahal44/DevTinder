"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for developers
const developers = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    bio: "Passionate about creating beautiful and responsive user interfaces. 5 years of experience in frontend development.",
    location: "San Francisco, CA",
    githubUrl: "https://github.com/alexj",
  },
  {
    id: 2,
    name: "Sarah Miller",
    username: "sarahm",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Backend Engineer",
    skills: ["Node.js", "Express", "MongoDB", "Docker"],
    bio: "Backend developer with a focus on scalable architecture and microservices. Love working with Docker and containerization.",
    location: "New York, NY",
    githubUrl: "https://github.com/sarahm",
  },
  {
    id: 3,
    name: "Michael Chen",
    username: "michaelc",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    bio: "Full stack developer with experience in building complex web applications. Passionate about DevOps and cloud infrastructure.",
    location: "Seattle, WA",
    githubUrl: "https://github.com/michaelc",
  },
]

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState("all")

  const handleLike = () => {
    console.log(`Liked ${developers[currentIndex].name}`)
    if (currentIndex < developers.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleDislike = () => {
    console.log(`Disliked ${developers[currentIndex].name}`)
    if (currentIndex < developers.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleMessage = () => {
    console.log(`Messaging ${developers[currentIndex].name}`)
  }

  const currentDeveloper = developers[currentIndex]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Discover Developers</h1>
          <div className="flex items-center gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search developers..." className="w-64" />
          </div>
        </div>

        <Tabs defaultValue="swipe" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="swipe">Swipe Mode</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="swipe">
            {currentIndex < developers.length ? (
              <div className="flex flex-col items-center">
                <Card className="w-full max-w-md overflow-hidden">
                  <div className="h-64 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">Profile Image</div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={currentDeveloper.avatar || "/placeholder.svg"}
                            alt={currentDeveloper.name}
                          />
                          <AvatarFallback>{currentDeveloper.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{currentDeveloper.name}</CardTitle>
                          <CardDescription>{currentDeveloper.title}</CardDescription>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{currentDeveloper.location}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-4">{currentDeveloper.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {currentDeveloper.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center gap-6">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-red-300 text-red-500"
                      onClick={handleDislike}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-blue-300 text-blue-500"
                      onClick={handleMessage}
                    >
                      <MessageCircle className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-green-300 text-green-500"
                      className="h-14 w-14 rounded-full border-green-300 text-green-500"
                      onClick={handleLike}
                    >
                      <Heart className="h-6 w-6" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No more developers to show</h3>
                <p className="text-gray-500 mb-4">You've seen all available developers matching your criteria</p>
                <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {developers.map((developer) => (
                <Card key={developer.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={developer.avatar || "/placeholder.svg"} alt={developer.name} />
                        <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{developer.name}</CardTitle>
                        <CardDescription>{developer.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{developer.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {developer.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">{developer.location}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => console.log(`View profile: ${developer.name}`)}>
                      View Profile
                    </Button>
                    <Button size="sm" onClick={() => console.log(`Connect with: ${developer.name}`)}>
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
