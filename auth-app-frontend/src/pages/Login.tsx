import React, { useState } from "react"
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
import type LoginData from "@/models/LoginData"
import toast from "react-hot-toast"
//import apiClient from "@/config/ApiClient"
import { useNavigate } from "react-router"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import useAuth from "@/auth/store"
import OAuth2Button from "@/components/OAuth2Button"

function Login() {
  
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const navigate = useNavigate()
  const login = useAuth((state) => state.login)

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent) => {

    setLoading(true)
    event.preventDefault()

    // data validation
    if (loginData.email.trim() === "") {
      toast.error("Email is required")
      return 
    }
    if (loginData.password.trim() === "" || loginData.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return 
    }

    console.log("Login form submitted:", loginData)
    // Add login logic here
    try { 
      
      // const userInfo = await apiClient.post("/auth/login", loginData)
      // console.log("Login successful:", userInfo.data)

      // login function using zustand : useAuth store
      const userInfo = await login(loginData)
      console.log("Login successful:", userInfo)

      toast.success("Login successful!")

      // redirect url
      navigate("/dashboard")

    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please try again.")
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Log in to your account</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-1 mb-6">
            <h2 className="text-base font-medium">Credentials</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to continue.
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

          <form className="grid gap-4" onSubmit={handleFormSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={loginData.email}
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
                value={loginData.password}
                name="password"
                onChange={handleInputChange}
                required
                className="h-10 rounded-md border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <Button disabled={loading} type="submit" className="mt-2 w-full">
              {
                loading ? (
                  <><Spinner /> Signing In...</>
                ) : (
                  "Sign In"
                )
              }
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
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login