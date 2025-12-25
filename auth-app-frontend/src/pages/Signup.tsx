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
import OAuth2Button from "@/components/OAuth2Button"

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

        {/* OAuth2 Buttons */}
        <OAuth2Button />

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