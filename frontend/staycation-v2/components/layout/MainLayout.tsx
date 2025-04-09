import type { ReactNode } from "react"
import Navbar from "../Navbar"

type UserRole = "visitor" | "tenant" | "owner" | "admin" | null

interface MainLayoutProps {
  children: ReactNode
  userRole?: UserRole
  userName?: string
  userAvatar?: string
}

export default function MainLayout({
  children,
  userRole = "visitor",
  userName = "Visitante",
  userAvatar,
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar userRole={userRole} userName={userName} userAvatar={userAvatar} />
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  )
}

