"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, Lock, User } from "lucide-react"

interface AdminLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void
  onBack: () => void
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onLogin({ username, password })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-blue-200/50 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <img src="/logo.png" alt="Dr Arab Data Center Logo" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Admin Access</CardTitle>
          <p className="text-slate-600">Dr Arab Data Center - Admin Portal</p>
          <p className="text-xs text-amber-600 font-medium">Powered by BOIJELUX</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-username" className="text-slate-700">
                Admin Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="admin-username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 pl-10 focus:border-amber-400 focus:ring-amber-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-slate-700">
                Admin Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 pl-10 pr-10 focus:border-amber-400 focus:ring-amber-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-amber-700 text-xs">⚠️ Admin access only. Unauthorized access is prohibited.</p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Login
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="w-full text-slate-600 hover:text-slate-800 hover:bg-blue-50"
            >
              Back to Main
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
