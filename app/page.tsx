"use client"

import { useState } from "react"
import { AuthSelection } from "@/components/auth/auth-selection"
import { AdminLogin } from "@/components/auth/admin-login"
import { CustomerAuth } from "@/components/auth/customer-auth"
import { UserDashboard } from "@/components/user/user-dashboard"
import { useAuth } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"

type AuthFlow = "selection" | "admin-login" | "customer-auth"

export default function Home() {
  const { isAuthenticated } = useAuth()
  const [authFlow, setAuthFlow] = useState<AuthFlow>("selection")

  if (isAuthenticated) {
    return (
      <>
        <UserDashboard />
        <Toaster />
      </>
    )
  }

  return (
    <>
      {authFlow === "selection" && (
        <AuthSelection
          onAdminSelect={() => setAuthFlow("admin-login")}
          onCustomerSelect={() => setAuthFlow("customer-auth")}
        />
      )}

      {authFlow === "admin-login" && <AdminLogin onLogin={() => {}} onBack={() => setAuthFlow("selection")} />}

      {authFlow === "customer-auth" && (
        <CustomerAuth onLogin={() => {}} onSignup={() => {}} onBack={() => setAuthFlow("selection")} />
      )}

      <Toaster />
    </>
  )
}
