"use client"

import { useState } from "react"
import { AuthSelection } from "@/components/auth/auth-selection"
import { AdminLogin } from "@/components/auth/admin-login"
import { CustomerAuth } from "@/components/auth/customer-auth"

// Import the new dashboard components at the top
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { UserDashboard } from "@/components/user/user-dashboard"

type AuthState = "selection" | "admin-login" | "customer-auth" | "admin-dashboard" | "customer-dashboard"
type UserRole = "admin" | "customer" | null

export default function DrArabDataCenter() {
  const [authState, setAuthState] = useState<AuthState>("selection")
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [user, setUser] = useState<any>(null)

  // Trading state
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Calculate buy rate (95% of original value)
  const calculateBuyRate = (amount: number) => {
    return (amount * 0.95).toFixed(2)
  }

  // Authentication handlers
  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    // Simulate admin authentication
    setUser({ username: credentials.username, role: "admin" })
    setUserRole("admin")
    setAuthState("admin-dashboard")
  }

  const handleCustomerLogin = (credentials: { email: string; password: string }) => {
    // Simulate customer authentication
    setUser({ email: credentials.email, role: "customer" })
    setUserRole("customer")
    setAuthState("customer-dashboard")
  }

  const handleCustomerSignup = (userData: any) => {
    // Simulate customer registration
    setUser({ ...userData, role: "customer" })
    setUserRole("customer")
    setAuthState("customer-dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    setUserRole(null)
    setAuthState("selection")
  }

  // Sample transaction data
  const transactions = [
    {
      id: "TXN001",
      type: "Buy",
      network: "MTN",
      amount: "₦2,000",
      rate: "95%",
      profit: "₦100",
      status: "Completed",
      time: "2 mins ago",
    },
    {
      id: "TXN002",
      type: "Sell",
      network: "Airtel",
      amount: "₦5,000",
      rate: "100%",
      profit: "₦250",
      status: "Completed",
      time: "5 mins ago",
    },
    {
      id: "TXN003",
      type: "Buy",
      network: "Glo",
      amount: "₦1,500",
      rate: "95%",
      profit: "₦75",
      status: "Pending",
      time: "8 mins ago",
    },
    {
      id: "TXN004",
      type: "Sell",
      network: "9mobile",
      amount: "₦3,000",
      rate: "100%",
      profit: "₦150",
      status: "Completed",
      time: "12 mins ago",
    },
  ]

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

  // Replace the main dashboard rendering section (after authentication screens) with:
  // Main dashboard - render appropriate dashboard based on user role
  if (authState === "admin-dashboard") {
    return <AdminDashboard user={user} onLogout={handleLogout} />
  }

  if (authState === "customer-dashboard") {
    return <UserDashboard user={user} onLogout={handleLogout} />
  }

  // Remove the existing dashboard JSX code that was previously here
}
