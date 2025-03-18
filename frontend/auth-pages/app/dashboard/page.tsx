"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { LogOut, User } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    // Fetch user data from Django REST Framework backend
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }

        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
        localStorage.removeItem("token")
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-4">
      <header className="container mx-auto flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>

      <main className="container mx-auto flex-1 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your Dashboard</CardTitle>
            <CardDescription>You are now logged in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Username</p>
                <p className="text-sm text-gray-500">{user?.username}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium">What&apos;s Next?</h3>
              <p className="mt-2 text-gray-600">
                This is a simple dashboard page. In a real application, you would display user-specific data and
                functionality here. Connect this frontend to your Django REST Framework backend to implement the full
                functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

