"use client"

import { Home, Map, PlusCircle, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AuthModals } from "@/components/auth-modals"

export function AppSidebar() {
  const pathname = usePathname()

  // Simular estado de autenticação (em produção, use um hook de autenticação)
  const isAuthenticated = false
  const isOwner = false

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <h2 className="text-xl font-bold">Chácaras</h2>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home className="h-5 w-5" />
                <span>Início</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/properties"}>
              <Link href="/properties">
                <Map className="h-5 w-5" />
                <span>Chácaras</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {isOwner && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard")}>
                <Link href="/dashboard">
                  <User className="h-5 w-5" />
                  <span>Meu Painel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {isOwner && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/properties/new"}>
                <Link href="/dashboard/properties/new">
                  <PlusCircle className="h-5 w-5" />
                  <span>Nova Chácara</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        {!isAuthenticated ? (
          <AuthModals />
        ) : (
          <div className="flex items-center gap-2 p-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Usuário</p>
              <p className="text-xs text-muted-foreground truncate">usuario@email.com</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

