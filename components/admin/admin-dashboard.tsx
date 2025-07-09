"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "lucide-react"

interface AdminDashboardProps {
  user: any
  onLogout: () => void
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
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
    mtn: { "1GB": 280, "2GB": 560, "5GB": 1400, "10GB": 2800 },
    airtel: { "1GB": 270, "2GB": 540, "5GB": 1350, "10GB": 2700 },
    glo: { "1GB": 260, "2GB": 520, "5GB": 1300, "10GB": 2600 },
    "9mobile": { "1GB": 250, "2GB": 500, "5GB": 1250, "10GB": 2500 },
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
    // Logic to approve deposit and credit user account
    console.log("Approving deposit:", depositId)
  }

  const handleRejectDeposit = (depositId: string) => {
    // Logic to reject deposit
    console.log("Rejecting deposit:", depositId)
  }

  const handleSuspendUser = (userId: string) => {
    // Logic to suspend user
    console.log("Suspending user:", userId)
  }

  const handleDeleteUser = (userId: string) => {
    // Logic to delete user
    console.log("Deleting user:", userId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src="/logo.png" alt="Dr Arab Data Center Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">Dr Arab Data Center - Powered by BOIJELUX</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                <Shield className="w-3 h-3 mr-1" />
                Admin: {user?.username}
              </Badge>
              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-slate-600 hover:text-slate-800 hover:bg-blue-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">₦245,231</div>
              <p className="text-xs text-emerald-600">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-sky-100 to-blue-100 border-sky-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Total Users</CardTitle>
              <Users className="w-4 h-4 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">1,350</div>
              <p className="text-xs text-sky-600">+12 new today</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Pending Deposits</CardTitle>
              <CreditCard className="w-4 h-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{pendingDeposits.length}</div>
              <p className="text-xs text-amber-600">Requires approval</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Referral Rewards</CardTitle>
              <Gift className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">₦{referralReward}</div>
              <p className="text-xs text-purple-600">Per successful referral</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 border border-blue-200/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-slate-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="deposits"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white text-slate-700"
            >
              Deposits
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-slate-700"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="buy-airtime"
              className="data-[state=active]:bg-rose-500 data-[state=active]:text-white text-slate-700"
            >
              Buy Airtime
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-slate-700"
            >
              Pricing
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-slate-500 data-[state=active]:text-white text-slate-700"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-slate-800 text-sm">Deposit approved for John Doe</p>
                      <p className="text-slate-500 text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-slate-800 text-sm">New user registered: Jane Smith</p>
                      <p className="text-slate-500 text-xs">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Gift className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-slate-800 text-sm">Referral reward paid to johndoe</p>
                      <p className="text-slate-500 text-xs">10 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Bank Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                    <h3 className="text-sky-700 font-semibold mb-2">Primary Account</h3>
                    <p className="text-slate-800 text-sm">Bank: GTBank</p>
                    <p className="text-slate-800 text-sm">Account Name: Dr Arab Data Center</p>
                    <p className="text-slate-800 text-sm">Account Number: 0123456789</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h3 className="text-emerald-700 font-semibold mb-2">Secondary Account</h3>
                    <p className="text-slate-800 text-sm">Bank: Access Bank</p>
                    <p className="text-slate-800 text-sm">Account Name: Dr Arab Data Center</p>
                    <p className="text-slate-800 text-sm">Account Number: 9876543210</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deposits" className="mt-6">
            <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Pending Deposits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-200/50">
                      <TableHead className="text-slate-600">ID</TableHead>
                      <TableHead className="text-slate-600">User</TableHead>
                      <TableHead className="text-slate-600">Amount</TableHead>
                      <TableHead className="text-slate-600">Bank</TableHead>
                      <TableHead className="text-slate-600">Reference</TableHead>
                      <TableHead className="text-slate-600">Time</TableHead>
                      <TableHead className="text-slate-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingDeposits.map((deposit) => (
                      <TableRow key={deposit.id} className="border-blue-200/50">
                        <TableCell className="text-slate-800 font-medium">{deposit.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-slate-800">{deposit.user}</p>
                            <p className="text-slate-500 text-xs">@{deposit.username}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-800 font-bold">{deposit.amount}</TableCell>
                        <TableCell className="text-slate-800">{deposit.bank}</TableCell>
                        <TableCell className="text-slate-800">{deposit.reference}</TableCell>
                        <TableCell className="text-slate-500">{deposit.time}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveDeposit(deposit.id)}
                              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectDeposit(deposit.id)}
                              className="bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200"
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
            <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>User Management</span>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-200/50">
                      <TableHead className="text-slate-600">User</TableHead>
                      <TableHead className="text-slate-600">Contact</TableHead>
                      <TableHead className="text-slate-600">Balance</TableHead>
                      <TableHead className="text-slate-600">Referrals</TableHead>
                      <TableHead className="text-slate-600">Status</TableHead>
                      <TableHead className="text-slate-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-blue-200/50">
                        <TableCell>
                          <div>
                            <p className="text-slate-800 font-medium">{user.name}</p>
                            <p className="text-slate-500 text-xs">@{user.username}</p>
                            <p className="text-slate-500 text-xs">Referred by: @{user.referredBy}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-slate-800 text-sm">{user.email}</p>
                            <p className="text-slate-500 text-xs">{user.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-emerald-600 font-bold">{user.balance}</TableCell>
                        <TableCell className="text-purple-600">{user.referrals}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === "active" ? "default" : "secondary"}
                            className={
                              user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="text-sky-600 hover:bg-sky-100">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-amber-600 hover:bg-amber-100">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSuspendUser(user.id)}
                              className="text-orange-600 hover:bg-orange-100"
                            >
                              <UserX className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-rose-600 hover:bg-rose-100"
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
            <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5" />
                  <span>Buy Airtime from Users (95% Rate)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <h3 className="text-amber-700 font-semibold mb-2">Admin Exclusive Feature</h3>
                  <p className="text-sm text-slate-600">Only admins can buy airtime from users at 95% rate</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="buy-network" className="text-slate-700">
                      Network
                    </Label>
                    <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                      <SelectTrigger className="bg-white/80 border-blue-200 text-slate-800 focus:border-amber-400 focus:ring-amber-400">
                        <SelectValue placeholder="Select Network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN</SelectItem>
                        <SelectItem value="airtel">Airtel</SelectItem>
                        <SelectItem value="glo">Glo</SelectItem>
                        <SelectItem value="9mobile">9mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700">
                      User Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="08012345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <Label htmlFor="buy-amount" className="text-slate-700">
                    Airtime Amount
                  </Label>
                  <Input
                    id="buy-amount"
                    placeholder="Enter amount"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 focus:border-amber-400 focus:ring-amber-400"
                  />
                  {buyAmount && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-yellow-700 text-sm">
                        You will pay user: <span className="font-bold">₦{calculateBuyRate(Number(buyAmount))}</span>
                      </p>
                      <p className="text-xs text-slate-500">Rate: {airtimeRates.buyRate}%</p>
                    </div>
                  )}
                </div>

                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-md hover:shadow-lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Buy Airtime from User
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Data Bundle Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(dataRates).map(([network, rates]) => (
                    <div key={network} className="space-y-3">
                      <h3 className="text-slate-800 font-semibold capitalize">{network}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(rates).map(([bundle, price]) => (
                          <div key={bundle} className="flex items-center space-x-2">
                            <Label className="text-slate-600 text-sm w-12">{bundle}:</Label>
                            <Input
                              type="number"
                              value={price}
                              onChange={(e) =>
                                setDataRates({
                                  ...dataRates,
                                  [network]: { ...rates, [bundle]: Number(e.target.value) },
                                })
                              }
                              className="bg-white/80 border-blue-200 text-slate-800 text-sm h-8 focus:border-amber-400 focus:ring-amber-400"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Airtime & Referral Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-slate-800 font-semibold">Airtime Rates</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Label className="text-slate-600 w-24">Buy Rate:</Label>
                        <Input
                          type="number"
                          value={airtimeRates.buyRate}
                          onChange={(e) => setAirtimeRates({ ...airtimeRates, buyRate: Number(e.target.value) })}
                          className="bg-white/80 border-blue-200 text-slate-800 focus:border-amber-400 focus:ring-amber-400"
                        />
                        <span className="text-slate-600">%</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Label className="text-slate-600 w-24">Sell Rate:</Label>
                        <Input
                          type="number"
                          value={airtimeRates.sellRate}
                          onChange={(e) => setAirtimeRates({ ...airtimeRates, sellRate: Number(e.target.value) })}
                          className="bg-white/80 border-blue-200 text-slate-800 focus:border-amber-400 focus:ring-amber-400"
                        />
                        <span className="text-slate-600">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-slate-800 font-semibold">Referral Reward</h3>
                    <div className="flex items-center space-x-3">
                      <Label className="text-slate-600">Amount:</Label>
                      <Input
                        type="number"
                        value={referralReward}
                        onChange={(e) => setReferralReward(Number(e.target.value))}
                        className="bg-white/80 border-blue-200 text-slate-800 focus:border-amber-400 focus:ring-amber-400"
                      />
                      <span className="text-slate-600">₦</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Pricing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Data Source Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                    <h3 className="text-sky-700 font-semibold mb-3">Network API Configurations</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800">MTN API</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800">Airtel API</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800">Glo API</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-800">9mobile API</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">System Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800">Auto-approve deposits</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800">Email notifications</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800">SMS notifications</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800">Maintenance mode</span>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
