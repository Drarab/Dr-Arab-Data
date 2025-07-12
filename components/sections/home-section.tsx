"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  TrendingUp,
  Users,
  Activity,
  Phone,
  Wifi,
  Send,
  Plus,
  ArrowRight,
  DollarSign,
  ShoppingCart,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useTransactions } from "@/lib/transactions"

interface HomeSectionProps {
  onSectionChange: (section: string) => void
}

export function HomeSection({ onSectionChange }: HomeSectionProps) {
  const { user } = useAuth()
  const { getTransactionsByUid, getAllTransactions } = useTransactions()

  const userTransactions = user ? getTransactionsByUid(user.uid) : []
  const allTransactions = getAllTransactions()

  const completedTransactions = userTransactions.filter((t) => t.status === "completed")
  const totalSpent = completedTransactions.reduce((sum, t) => sum + t.amount, 0)
  const recentTransactions = userTransactions.slice(0, 3)

  // Admin stats
  const totalUsers = 156
  const totalRevenue = allTransactions.reduce((sum, t) => sum + t.amount, 0)
  const successRate =
    Math.round((allTransactions.filter((t) => t.status === "completed").length / allTransactions.length) * 100) || 0

  if (user?.type === "admin") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.name}</p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allTransactions.length}</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{successRate}%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSectionChange("buy-airtime")}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Buy Airtime
              </CardTitle>
              <CardDescription>Purchase airtime with admin privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Min ₦500</Badge>
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSectionChange("sell-data")}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wifi className="mr-2 h-5 w-5" />
                Sell Data
              </CardTitle>
              <CardDescription>Manage data sales and types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">All Types</Badge>
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onSectionChange("users")}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="default">{totalUsers} Users</Badge>
                <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
            <CardDescription>Latest transactions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      {transaction.type.includes("airtime") ? (
                        <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.type.includes("sell") ? "User Sale" : "Purchase"} - {transaction.network}
                      </p>
                      <p className="text-xs text-gray-500">UID: {transaction.uid}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₦{transaction.amount.toLocaleString()}</p>
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and services</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{user?.walletBalance.toLocaleString()}</div>
            <p className="text-xs opacity-90">Available for purchases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTransactions.length}</div>
            <p className="text-xs text-muted-foreground">{completedTransactions.length} completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time spending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          onClick={() => onSectionChange("wallet")}
          className="h-20 flex-col space-y-2 bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-6 w-6" />
          <span>Fund Wallet</span>
        </Button>

        <Button onClick={() => onSectionChange("wallet")} variant="outline" className="h-20 flex-col space-y-2">
          <Phone className="h-6 w-6" />
          <span>Buy Airtime</span>
        </Button>

        <Button onClick={() => onSectionChange("wallet")} variant="outline" className="h-20 flex-col space-y-2">
          <Wifi className="h-6 w-6" />
          <span>Buy Data</span>
        </Button>

        <Button onClick={() => onSectionChange("sell-services")} variant="outline" className="h-20 flex-col space-y-2">
          <Send className="h-6 w-6" />
          <span>Sell Services</span>
        </Button>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest activity</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => onSectionChange("profile")}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      {transaction.type.includes("airtime") ? (
                        <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      ) : transaction.type.includes("sell") ? (
                        <Send className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.type.includes("sell")
                          ? `Sold ${transaction.type.includes("airtime") ? "Airtime" : "Data"}`
                          : `${transaction.type === "airtime" ? "Airtime" : "Data"} Purchase`}
                        {transaction.dataType && ` (${transaction.dataType})`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.network} • {transaction.phone}
                      </p>
                      <p className="text-xs text-gray-400">{new Date(transaction.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${transaction.type.includes("sell") ? "text-green-600" : "text-blue-600"}`}
                    >
                      {transaction.type.includes("sell") ? "+" : "-"}₦{transaction.amount.toLocaleString()}
                    </p>
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
              <p className="text-sm text-gray-400">Start by funding your wallet or making a purchase</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
