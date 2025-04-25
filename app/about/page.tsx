import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Github, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About DevTinder</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Connecting developers around the world</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              DevTinder was created with a simple but powerful mission: to help developers find the perfect partners for
              their coding journey. Whether you're looking for a mentor, a mentee, a project collaborator, or just
              someone to share your coding passion with, DevTinder is the platform for you.
            </p>
            <p>
              We believe that great software is built by great teams, and great teams start with meaningful connections.
              Our platform uses advanced matching algorithms to connect developers based on complementary skills,
              interests, and goals.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-purple-500 mb-2" />
              <CardTitle>Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Join a thriving community of developers from around the world, all passionate about coding and
                collaboration.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Code className="h-12 w-12 text-purple-500 mb-2" />
              <CardTitle>Skill Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our intelligent matching algorithm connects you with developers whose skills complement yours, creating
                perfect partnerships.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Github className="h-12 w-12 text-purple-500 mb-2" />
              <CardTitle>GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Seamlessly connect your GitHub profile to showcase your projects and find collaborators with similar
                interests.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              DevTinder was founded in 2023 by a group of developers who were frustrated with the challenge of finding
              suitable project partners. Traditional networking platforms weren't tailored to the unique needs of
              developers, and existing developer communities lacked the matchmaking capabilities needed to form
              effective partnerships.
            </p>
            <p className="mb-4">
              We set out to create a platform that would understand the nuances of developer collaboration - matching
              people not just on programming languages or frameworks, but on project interests, coding styles, and
              career goals.
            </p>
            <p>
              Today, DevTinder is helping thousands of developers find their perfect match, whether for short-term
              projects, long-term collaborations, or mentorship relationships.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
