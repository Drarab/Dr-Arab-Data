"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { HomeSection } from "@/components/sections/home-section"
import { WalletSection } from "@/components/sections/wallet-section"
import { SellServicesSection } from "@/components/sections/sell-services-section"
import { DataTypesInfo } from "@/components/sections/data-types-info"
import { ProfileSection } from "@/components/sections/profile-section"
import { ContactSection } from "@/components/sections/contact-section"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminCredentialsSection } from "@/components/sections/admin-credentials-section"
import { useAuth } from "@/lib/auth"

export function UserDashboard() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    if (user?.type === "admin") {
      switch (activeSection) {
        case "home":
          return <HomeSection onSectionChange={setActiveSection} />
        case "buy-airtime":
        case "sell-data":
        case "users":
        case "analytics":
          return <AdminDashboard />
        case "credentials":
          return <AdminCredentialsSection />
        default:
          return <HomeSection onSectionChange={setActiveSection} />
      }
    } else {
      switch (activeSection) {
        case "home":
          return <HomeSection onSectionChange={setActiveSection} />
        case "wallet":
          return <WalletSection />
        case "sell-services":
          return <SellServicesSection />
        case "data-types":
          return <DataTypesInfo onSectionChange={setActiveSection} />
        case "profile":
          return <ProfileSection />
        case "contact":
          return <ContactSection />
        default:
          return <HomeSection onSectionChange={setActiveSection} />
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 md:ml-64 p-6">{renderSection()}</main>
    </div>
  )
}
