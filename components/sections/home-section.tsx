"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, CreditCard, Gift, TrendingUp, Phone, Wifi, Shield, Clock, CheckCircle } from "lucide-react"
import { DataTypesInfo } from "./data-types-info"

interface HomeSectionProps {
  user: any
  userRole: "admin" | "customer"
}

export function HomeSection({ user, userRole }: HomeSectionProps) {
  const recentTransactions = [
    {
      id: "TXN001",
      type: "Data Purchase",
      description: "1GB MTN Data to 08012345678",
      amount: "-₦280",
      status: "Completed",
      time: "2 mins ago",
    },
    {
      id: "TXN002",
      type: "Deposit",
      description: "Bank deposit confirmation",
      amount: "+₦5,000",
      status: "Approved",
      time: "1 hour ago",
    },
    {
      id: "TXN003",
      type: "Referral Bonus",
      description: "Bonus from @newuser referral",
      amount: "+₦100",
      status: "Completed",
      time: "2 hours ago",
    },
  ]

  const adminStats = [
    { label: "Total Revenue", value: "₦245,231", change: "+20.1%", icon: DollarSign, color: "emerald" },
    { label: "Total Users", value: "1,350", change: "+12 new", icon: Users, color: "sky" },
    { label: "Pending Deposits", value: "8", change: "Requires approval", icon: CreditCard, color: "amber" },
    { label: "Referral Rewards", value: "₦100", change: "Per referral", icon: Gift, color: "purple" },
  ]

  const customerStats = [
    { label: "Account Balance", value: "₦2,500", change: "Available", icon: DollarSign, color: "emerald" },
    { label: "Total Referrals", value: "3", change: "Active", icon: Users, color: "purple" },
    { label: "Referral Earnings", value: "₦300", change: "Total earned", icon: Gift, color: "amber" },
    { label: "Transactions", value: "24", change: "This month", icon: TrendingUp, color: "sky" },
  ]

  const stats = userRole === "admin" ? adminStats : customerStats

  const dataRates = {
    mtn: {
      sme: { "1GB": 280, "2GB": 560, "5GB": 1400, "10GB": 2800 },
      gifting: { "1GB": 300, "2GB": 600, "5GB": 1500, "10GB": 3000 },
      "corporate-gifting": { "1GB": 320, "2GB": 640, "5GB": 1600, "10GB": 3200 },
    },
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-sky-200 dark:border-sky-800/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              Welcome back, {user?.firstName || user?.username || "User"}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              {userRole === "admin"
                ? "Manage your platform and monitor all activities"
                : "Trade airtime and data with the best rates in Nigeria"}
            </p>
          </div>
          <div className="text-right">
            <Badge
              variant="secondary"
              className={
                userRole === "admin"
                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  : "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400"
              }
            >
              <Shield className="w-3 h-3 mr-1" />
              {userRole === "admin" ? "Administrator" : "Customer"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`bg-gradient-to-r ${
                stat.color === "emerald"
                  ? "from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800/50"
                  : stat.color === "sky"
                    ? "from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800/50"
                    : stat.color === "amber"
                      ? "from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800/50"
                      : "from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800/50"
              } shadow-md`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">{stat.label}</CardTitle>
                <Icon
                  className={`w-4 h-4 ${
                    stat.color === "emerald"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : stat.color === "sky"
                        ? "text-sky-600 dark:text-sky-400"
                        : stat.color === "amber"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-purple-600 dark:text-purple-400"
                  }`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.color === "emerald"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : stat.color === "sky"
                        ? "text-sky-600 dark:text-sky-400"
                        : stat.color === "amber"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-purple-600 dark:text-purple-400"
                  }`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-slate-100">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {userRole === "admin" ? (
              <>
                <Button className="w-full justify-start bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/50">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Deposits
                </Button>
                <Button className="w-full justify-start bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/50">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800/50">
                  <Phone className="w-4 h-4 mr-2" />
                  Buy Airtime (95%)
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full justify-start bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/50">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Deposit Funds
                </Button>
                <Button className="w-full justify-start bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/50">
                  <Wifi className="w-4 h-4 mr-2" />
                  Buy Data Bundle
                </Button>
                <Button className="w-full justify-start bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800/50">
                  <Gift className="w-4 h-4 mr-2" />
                  Invite Friends
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.slice(0, 3).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{transaction.type}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        transaction.amount.startsWith("+")
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {transaction.amount}
                    </p>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Features */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100">Platform Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">95%</span>
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Best Rates</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Get 95% value when selling your airtime - the best rate in the market
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">24/7</span>
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Always Available</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Round-the-clock service with instant transaction processing
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Advanced security measures to protect your transactions and data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Types Information */}
      <DataTypesInfo />

      {/* Data Rates Display */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100">Data Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-sky-700 dark:text-sky-400 font-semibold">MTN Data Rates (SME)</h3>
            {Object.entries(dataRates.mtn.sme).map(([bundle, price]) => (
              <div key={bundle} className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{bundle}</span>
                <span className="text-slate-800 dark:text-slate-100">₦{price}</span>
              </div>
            ))}
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Also available: Gifting & Corporate Gifting
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
