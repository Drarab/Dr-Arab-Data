"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, User, Building2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface AuthSelectionProps {
  onAdminSelect: () => void
  onCustomerSelect: () => void
}

export function AuthSelection({ onAdminSelect, onCustomerSelect }: AuthSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-amber-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center">
              <img src="/logo.png" alt="Dr Arab Data Center Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Dr Arab Data Center</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Powered by BOIJELUX - Your trusted partner for data and airtime services
          </p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Login */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-amber-200 dark:border-amber-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Administrator</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Access admin dashboard and manage platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Admin Features:</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Manage user accounts and transactions</li>
                  <li>• Buy airtime with minimum ₦500 restriction</li>
                  <li>• Sell data with all data types</li>
                  <li>• View platform analytics and reports</li>
                  <li>• Access admin credentials section</li>
                </ul>
              </div>
              <Button
                onClick={onAdminSelect}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 dark:from-amber-600 dark:to-orange-700 dark:hover:from-amber-700 dark:hover:to-orange-800 text-white shadow-md hover:shadow-lg"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Continue as Admin
              </Button>
            </CardContent>
          </Card>

          {/* Customer Login */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-sky-200 dark:border-sky-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Customer</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Access your personal dashboard and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-sky-700 dark:text-sky-400 mb-2">Customer Features:</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Fund wallet and manage balance</li>
                  <li>• Buy airtime and data bundles</li>
                  <li>• Sell data/airtime to other users</li>
                  <li>• Choose from SME, Gifting, Corporate data</li>
                  <li>• Track transaction history</li>
                </ul>
              </div>
              <Button
                onClick={onCustomerSelect}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-700 dark:hover:to-blue-800 text-white shadow-md hover:shadow-lg"
              >
                <User className="w-4 h-4 mr-2" />
                Continue as Customer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2024 Dr Arab Data Center. Powered by BOIJELUX. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
