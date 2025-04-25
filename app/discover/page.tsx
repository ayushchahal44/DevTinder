"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, X, ChevronDown, ChevronUp, Share2, Linkedin, Twitter, Github, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

// Mock data for developers
const developers = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    title: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "GraphQL", "Jest", "Cypress"],
    bio: "Senior frontend developer with 7 years of experience in building scalable web applications. Currently leading the frontend team at a fintech startup. Expert in component architecture and state management. Regular speaker at tech conferences and contributor to open-source projects.",
    location: "San Francisco, CA",
    githubUrl: "https://github.com/alexj",
    experience: "7 years",
    education: "BS in Computer Science, Stanford University",
    currentCompany: "Fintech Startup",
    availability: "Open to new opportunities",
    languages: ["English", "Spanish"],
    interests: ["Web Performance", "Accessibility", "Design Systems"]
  },
  {
    id: 2,
    name: "Sarah Miller",
    username: "sarahm",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    title: "Backend Engineer",
    skills: ["Node.js", "Express", "MongoDB", "Docker", "AWS"],
    bio: "Backend developer with a focus on scalable architecture and microservices. Love working with Docker and containerization. Open source contributor.",
    location: "New York, NY",
    githubUrl: "https://github.com/sarahm",
  },
  {
    id: 3,
    name: "Michael Chen",
    username: "michaelc",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
    bio: "Full stack developer with experience in building complex web applications. Passionate about DevOps and cloud infrastructure. Tech lead at a startup.",
    location: "Seattle, WA",
    githubUrl: "https://github.com/michaelc",
  },
  {
    id: 4,
    name: "Emma Wilson",
    username: "emmaw",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    title: "UI/UX Designer & Developer",
    skills: ["Figma", "React", "CSS", "UI Design", "User Research"],
    bio: "UI/UX designer turned developer. Creating beautiful and functional interfaces that users love. Strong focus on accessibility and user experience.",
    location: "Austin, TX",
    githubUrl: "https://github.com/emmaw",
  },
  {
    id: 5,
    name: "David Kim",
    username: "davidk",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    title: "DevOps Engineer",
    skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Python"],
    bio: "DevOps engineer with a passion for automation and infrastructure as code. Helping teams deploy faster and more reliably. Cloud architecture expert.",
    location: "Chicago, IL",
    githubUrl: "https://github.com/davidk",
  },
  {
    id: 6,
    name: "Lisa Rodriguez",
    username: "lisar",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    title: "Mobile Developer",
    skills: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase"],
    bio: "Mobile developer specializing in cross-platform development. Building beautiful and performant mobile apps. Active in the React Native community.",
    location: "Miami, FL",
    githubUrl: "https://github.com/lisar",
  },
  {
    id: 7,
    name: "James Wilson",
    username: "jamesw",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    title: "Data Scientist",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Data Analysis"],
    bio: "Data scientist with a focus on machine learning and AI. Building intelligent systems and analyzing complex datasets. PhD in Computer Science.",
    location: "Boston, MA",
    githubUrl: "https://github.com/jamesw",
  },
  {
    id: 8,
    name: "Sophia Lee",
    username: "sophial",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
    title: "Backend Developer",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Microservices"],
    bio: "Backend developer specializing in Java and microservices architecture. Building scalable and reliable systems. Open source contributor and tech speaker.",
    location: "Denver, CO",
    githubUrl: "https://github.com/sophial",
  },
  {
    id: 9,
    name: "Raj Patel",
    username: "rajp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    title: "Blockchain Developer",
    skills: ["Solidity", "Ethereum", "Web3.js", "Rust", "Smart Contracts", "DeFi"],
    bio: "Blockchain developer specializing in DeFi and smart contract development. Built multiple successful DeFi protocols and NFT marketplaces. Security-focused with extensive experience in auditing smart contracts. Active in the Ethereum community.",
    location: "Toronto, Canada",
    githubUrl: "https://github.com/rajp",
    experience: "5 years",
    education: "MS in Cryptography, University of Waterloo",
    currentCompany: "Blockchain Startup",
    availability: "Open to consulting",
    languages: ["English", "Hindi", "French"],
    interests: ["DeFi", "Zero-Knowledge Proofs", "Cryptography"]
  },
  {
    id: 10,
    name: "Maria Garcia",
    username: "mariag",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    title: "Game Developer",
    skills: ["Unity", "C#", "Unreal Engine", "C++", "3D Modeling", "Game Physics"],
    bio: "Game developer with a passion for creating immersive gaming experiences. Worked on multiple AAA titles and indie games. Specializes in game physics and AI systems. Currently developing an indie game with a small team.",
    location: "Los Angeles, CA",
    githubUrl: "https://github.com/mariag",
    experience: "6 years",
    education: "BFA in Game Design, USC",
    currentCompany: "Indie Game Studio",
    availability: "Open to collaborations",
    languages: ["English", "Spanish"],
    interests: ["Game AI", "Procedural Generation", "Virtual Reality"]
  },
  {
    id: 11,
    name: "Kenji Tanaka",
    username: "kenjit",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    title: "Cloud Architect",
    skills: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Serverless", "Microservices"],
    bio: "Cloud architect with expertise in designing and implementing scalable cloud solutions. Certified in all major cloud platforms. Specializes in cloud migration and optimization. Regular contributor to cloud architecture communities.",
    location: "Tokyo, Japan",
    githubUrl: "https://github.com/kenjit",
    experience: "8 years",
    education: "MS in Cloud Computing, University of Tokyo",
    currentCompany: "Cloud Consulting Firm",
    availability: "Open to remote work",
    languages: ["Japanese", "English"],
    interests: ["Cloud Security", "Edge Computing", "Serverless Architecture"]
  },
  {
    id: 12,
    name: "Aisha Mohammed",
    username: "aisham",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    title: "AI/ML Engineer",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "Reinforcement Learning"],
    bio: "AI/ML engineer specializing in natural language processing and computer vision. Developed multiple production-grade ML models. PhD in Machine Learning. Currently working on AI-powered healthcare solutions.",
    location: "London, UK",
    githubUrl: "https://github.com/aisham",
    experience: "4 years",
    education: "PhD in Machine Learning, University of Cambridge",
    currentCompany: "Healthcare AI Startup",
    availability: "Open to research collaborations",
    languages: ["English", "Arabic", "French"],
    interests: ["Healthcare AI", "Ethical AI", "Multimodal Learning"]
  }
]

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState("all")
  const [expandedProfiles, setExpandedProfiles] = useState<Set<number>>(new Set())
  const [connectionMessage, setConnectionMessage] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSendingRequest, setIsSendingRequest] = useState(false)
  const [connectedProfiles, setConnectedProfiles] = useState<Set<number>>(new Set())

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

  const toggleProfileExpansion = (id: number) => {
    const newExpanded = new Set(expandedProfiles)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedProfiles(newExpanded)
  }

  const handleSkillClick = (skill: string) => {
    setFilter(skill.toLowerCase())
  }

  const handleConnect = (id: number) => {
    setSelectedProfile(id)
    setConnectionMessage("")
  }

  const sendConnectionRequest = async () => {
    if (selectedProfile) {
      setIsSendingRequest(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setConnectedProfiles(prev => new Set([...prev, selectedProfile]))
        toast.success("Connection request sent successfully!", {
          description: "You'll be notified when they accept your request.",
        })
        setSelectedProfile(null)
        setConnectionMessage("")
      } catch (error) {
        toast.error("Failed to send connection request", {
          description: "Please try again later.",
        })
      } finally {
        setIsSendingRequest(false)
      }
    }
  }

  const shareProfile = (profile: typeof developers[0]) => {
    const shareData = {
      title: `${profile.name}'s Profile`,
      text: `Check out ${profile.name}'s profile on DevTinder!`,
      url: window.location.href
    }
    if (navigator.share) {
      navigator.share(shareData)
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareData.url)
      alert('Profile link copied to clipboard!')
    }
  }

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = searchQuery === "" || 
      developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      developer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      developer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilter = filter === "all" || 
      developer.skills.some(skill => skill.toLowerCase() === filter)
    
    return matchesSearch && matchesFilter
  })

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
                {Array.from(new Set(developers.flatMap(d => d.skills))).map(skill => (
                  <SelectItem key={skill} value={skill.toLowerCase()}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input 
              placeholder="Search developers..." 
              className="w-64" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDeveloper.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-md"
                  >
                    <Card className="overflow-hidden">
                      <div className="h-64 bg-gray-200 relative">
                        <img
                          src={currentDeveloper.avatar}
                          alt={`${currentDeveloper.name}'s profile`}
                          className="w-full h-full object-cover"
                        />
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
                              <Badge 
                                key={skill} 
                                variant="secondary"
                                className="cursor-pointer hover:bg-primary/20"
                                onClick={() => handleSkillClick(skill)}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {expandedProfiles.has(currentDeveloper.id) && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-2"
                          >
                            <div className="text-sm">
                              <span className="font-medium">Experience:</span> {currentDeveloper.experience}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Education:</span> {currentDeveloper.education}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Current Company:</span> {currentDeveloper.currentCompany}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Languages:</span> {currentDeveloper.languages?.join(", ") || "Not specified"}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Interests:</span> {currentDeveloper.interests?.join(", ") || "Not specified"}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <a href={currentDeveloper.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                              </a>
                              <a href={`https://linkedin.com/in/${currentDeveloper.username}`} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                              </a>
                              <a href={`https://twitter.com/${currentDeveloper.username}`} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-400" />
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProfileExpansion(currentDeveloper.id)}
                        >
                          {expandedProfiles.has(currentDeveloper.id) ? (
                            <>
                              Show Less <ChevronUp className="ml-1 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              View More <ChevronDown className="ml-1 h-4 w-4" />
                            </>
                          )}
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => shareProfile(currentDeveloper)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleConnect(currentDeveloper.id)}
                              >
                                Connect
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Connect with {currentDeveloper.name}</DialogTitle>
                                <DialogDescription>
                                  Send a personalized message to connect with {currentDeveloper.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <Textarea
                                placeholder="Write a message..."
                                value={connectionMessage}
                                onChange={(e) => setConnectionMessage(e.target.value)}
                                className="min-h-[100px]"
                              />
                              <DialogFooter>
                                <Button 
                                  onClick={sendConnectionRequest}
                                  disabled={isSendingRequest}
                                >
                                  {isSendingRequest ? "Sending..." : "Send Request"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-center gap-6 mt-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-red-300 text-red-500"
                      onClick={handleDislike}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-14 w-14 rounded-full border-green-300 text-green-500"
                      onClick={handleLike}
                    >
                      <Heart className="h-6 w-6" />
                    </Button>
                  </motion.div>
                </div>
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
              {filteredDevelopers.map((developer) => (
                <motion.div
                  key={developer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
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
                          <Badge 
                            key={skill} 
                            variant="secondary"
                            className="cursor-pointer hover:bg-primary/20"
                            onClick={() => handleSkillClick(skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">{developer.location}</div>
                      {expandedProfiles.has(developer.id) && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-2"
                        >
                          <div className="text-sm">
                            <span className="font-medium">Experience:</span> {developer.experience}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Education:</span> {developer.education}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Current Company:</span> {developer.currentCompany}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Languages:</span> {developer.languages?.join(", ") || "Not specified"}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Interests:</span> {developer.interests?.join(", ") || "Not specified"}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <a href={developer.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                            </a>
                            <a href={`https://linkedin.com/in/${developer.username}`} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                            </a>
                            <a href={`https://twitter.com/${developer.username}`} target="_blank" rel="noopener noreferrer">
                              <Twitter className="h-5 w-5 text-gray-600 hover:text-blue-400" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleProfileExpansion(developer.id)}
                      >
                        {expandedProfiles.has(developer.id) ? (
                          <>
                            Show Less <ChevronUp className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            View More <ChevronDown className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => shareProfile(developer)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        {connectedProfiles.has(developer.id) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600"
                            disabled
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Connected
                          </Button>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleConnect(developer.id)}
                              >
                                Connect
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Connect with {developer.name}</DialogTitle>
                                <DialogDescription>
                                  Send a personalized message to connect with {developer.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <Textarea
                                placeholder="Write a message..."
                                value={connectionMessage}
                                onChange={(e) => setConnectionMessage(e.target.value)}
                                className="min-h-[100px]"
                              />
                              <DialogFooter>
                                <Button 
                                  onClick={sendConnectionRequest}
                                  disabled={isSendingRequest}
                                >
                                  {isSendingRequest ? "Sending..." : "Send Request"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
