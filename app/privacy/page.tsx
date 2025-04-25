import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              At DevTinder, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
              please do not access the application.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Personal Data</h3>
            <p className="mb-4">
              When you register for DevTinder, we may ask for personally identifiable information, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>GitHub profile</li>
              <li>Professional title</li>
              <li>Skills and expertise</li>
              <li>Location</li>
              <li>Profile picture</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Usage Data</h3>
            <p>We may also collect information on how the service is accessed and used. This data may include:</p>
            <ul className="list-disc pl-6">
              <li>Types of developers you interact with</li>
              <li>Features you use most frequently</li>
              <li>Time spent on the platform</li>
              <li>Pages visited</li>
              <li>Referring websites</li>
              <li>Other diagnostic data</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">DevTinder may use the collected data for various purposes:</p>
            <ul className="list-disc pl-6">
              <li>To provide and maintain our service</li>
              <li>To match you with compatible developers</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The security of your data is important to us, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
              means to protect your personal data, we cannot guarantee its absolute security.
            </p>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information when you
              enter, submit, or access your personal information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@devtinder.com" className="text-purple-600 hover:underline">
                privacy@devtinder.com
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
