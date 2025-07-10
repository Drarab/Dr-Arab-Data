"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface AuthSelectionProps {
  onAdminSelect: () => void
  onCustomerSelect: () => void
}

export function AuthSelection({ onAdminSelect, onCustomerSelect }: AuthSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <img src="/logo.png" alt="Dr Arab Data Center Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Dr Arab Data Center</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-2">
            Your Trusted Airtime & Data Trading Platform
          </p>
          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Powered by BOIJELUX</p>
        </div>

        {/* Auth Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Login Card */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl dark:shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">Admin Portal</CardTitle>
              <p className="text-slate-600 dark:text-slate-300">System Administration & Management</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                <h3 className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Admin Features:</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Manage user accounts</li>
                  <li>• Set trading rates</li>
                  <li>• Monitor transactions</li>
                  <li>• System configuration</li>
                  <li>• Financial reports</li>
                </ul>
              </div>

              <Button
                onClick={onAdminSelect}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 dark:from-amber-600 dark:to-yellow-700 dark:hover:from-amber-700 dark:hover:to-yellow-800 text-white group shadow-md hover:shadow-lg"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Customer Login/Signup Card */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl dark:shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">Customer Portal</CardTitle>
              <p className="text-slate-600 dark:text-slate-300">Buy & Sell Airtime and Data</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 rounded-lg p-4">
                <h3 className="text-sky-700 dark:text-sky-400 font-semibold mb-2">Customer Features:</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Sell airtime at 95% rate</li>
                  <li>• Buy data bundles</li>
                  <li>• Transaction history</li>
                  <li>• Real-time rates</li>
                  <li>• Instant payments</li>
                </ul>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-3">
                <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                  🎉 New customers get ₦100 bonus!
                </p>
              </div>

              <Button
                onClick={onCustomerSelect}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-700 dark:hover:to-blue-800 text-white group shadow-md hover:shadow-lg"
              >
                <Users className="w-4 h-4 mr-2" />
                Customer Access
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8">
            Why Choose Dr Arab Data Center?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-white font-bold">95%</span>
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Best Rates</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Get 95% value when selling your airtime - the best rate in the market
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-white font-bold">24/7</span>
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Always Available</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Round-the-clock service with instant transaction processing
              </p>
            </div>

            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Advanced security measures to protect your transactions and data
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
