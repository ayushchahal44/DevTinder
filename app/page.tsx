import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Github, Laptop, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">DevTinder</h1>
              <p className="text-xl md:text-2xl font-light">
                Connect with developers who match your skills, interests, and project goals
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white/10">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          DT
                        </div>
                        <span className="font-medium">DevTinder</span>
                      </div>
                      <div className="text-gray-400">12:42 PM</div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm max-w-xs">
                          Looking for a React developer with Docker experience for a new project!
                        </div>
                      </div>
                      <div className="flex gap-3 justify-end">
                        <div className="bg-purple-100 rounded-2xl rounded-tr-none p-3 text-sm max-w-xs">
                          I have 3 years of React experience and I've worked with Docker extensively. Let's connect!
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why DevTinder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-500 mb-2" />
                <CardTitle>Find Your Match</CardTitle>
                <CardDescription>
                  Connect with developers who share your technical interests and project goals
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Code className="h-12 w-12 text-purple-500 mb-2" />
                <CardTitle>Skill-Based Matching</CardTitle>
                <CardDescription>Our algorithm pairs you with developers based on complementary skills</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Laptop className="h-12 w-12 text-purple-500 mb-2" />
                <CardTitle>Project Collaboration</CardTitle>
                <CardDescription>
                  Find the perfect team members for your next big idea or join exciting projects
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Github className="h-12 w-12 text-purple-500 mb-2" />
                <CardTitle>Portfolio Integration</CardTitle>
                <CardDescription>
                  Showcase your work and see others' projects to make informed connections
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <CardTitle>Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sign up and build your developer profile with your skills, experience, and project interests.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <CardTitle>Browse Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our algorithm will suggest developers who match your technical requirements and interests.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <CardTitle>Connect & Collaborate</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Message your matches, discuss ideas, and start building amazing projects together.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your perfect dev match?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are connecting, collaborating, and creating amazing projects together.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/signup">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-300 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">DevTinder</h3>
              <p className="text-sm">© 2025 DevTinder. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
