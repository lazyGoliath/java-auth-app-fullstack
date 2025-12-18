import React, { useState, type FormEvent } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import type RegisterData from "@/models/RegisterData"
import { registerUser } from "@/services/AuthService"
import { useNavigate } from "react-router"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"

function Signup() {
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  })

  // hook
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  // handle input change
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }))
  }

  // handle form submit
  const handleFormSubmit = async (event: FormEvent) => {

    setLoading(true)
    event.preventDefault()

    // data validation
    if (data.name.trim() === "") {
      toast.error("Name is required")
      return 
    }
    if (data.email.trim() === "") {
      toast.error("Email is required")
      return 
    }
    if (data.password.trim() === "" || data.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    console.log("Form submitted:", data)

    // form submission logic goes here(api call)
    try{
      const result = await registerUser(data)
      console.log("Registration successful:", result)
      toast.success("Registration successful! You can now log in.")

      // navigate/redirect to login page after successful registration
      navigate("/login")
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Registration failed. Please try again.")
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join us to get started</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-1 mb-6">
            <h2 className="text-base font-medium">Your details</h2>
            <p className="text-sm text-muted-foreground">
              Enter your info to sign up or continue with a provider.
            </p>
          </div>

          {/* Error Section */}
          {error && (
          <div className="grid mb-3 w-full max-w-xl items-start gap-4">
            <Alert variant={"destructive"}>
              <CheckCircle2Icon />
              <AlertTitle>{error.response.data.error}</AlertTitle>
              <AlertDescription>{error.response.data.message}</AlertDescription>
            </Alert>
          </div>
          )}

          <form onSubmit={handleFormSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={data.name}
                name="name"
                onChange={handleInputChange}
                required
                className="h-10 rounded-md border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={data.email}
                name="email"
                onChange={handleInputChange}
                required
                className="h-10 rounded-md border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={data.password}
                name="password"
                onChange={handleInputChange}
                required
                className="h-10 rounded-md border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <Button disabled={loading} type="submit" className="mt-2 w-full">
              { loading ? (
                <><Spinner /> Signing Up...</>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M12 11v2h5.6c-.2 1.4-.9 2.6-2 3.4l3.2 2.5c1.9-1.7 3-4.2 3-6.9 0-.6-.1-1.2-.2-1.8H12z" />
                <path d="M6.6 14.2a5 5 0 0 1 0-4.5L3.4 7.2a8.02 8.02 0 0 0 0 9.6l3.2-2.6z" />
                <path d="M12 4.8c2 0 3.8.7 5.2 2l3-3A11.7 11.7 0 0 0 12 2 10 10 0 0 0 3.4 7.2l3.2 2.5A5.9 5.9 0 0 1 12 4.8z" />
                <path d="M12 19.2c-1.5 0-2.9-.5-4-1.3l-3.2 2.5A10 10 0 0 0 12 22c2.7 0 5.1-1 6.9-2.7l-3.2-2.5a6.7 6.7 0 0 1-3.7.4z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.9 2.7 1.3.1-.8.4-1.3.8-1.6-2.3-.3-4.7-1.2-4.7-5.4 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1.9-.2 1.9-.3 2.9-.3s2 .1 2.9.3c2.1-.5 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.4 5.1-4.7 5.4.4.3.9 1.1.9 2.2v3.3c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
              </svg>
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t">
          <p className="text-sm text-muted-foreground">
            By creating an account you agree to our Terms and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup