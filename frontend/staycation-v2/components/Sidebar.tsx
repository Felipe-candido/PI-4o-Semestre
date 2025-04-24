"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Home,
  Search,
  User,
  LogIn,
  Calendar,
  Settings,
  PlusCircle,
  DollarSign,
  Users,
  CheckSquare,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react"

type UserRole = "visitor" | "tenant" | "owner" | "admin" | null

interface SidebarProps {
  userRole?: UserRole
  userName?: string
  userAvatar?: string
}

export default function Sidebar({
  userRole = "visitor",
  userName = "Guest",
  userAvatar = "/placeholder.svg?height=32&width=32",
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: "Home", path: "/", icon: <Home size={20} /> },
      { name: "Search Properties", path: "/search", icon: <Search size={20} /> },
    ]

    if (userRole === "visitor") {
      return [
        ...commonItems,
        { name: "Login", path: "/auth/login", icon: <LogIn size={20} /> },
        { name: "Register", path: "/auth/register", icon: <User size={20} /> },
      ]
    }

    if (userRole === "tenant") {
      return [
        ...commonItems,
        { name: "My Reservations", path: "/dashboard/bookings", icon: <Calendar size={20} /> },
        { name: "Profile", path: "/profile", icon: <User size={20} /> },
      ]
    }

    if (userRole === "owner") {
      return [
        { name: "Dashboard", path: "/dashboard", icon: <Settings size={20} /> },
        { name: "My Listings", path: "/dashboard/properties", icon: <PlusCircle size={20} /> },
        { name: "Create Listing", path: "/dashboard/properties/new", icon: <PlusCircle size={20} /> },
        {
          name: "Reservations",
          path: "/dashboard/bookings",
          icon: <Calendar size={20} />,
        },
        { name: "Earnings", path: "/dashboard/earnings", icon: <DollarSign size={20} /> },
        { name: "Profile", path: "/profile", icon: <User size={20} /> },
      ]
    }

    if (userRole === "admin") {
      return [
        { name: "Admin Dashboard", path: "/admin", icon: <Settings size={20} /> },
        { name: "Manage Listings", path: "/admin/approvals", icon: <CheckSquare size={20} /> },
        { name: "Manage Users", path: "/admin/users", icon: <Users size={20} /> },
        { name: "Reports", path: "/admin/reports", icon: <FileText size={20} /> },
        { name: "Admin Registration", path: "/admin/register", icon: <User size={20} /> },
      ]
    }

    return commonItems
  }

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({})

  const toggleSubmenu = (name: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white lg:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebarOnMobile} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0 lg:w-20"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo and Brand */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <Link href="/" className="flex items-center" onClick={closeSidebarOnMobile}>
              <span className={`font-bold text-xl text-primary ${!isOpen && "lg:hidden"}`}>StayCation</span>
              {!isOpen && <span className="hidden lg:block text-xl font-bold text-primary">S</span>}
            </Link>
          </div>

          {/* User Profile Section */}
          {userRole !== "visitor" && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <img src={userAvatar || "/placeholder.svg"} alt={userName} className="w-8 h-8 rounded-full mr-3" />
                <div className={`${!isOpen && "lg:hidden"}`}>
                  <p className="font-medium text-gray-900 dark:text-white">{userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {getNavItems().map((item) => (
                <li key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className={`flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          pathname.startsWith(item.path)
                            ? "bg-gray-100 dark:bg-gray-700 text-primary"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span className={`flex-1 ${!isOpen && "lg:hidden"}`}>{item.name}</span>
                        {isOpen && (
                          <span>
                            {expandedMenus[item.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </span>
                        )}
                      </button>

                      {/* Submenu */}
                      {expandedMenus[item.name] && isOpen && (
                        <ul className="mt-2 ml-6 space-y-2">
                          {item.submenu?.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.path}
                                onClick={closeSidebarOnMobile}
                                className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  isActive(subItem.path)
                                    ? "bg-gray-100 dark:bg-gray-700 text-primary"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                <span className="mr-3">{subItem.icon}</span>
                                <span>{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={closeSidebarOnMobile}
                      className={`flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        isActive(item.path)
                          ? "bg-gray-100 dark:bg-gray-700 text-primary"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className={`${!isOpen && "lg:hidden"}`}>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button (for logged in users) */}
          {userRole !== "visitor" && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  // Handle logout logic here
                  closeSidebarOnMobile()
                }}
                className="flex items-center w-full p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut size={20} className="mr-3" />
                <span className={`${!isOpen && "lg:hidden"}`}>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Wrapper - adjust margin based on sidebar state */}
      <div className={`transition-all duration-300 ${isOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* This is where your page content would go */}
      </div>
    </>
  )
}

