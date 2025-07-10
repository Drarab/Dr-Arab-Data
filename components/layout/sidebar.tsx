"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Wallet, User, Phone, Shield, ChevronLeft, ChevronRight, LogOut } from "lucide-react"

interface SidebarProps {
  user: any
  userRole: "admin" | "customer"
  activeSection: string
  onSectionChange: (section: string) => void
  onLogout: () => void
}

export function Sidebar({ user, userRole, activeSection, onSectionChange, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      description: "Dashboard overview",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
      description: "Balance & transactions",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      description: "Account settings",
    },
    {
      id: "contact",
      label: "Contact",
      icon: Phone,
      description: "Support & help",
    },
  ]

  // Add admin-specific items
  if (userRole === "admin") {
    navigationItems.push({
      id: "admin-credentials",
      label: "Admin Panel",
      icon: Shield,
      description: "System management",
    })
  }

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-r border-blue-200/50 dark:border-slate-700/50 shadow-lg flex flex-col h-screen sticky top-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-blue-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.png" alt="Dr Arab Data Center Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Dr Arab</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">Data Center</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-blue-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                {user?.firstName || user?.username || "User"}
              </p>
              <Badge
                variant="secondary"
                className={
                  userRole === "admin"
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs"
                    : "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 text-xs"
                }
              >
                {userRole === "admin" ? "Admin" : "Customer"}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onSectionChange(item.id)}
              className={`w-full justify-start h-auto p-3 ${
                isActive
                  ? "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Icon className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"} flex-shrink-0`} />
              {!isCollapsed && (
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-200/50 dark:border-slate-700/50 space-y-2">
        {!isCollapsed && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
        )}
        <Button
          variant="ghost"
          onClick={onLogout}
          className={`w-full justify-start text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <LogOut className={`w-4 h-4 ${isCollapsed ? "" : "mr-2"}`} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}
