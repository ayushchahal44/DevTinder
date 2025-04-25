"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Twitter, X } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { GitHubRepositories } from "@/components/github-repositories"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [skills, setSkills] = useState<string[]>(user?.skills || ["React", "TypeScript", "Node.js", "Docker"])
  const [newSkill, setNewSkill] = useState("")
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    title: user?.title || "",
    bio: user?.bio || "",
    location: user?.location || "",
    githubUrl: user?.githubUrl || "",
    experience: "",
    education: "",
    lookingFor: "",
    projectInterests: "",
    availability: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        title: user.title || "",
        bio: user.bio || "",
        location: user.location || "",
        githubUrl: user.githubUrl || "",
        experience: "",
        education: "",
        lookingFor: "",
        projectInterests: "",
        availability: "",
      })
      if (user.skills) {
        setSkills(user.skills)
      }
    }
  }, [user])

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update the user profile in your backend
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      setIsSaving(false)
    }, 1000)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="mb-6">Please log in to view your profile.</p>
        <Button asChild>
          <a href="/login">Log In</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={user.avatar || "/placeholder.svg?height=100&width=100"} alt="Profile" />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{user.name}</CardTitle>
                <CardDescription>{profileData.title || "Developer"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p>{profileData.location || "Not specified"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Social Links</h3>
                    <div className="flex space-x-2 mt-2">
                      {profileData.githubUrl && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="icon" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {profileData.githubUrl && (
              <div className="mt-6">
                <GitHubRepositories githubUrl={profileData.githubUrl} />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Basic Info</TabsTrigger>
                <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" name="title" value={profileData.title} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" value={profileData.location} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
                      </div>
                      <Button type="button" onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Experience</CardTitle>
                    <CardDescription>Add your technical skills and experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Skills</Label>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addSkill()
                              }
                            }}
                          />
                          <Button type="button" onClick={addSkill}>
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Work Experience</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          value={profileData.experience}
                          onChange={handleChange}
                          placeholder="Senior Developer at Acme Inc. (2020-Present)
Frontend Developer at Tech Solutions (2018-2020)"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Textarea
                          id="education"
                          name="education"
                          value={profileData.education}
                          onChange={handleChange}
                          placeholder="B.S. Computer Science, University of California (2014-2018)"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="githubUrl">GitHub Profile URL</Label>
                        <Input
                          id="githubUrl"
                          name="githubUrl"
                          value={profileData.githubUrl}
                          onChange={handleChange}
                          placeholder="https://github.com/username"
                        />
                      </div>

                      <Button type="button" onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Matching Preferences</CardTitle>
                    <CardDescription>Set your preferences for developer matching</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="lookingFor">I'm looking for</Label>
                        <Textarea
                          id="lookingFor"
                          name="lookingFor"
                          value={profileData.lookingFor}
                          onChange={handleChange}
                          placeholder="I'm looking for developers to collaborate on open source projects related to containerization and cloud infrastructure."
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectInterests">Project Interests</Label>
                        <Textarea
                          id="projectInterests"
                          name="projectInterests"
                          value={profileData.projectInterests}
                          onChange={handleChange}
                          placeholder="Web applications, DevOps, Cloud infrastructure, Containerization"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability</Label>
                        <Textarea
                          id="availability"
                          name="availability"
                          value={profileData.availability}
                          onChange={handleChange}
                          placeholder="Available for part-time collaboration, evenings and weekends."
                          rows={2}
                        />
                      </div>

                      <Button type="button" onClick={handleSaveProfile} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Preferences"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
