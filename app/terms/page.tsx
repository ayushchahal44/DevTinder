import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Welcome to DevTinder. These Terms of Service ("Terms") govern your access to and use of the DevTinder
              platform, including any content, functionality, and services offered on or through devtinder.com (the
              "Service").
            </p>
            <p>
              Please read the Terms carefully before you start using DevTinder. By using the Service, you accept and
              agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the
              Service.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
              termination of your account on our Service.
            </p>
            <p className="mb-4">
              You are responsible for safeguarding the password that you use to access the Service and for any
              activities or actions under your password.
            </p>
            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming
              aware of any breach of security or unauthorized use of your account.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You agree not to use the Service:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>In any way that violates any applicable national or international law or regulation</li>
              <li>
                To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                mail", "chain letter", "spam", or any other similar solicitation
              </li>
              <li>
                To impersonate or attempt to impersonate DevTinder, a DevTinder employee, another user, or any other
                person or entity
              </li>
              <li>
                To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or
                which may harm DevTinder or users of the Service
              </li>
            </ul>
            <p>
              DevTinder reserves the right to terminate your access to the Service immediately, without prior notice,
              for conduct that we believe violates these Terms or is harmful to other users of the Service, DevTinder,
              or third parties, or for any other reason.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of DevTinder and its licensors. The Service is protected by copyright, trademark, and other laws
              of both the United States and foreign countries.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior
              written consent of DevTinder.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:terms@devtinder.com" className="text-purple-600 hover:underline">
                terms@devtinder.com
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
