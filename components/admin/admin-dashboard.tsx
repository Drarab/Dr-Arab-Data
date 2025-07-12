"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, Wifi, Users, BarChart3, AlertCircle, TrendingUp, DollarSign, Activity } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useTransactions } from "@/lib/transactions"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const { user, updateWallet } = useAuth()
  const { addTransaction, getAllTransactions } = useTransactions()
  const { toast } = useToast()

  // Buy Airtime State
  const [airtimeData, setAirtimeData] = useState({
    network: "",
    phone: "",
    amount: "",
  })

  // Sell Data State
  const [sellDataForm, setSellDataForm] = useState({
    dataType: "SME" as "SME" | "Gifting" | "Corporate Gifting",
    network: "",
    recipientPhone: "",
    plan: "",
    customPrice: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const networks = ["MTN", "Airtel", "Glo", "9mobile"]
  const allTransactions = getAllTransactions()

  // Data pricing for admin selling
  const adminDataPricing = {
    SME: {
      "1GB": 280,
      "2GB": 560,
      "5GB": 1400,
      "10GB": 2800,
    },
    Gifting: {
      "1GB": 320,
      "2GB": 640,
      "5GB": 1600,
      "10GB": 3200,
    },
    "Corporate Gifting": {
      "1GB": 350,
      "2GB": 700,
      "5GB": 1750,
      "10GB": 3500,
    },
  }

  // Admin stats
  const totalUsers = 156
  const totalRevenue = allTransactions.reduce((sum, t) => sum + t.amount, 0)
  const successRate =
    Math.round((allTransactions.filter((t) => t.status === "completed").length / allTransactions.length) * 100) || 0

  const handleBuyAirtime = async (e: React.FormEvent) => {
    e.preventDefault()

    const amount = Number.parseFloat(airtimeData.amount)

    if (amount < 500) {
      toast({
        title: "Minimum Amount Required",
        description: "Admin users must purchase at least ₦500 airtime.",
        variant: "destructive",
      })
      return
    }

    if (!user || amount > user.walletBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Please fund your wallet to complete this purchase.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (user) {
        addTransaction({
          uid: user.uid,
          type: "airtime",
          network: airtimeData.network,
          phone: airtimeData.phone,
          amount: amount,
          status: "completed",
        })

        updateWallet(-amount)

        toast({
          title: "Airtime Purchase Successful",
          description: `₦${amount.toLocaleString()} airtime sent to ${airtimeData.phone}`,
        })

        setAirtimeData({ network: "", phone: "", amount: "" })
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to complete airtime purchase.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSellData = async (e: React.FormEvent) => {
    e.preventDefault()

    const price = sellDataForm.customPrice
      ? Number.parseFloat(sellDataForm.customPrice)
      : adminDataPricing[sellDataForm.dataType][
          sellDataForm.plan as keyof (typeof adminDataPricing)[typeof sellDataForm.dataType]
        ]

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (user) {
        addTransaction({
          uid: user.uid,
          type: "sell-data",
          dataType: sellDataForm.dataType,
          network: sellDataForm.network,
          phone: user.phone,
          recipientPhone: sellDataForm.recipientPhone,
          amount: price,
          status: "completed",
        })

        updateWallet(price)

        toast({
          title: "Data Sale Successful",
          description: `${sellDataForm.plan} ${sellDataForm.dataType} data sent to ${sellDataForm.recipientPhone}. ₦${price.toLocaleString()} added to wallet.`,
        })

        setSellDataForm({
          dataType: "SME",
          network: "",
          recipientPhone: "",
          plan: "",
          customPrice: "",
        })
      }
    } catch (error) {
      toast({
        title: "Sale Failed",
        description: "Unable to complete data sale.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage platform operations and services</p>
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

      <Tabs defaultValue="buy-airtime" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buy-airtime">Buy Airtime</TabsTrigger>
          <TabsTrigger value="sell-data">Sell Data</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="buy-airtime">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Buy Airtime (Admin)
              </CardTitle>
              <CardDescription>Purchase airtime with admin privileges - Minimum ₦500</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">Admin Restriction: Minimum ₦500 airtime purchase required</span>
                </div>
              </div>

              <form onSubmit={handleBuyAirtime} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="airtime-network">Network</Label>
                    <Select
                      value={airtimeData.network}
                      onValueChange={(value) => setAirtimeData({ ...airtimeData, network: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map((network) => (
                          <SelectItem key={network} value={network}>
                            {network}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="airtime-phone">Phone Number</Label>
                    <Input
                      id="airtime-phone"
                      type="tel"
                      placeholder="+234-800-000-0000"
                      value={airtimeData.phone}
                      onChange={(e) => setAirtimeData({ ...airtimeData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="airtime-amount">Amount (₦)</Label>
                  <Input
                    id="airtime-amount"
                    type="number"
                    placeholder="Enter amount (minimum ₦500)"
                    value={airtimeData.amount}
                    onChange={(e) => setAirtimeData({ ...airtimeData, amount: e.target.value })}
                    min="500"
                    step="50"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Purchase Airtime"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sell-data">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wifi className="mr-2 h-5 w-5" />
                Sell Data (Admin)
              </CardTitle>
              <CardDescription>Sell data with all data types available</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSellData} className="space-y-4">
                <div className="space-y-2">
                  <Label>Data Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["SME", "Gifting", "Corporate Gifting"] as const).map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={sellDataForm.dataType === type ? "default" : "outline"}
                        onClick={() => setSellDataForm({ ...sellDataForm, dataType: type })}
                        className="text-xs"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sell-network">Network</Label>
                    <Select
                      value={sellDataForm.network}
                      onValueChange={(value) => setSellDataForm({ ...sellDataForm, network: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map((network) => (
                          <SelectItem key={network} value={network}>
                            {network}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-recipient">Recipient Phone</Label>
                    <Input
                      id="sell-recipient"
                      type="tel"
                      placeholder="+234-800-000-0000"
                      value={sellDataForm.recipientPhone}
                      onChange={(e) => setSellDataForm({ ...sellDataForm, recipientPhone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Data Plan</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(adminDataPricing[sellDataForm.dataType]).map(([plan, price]) => (
                      <Button
                        key={plan}
                        type="button"
                        variant={sellDataForm.plan === plan ? "default" : "outline"}
                        onClick={() => setSellDataForm({ ...sellDataForm, plan, customPrice: "" })}
                        className="flex justify-between"
                      >
                        <span>{plan}</span>
                        <span>₦{price}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-price">Custom Price (Optional)</Label>
                  <Input
                    id="custom-price"
                    type="number"
                    placeholder="Enter custom price"
                    value={sellDataForm.customPrice}
                    onChange={(e) => setSellDataForm({ ...sellDataForm, customPrice: e.target.value, plan: "" })}
                    min="100"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || (!sellDataForm.plan && !sellDataForm.customPrice)}
                >
                  {isLoading ? "Processing..." : "Sell Data"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage platform users and their activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>UID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-500">admin@drarab.com</p>
                      </div>
                    </TableCell>
                    <TableCell>UID001234</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Admin</Badge>
                    </TableCell>
                    <TableCell>₦50,000</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div>
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-sm text-gray-500">user@example.com</p>
                      </div>
                    </TableCell>
                    <TableCell>UID005678</TableCell>
                    <TableCell>
                      <Badge variant="default">Customer</Badge>
                    </TableCell>
                    <TableCell>₦2,500</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Platform Analytics
              </CardTitle>
              <CardDescription>Detailed platform performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Transaction Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Airtime Purchases:</span>
                        <span>{allTransactions.filter((t) => t.type === "airtime").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Purchases:</span>
                        <span>{allTransactions.filter((t) => t.type === "data").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Sales:</span>
                        <span>{allTransactions.filter((t) => t.type.includes("sell")).length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Revenue Sources</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Airtime Revenue:</span>
                        <span>
                          ₦
                          {allTransactions
                            .filter((t) => t.type === "airtime")
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Revenue:</span>
                        <span>
                          ₦
                          {allTransactions
                            .filter((t) => t.type === "data")
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sales Commission:</span>
                        <span>
                          ₦
                          {Math.round(
                            allTransactions
                              .filter((t) => t.type.includes("sell"))
                              .reduce((sum, t) => sum + t.amount, 0) * 0.05,
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Popular Data Types</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {allTransactions.filter((t) => t.dataType === "SME").length}
                      </p>
                      <p>SME Data</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {allTransactions.filter((t) => t.dataType === "Gifting").length}
                      </p>
                      <p>Gifting Data</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {allTransactions.filter((t) => t.dataType === "Corporate Gifting").length}
                      </p>
                      <p>Corporate</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
