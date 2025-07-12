"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Wallet,
  User,
  MessageCircle,
  LogOut,
  Menu,
  X,
  Shield,
  Users,
  BarChart3,
  Settings,
  Phone,
  Wifi,
  Send,
  Info,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user, logout } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems =
    user?.type === "admin"
      ? [
          { id: "home", label: "Dashboard", icon: Home },
          { id: "buy-airtime", label: "Buy Airtime", icon: Phone },
          { id: "sell-data", label: "Sell Data", icon: Wifi },
          { id: "users", label: "User Management", icon: Users },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "credentials", label: "Admin Credentials", icon: Settings },
        ]
      : [
          { id: "home", label: "Dashboard", icon: Home },
          { id: "wallet", label: "Wallet & Purchases", icon: Wallet },
          { id: "sell-services", label: "Sell Services", icon: Send },
          { id: "data-types", label: "Data Types Info", icon: Info },
          { id: "profile", label: "Profile", icon: User },
          { id: "contact", label: "Contact", icon: MessageCircle },
        ]

  const handleLogout = () => {
    logout()
    setIsMobileOpen(false)
  }

  const handleMenuClick = (sectionId: string) => {
    onSectionChange(sectionId)
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:inset-0
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/logo.png" alt="Dr Arab Data Center Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dr Arab Data</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">BOIJELUX</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {user?.type === "admin" ? (
                  <Shield className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={user?.type === "admin" ? "destructive" : "default"} className="text-xs">
                    {user?.type === "admin" ? "Admin" : "Customer"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {user?.uid}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-xs text-green-600 dark:text-green-400">Balance</p>
              <p className="text-sm font-bold text-green-700 dark:text-green-300">
                ₦{user?.walletBalance.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleMenuClick(item.id)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
