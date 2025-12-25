import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function OAuth2Failure() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string>("")

  useEffect(() => {
    // Extract error message from URL parameters
    const errorParam = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")

    if (errorDescription) {
      setError(decodeURIComponent(errorDescription))
    } else if (errorParam) {
      setError(decodeURIComponent(errorParam))
    } else {
      setError("OAuth 2.0 authentication failed. Please try again.")
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-destructive">Authentication Failed</CardTitle>
          <CardDescription>
            We couldn't complete your OAuth 2.0 login
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <p className="text-sm text-muted-foreground">
            This might happen due to:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Incorrect authorization credentials</li>
            <li>Access was denied</li>
            <li>Session expired</li>
            <li>Network connectivity issues</li>
          </ul>
        </CardContent>

        <CardFooter className="flex gap-3 justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            className="flex-1"
          >
            Back to Login
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OAuth2Failure