"use client"

import { useState } from "react"
import { AuthSelection } from "@/components/auth/auth-selection"
import { AdminLogin } from "@/components/auth/admin-login"
import { CustomerAuth } from "@/components/auth/customer-auth"
import { Sidebar } from "@/components/layout/sidebar"
import { HomeSection } from "@/components/sections/home-section"
import { WalletSection } from "@/components/sections/wallet-section"
import { ProfileSection } from "@/components/sections/profile-section"
import { ContactSection } from "@/components/sections/contact-section"
import { AdminCredentialsSection } from "@/components/sections/admin-credentials-section"

type AuthState = "selection" | "admin-login" | "customer-auth" | "dashboard"
type UserRole = "admin" | "customer" | null

export default function DrArabDataCenter() {
  const [authState, setAuthState] = useState<AuthState>("selection")
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [user, setUser] = useState<any>(null)
  const [activeSection, setActiveSection] = useState("home")

  // Authentication handlers
  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    // Simulate admin authentication
    setUser({ username: credentials.username, role: "admin" })
    setUserRole("admin")
    setAuthState("dashboard")
    setActiveSection("home")
  }

  const handleCustomerLogin = (credentials: { email: string; password: string }) => {
    // Simulate customer authentication
    setUser({ email: credentials.email, role: "customer" })
    setUserRole("customer")
    setAuthState("dashboard")
    setActiveSection("home")
  }

  const handleCustomerSignup = (userData: any) => {
    // Simulate customer registration
    setUser({ ...userData, role: "customer" })
    setUserRole("customer")
    setAuthState("dashboard")
    setActiveSection("home")
  }

  const handleLogout = () => {
    setUser(null)
    setUserRole(null)
    setAuthState("selection")
    setActiveSection("home")
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  // Render authentication screens
  if (authState === "selection") {
    return (
      <AuthSelection
        onAdminSelect={() => setAuthState("admin-login")}
        onCustomerSelect={() => setAuthState("customer-auth")}
      />
    )
  }

  if (authState === "admin-login") {
    return <AdminLogin onLogin={handleAdminLogin} onBack={() => setAuthState("selection")} />
  }

  if (authState === "customer-auth") {
    return (
      <CustomerAuth
        onLogin={handleCustomerLogin}
        onSignup={handleCustomerSignup}
        onBack={() => setAuthState("selection")}
      />
    )
  }

  // Main dashboard with sidebar navigation
  if (authState === "dashboard" && userRole) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-amber-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800">
        <Sidebar
          user={user}
          userRole={userRole}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-6 overflow-auto">
          {activeSection === "home" && <HomeSection user={user} userRole={userRole} />}
          {activeSection === "wallet" && <WalletSection user={user} userRole={userRole} />}
          {activeSection === "profile" && <ProfileSection user={user} userRole={userRole} />}
          {activeSection === "contact" && <ContactSection user={user} userRole={userRole} />}
          {activeSection === "admin-credentials" && userRole === "admin" && <AdminCredentialsSection user={user} />}
        </main>
      </div>
    )
  }

  return null
}
