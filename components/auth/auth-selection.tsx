"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, ArrowRight } from "lucide-react"

interface AuthSelectionProps {
  onAdminSelect: () => void
  onCustomerSelect: () => void
}

export function AuthSelection({ onAdminSelect, onCustomerSelect }: AuthSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <img src="/logo.png" alt="Dr Arab Data Center Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Dr Arab Data Center</h1>
          <p className="text-xl text-slate-600 mb-2">Your Trusted Airtime & Data Trading Platform</p>
          <p className="text-sm text-amber-600 font-medium">Powered by BOIJELUX</p>
        </div>

        {/* Auth Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Login Card */}
          <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 hover:bg-white/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">Admin Portal</CardTitle>
              <p className="text-slate-600">System Administration & Management</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="text-amber-700 font-semibold mb-2">Admin Features:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Manage user accounts</li>
                  <li>• Set trading rates</li>
                  <li>• Monitor transactions</li>
                  <li>• System configuration</li>
                  <li>• Financial reports</li>
                </ul>
              </div>

              <Button
                onClick={onAdminSelect}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white group shadow-md hover:shadow-lg"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Customer Login/Signup Card */}
          <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 hover:bg-white/90 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">Customer Portal</CardTitle>
              <p className="text-slate-600">Buy & Sell Airtime and Data</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h3 className="text-sky-700 font-semibold mb-2">Customer Features:</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Sell airtime at 95% rate</li>
                  <li>• Buy data bundles</li>
                  <li>• Transaction history</li>
                  <li>• Real-time rates</li>
                  <li>• Instant payments</li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <p className="text-emerald-700 text-sm font-medium">🎉 New customers get ₦100 bonus!</p>
              </div>

              <Button
                onClick={onCustomerSelect}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white group shadow-md hover:shadow-lg"
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
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Why Choose Dr Arab Data Center?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-white font-bold">95%</span>
              </div>
              <h3 className="text-slate-800 font-semibold mb-2">Best Rates</h3>
              <p className="text-slate-600 text-sm">
                Get 95% value when selling your airtime - the best rate in the market
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-white font-bold">24/7</span>
              </div>
              <h3 className="text-slate-800 font-semibold mb-2">Always Available</h3>
              <p className="text-slate-600 text-sm">Round-the-clock service with instant transaction processing</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 shadow-md">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-slate-800 font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-slate-600 text-sm">Advanced security measures to protect your transactions and data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
