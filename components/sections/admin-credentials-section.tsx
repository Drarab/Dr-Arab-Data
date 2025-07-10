"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Shield,
  Users,
  DollarSign,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Phone,
  CreditCard,
  UserX,
  Gift,
  TrendingDown,
  Eye,
  Key,
  Database,
  Activity,
  AlertTriangle,
} from "lucide-react"

interface AdminCredentialsSectionProps {
  user: any
}

export function AdminCredentialsSection({ user }: AdminCredentialsSectionProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [buyAmount, setBuyAmount] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Sample data
  const pendingDeposits = [
    {
      id: "DEP001",
      user: "John Doe",
      username: "johndoe",
      amount: "₦5,000",
      bank: "GTBank",
      accountName: "John Doe",
      reference: "TXN123456789",
      time: "5 mins ago",
      status: "pending",
    },
    {
      id: "DEP002",
      user: "Jane Smith",
      username: "janesmith",
      amount: "₦10,000",
      bank: "Access Bank",
      accountName: "Jane Smith",
      reference: "TXN987654321",
      time: "12 mins ago",
      status: "pending",
    },
  ]

  const users = [
    {
      id: "USR001",
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      phone: "08012345678",
      balance: "₦2,500",
      referredBy: "admin",
      referrals: 3,
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "USR002",
      name: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com",
      phone: "08087654321",
      balance: "₦5,200",
      referredBy: "johndoe",
      referrals: 1,
      status: "active",
      joinDate: "2024-01-20",
    },
  ]

  const [dataRates, setDataRates] = useState({
    mtn: {
      sme: { "1GB": 280, "2GB": 560, "5GB": 1400, "10GB": 2800 },
      gifting: { "1GB": 300, "2GB": 600, "5GB": 1500, "10GB": 3000 },
      "corporate-gifting": { "1GB": 320, "2GB": 640, "5GB": 1600, "10GB": 3200 },
    },
    airtel: {
      sme: { "1GB": 270, "2GB": 540, "5GB": 1350, "10GB": 2700 },
      gifting: { "1GB": 290, "2GB": 580, "5GB": 1450, "10GB": 2900 },
      "corporate-gifting": { "1GB": 310, "2GB": 620, "5GB": 1550, "10GB": 3100 },
    },
    glo: {
      sme: { "1GB": 260, "2GB": 520, "5GB": 1300, "10GB": 2600 },
      gifting: { "1GB": 280, "2GB": 560, "5GB": 1400, "10GB": 2800 },
      "corporate-gifting": { "1GB": 300, "2GB": 600, "5GB": 1500, "10GB": 3000 },
    },
    "9mobile": {
      sme: { "1GB": 250, "2GB": 500, "5GB": 1250, "10GB": 2500 },
      gifting: { "1GB": 270, "2GB": 540, "5GB": 1350, "10GB": 2700 },
      "corporate-gifting": { "1GB": 290, "2GB": 580, "5GB": 1450, "10GB": 2900 },
    },
  })

  const [airtimeRates, setAirtimeRates] = useState({
    buyRate: 95, // Admin buys from users at 95%
    sellRate: 98, // Admin sells to users at 98%
  })

  const [referralReward, setReferralReward] = useState(100)

  const calculateBuyRate = (amount: number) => {
    return (amount * (airtimeRates.buyRate / 100)).toFixed(2)
  }

  const handleApproveDeposit = (depositId: string) => {
    console.log("Approving deposit:", depositId)
  }

  const handleRejectDeposit = (depositId: string) => {
    console.log("Rejecting deposit:", depositId)
  }

  const handleSuspendUser = (userId: string) => {
    console.log("Suspending user:", userId)
  }

  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId)
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800/50 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <span>Admin Control Panel</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Complete system management and administrative controls
              </p>
            </div>
            <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50">
              <Key className="w-3 h-3 mr-1" />
              Super Admin
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">₦245,231</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Users</CardTitle>
            <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">1,350</div>
            <p className="text-xs text-sky-600 dark:text-sky-400">+12 new today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Pending Deposits</CardTitle>
            <CreditCard className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{pendingDeposits.length}</div>
            <p className="text-xs text-amber-600 dark:text-amber-400">Requires approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">Referral Rewards</CardTitle>
            <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">₦{referralReward}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Per successful referral</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-slate-700/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-sky-600"
          >
            <Activity className="w-4 h-4 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="deposits"
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-amber-600"
          >
            <CreditCard className="w-4 h-4 mr-1" />
            Deposits
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-emerald-600"
          >
            <Users className="w-4 h-4 mr-1" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="buy-airtime"
            className="data-[state=active]:bg-rose-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-rose-600"
          >
            <Phone className="w-4 h-4 mr-1" />
            Airtime
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-purple-600"
          >
            <DollarSign className="w-4 h-4 mr-1" />
            Pricing
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-slate-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-slate-600"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-slate-100 text-sm">Deposit approved for John Doe</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-slate-100 text-sm">New user registered: Jane Smith</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-slate-100 text-sm">Referral reward paid to johndoe</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">10 minutes ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100">System Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-800 dark:text-slate-100">Database</span>
                  </div>
                  <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-800 dark:text-slate-100">API Services</span>
                  </div>
                  <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-slate-800 dark:text-slate-100">Maintenance</span>
                  </div>
                  <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                    Scheduled
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deposits" className="mt-6">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Pending Deposits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-blue-200/50 dark:border-slate-700/50">
                    <TableHead className="text-slate-600 dark:text-slate-400">ID</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">User</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Amount</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Bank</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Reference</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Time</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDeposits.map((deposit) => (
                    <TableRow key={deposit.id} className="border-blue-200/50 dark:border-slate-700/50">
                      <TableCell className="text-slate-800 dark:text-slate-100 font-medium">{deposit.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-slate-800 dark:text-slate-100">{deposit.user}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">@{deposit.username}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-800 dark:text-slate-100 font-bold">{deposit.amount}</TableCell>
                      <TableCell className="text-slate-800 dark:text-slate-100">{deposit.bank}</TableCell>
                      <TableCell className="text-slate-800 dark:text-slate-100">{deposit.reference}</TableCell>
                      <TableCell className="text-slate-500 dark:text-slate-400">{deposit.time}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveDeposit(deposit.id)}
                            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/50"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectDeposit(deposit.id)}
                            className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800/50"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>User Management</span>
                </div>
                <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 dark:from-emerald-600 dark:to-green-700 dark:hover:from-emerald-700 dark:hover:to-green-800 text-white shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-blue-200/50 dark:border-slate-700/50">
                    <TableHead className="text-slate-600 dark:text-slate-400">User</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Contact</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Balance</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Referrals</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-blue-200/50 dark:border-slate-700/50">
                      <TableCell>
                        <div>
                          <p className="text-slate-800 dark:text-slate-100 font-medium">{user.name}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">@{user.username}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">Referred by: @{user.referredBy}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-slate-800 dark:text-slate-100 text-sm">{user.email}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-xs">{user.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-emerald-600 dark:text-emerald-400 font-bold">{user.balance}</TableCell>
                      <TableCell className="text-purple-600 dark:text-purple-400">{user.referrals}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={
                            user.status === "active"
                              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                              : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/30"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSuspendUser(user.id)}
                            className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                          >
                            <UserX className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buy-airtime" className="mt-6">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <TrendingDown className="w-5 h-5" />
                <span>Buy Airtime from Users (95% Rate)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 mb-6">
                <h3 className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Admin Exclusive Feature</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Only admins can buy airtime from users at 95% rate
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="buy-network" className="text-slate-700 dark:text-slate-300">
                    Network
                  </Label>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:border-amber-400 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500">
                      <SelectValue placeholder="Select Network" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="mtn" className="dark:text-slate-100 dark:focus:bg-slate-700">
                        MTN
                      </SelectItem>
                      <SelectItem value="airtel" className="dark:text-slate-100 dark:focus:bg-slate-700">
                        Airtel
                      </SelectItem>
                      <SelectItem value="glo" className="dark:text-slate-100 dark:focus:bg-slate-700">
                        Glo
                      </SelectItem>
                      <SelectItem value="9mobile" className="dark:text-slate-100 dark:focus:bg-slate-700">
                        9mobile
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">
                    User Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="08012345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="buy-amount" className="text-slate-700 dark:text-slate-300">
                  Airtime Amount
                </Label>
                <Input
                  id="buy-amount"
                  placeholder="Enter amount"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                />
                {buyAmount && (
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg p-3">
                    <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                      You will pay user: <span className="font-bold">₦{calculateBuyRate(Number(buyAmount))}</span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Rate: {airtimeRates.buyRate}%</p>
                  </div>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 dark:from-amber-600 dark:to-yellow-700 dark:hover:from-amber-700 dark:hover:to-yellow-800 text-white shadow-md hover:shadow-lg">
                <Phone className="w-4 h-4 mr-2" />
                Buy Airtime from User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100">Data Bundle Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(dataRates).map(([network, networkRates]) => (
                  <div key={network} className="space-y-3">
                    <h3 className="text-slate-800 dark:text-slate-100 font-semibold capitalize">{network}</h3>
                    {Object.entries(networkRates).map(([dataType, rates]) => (
                      <div key={dataType} className="ml-4">
                        <h4 className="text-slate-600 dark:text-slate-400 text-sm font-medium capitalize mb-2">
                          {dataType.replace("-", " ")} Data
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(rates).map(([bundle, price]) => (
                            <div key={bundle} className="flex items-center space-x-2">
                              <Label className="text-slate-600 dark:text-slate-400 text-xs w-12">{bundle}:</Label>
                              <Input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                  setDataRates({
                                    ...dataRates,
                                    [network]: {
                                      ...networkRates,
                                      [dataType]: { ...rates, [bundle]: Number(e.target.value) },
                                    },
                                  })
                                }
                                className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 text-xs h-7 focus:border-amber-400 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100">Airtime & Referral Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-slate-800 dark:text-slate-100 font-semibold">Airtime Rates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Label className="text-slate-600 dark:text-slate-400 w-24">Buy Rate:</Label>
                      <Input
                        type="number"
                        value={airtimeRates.buyRate}
                        onChange={(e) => setAirtimeRates({ ...airtimeRates, buyRate: Number(e.target.value) })}
                        className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:border-amber-400 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                      />
                      <span className="text-slate-600 dark:text-slate-400">%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Label className="text-slate-600 dark:text-slate-400 w-24">Sell Rate:</Label>
                      <Input
                        type="number"
                        value={airtimeRates.sellRate}
                        onChange={(e) => setAirtimeRates({ ...airtimeRates, sellRate: Number(e.target.value) })}
                        className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:border-amber-400 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                      />
                      <span className="text-slate-600 dark:text-slate-400">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-slate-800 dark:text-slate-100 font-semibold">Referral Reward</h3>
                  <div className="flex items-center space-x-3">
                    <Label className="text-slate-600 dark:text-slate-400">Amount:</Label>
                    <Input
                      type="number"
                      value={referralReward}
                      onChange={(e) => setReferralReward(Number(e.target.value))}
                      className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 focus:border-amber-400 focus:ring-amber-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                    />
                    <span className="text-slate-600 dark:text-slate-400">₦</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 dark:from-purple-600 dark:to-pink-700 dark:hover:from-purple-700 dark:hover:to-pink-800 text-white shadow-md hover:shadow-lg">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Pricing
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100">Data Source Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 rounded-lg p-4">
                  <h3 className="text-sky-700 dark:text-sky-400 font-semibold mb-3">Network API Configurations</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800 dark:text-slate-100">MTN API</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800 dark:text-slate-100">Airtel API</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800 dark:text-slate-100">Glo API</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800 dark:text-slate-100">9mobile API</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100">System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-100">Auto-approve deposits</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-100">Email notifications</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-100">SMS notifications</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-100">Maintenance mode</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
