"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Phone, Wifi, Plus, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useTransactions } from "@/lib/transactions"
import { useToast } from "@/hooks/use-toast"

export function WalletSection() {
  const { user, updateWallet } = useAuth()
  const { addTransaction } = useTransactions()
  const { toast } = useToast()

  // Funding state
  const [fundAmount, setFundAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Purchase state
  const [purchaseType, setPurchaseType] = useState<"airtime" | "data">("airtime")
  const [dataType, setDataType] = useState<"SME" | "Gifting" | "Corporate Gifting">("SME")
  const [network, setNetwork] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")

  const networks = ["MTN", "Airtel", "Glo", "9mobile"]

  // Data pricing based on type
  const dataPricing = {
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

  const handleFundWallet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fundAmount || Number.parseFloat(fundAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to fund your wallet.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      updateWallet(Number.parseFloat(fundAmount))
      toast({
        title: "Wallet Funded",
        description: `₦${Number.parseFloat(fundAmount).toLocaleString()} has been added to your wallet.`,
      })
      setFundAmount("")
    } catch (error) {
      toast({
        title: "Funding Failed",
        description: "Unable to fund wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!network || !phoneNumber || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const purchaseAmount = Number.parseFloat(amount)

    if (user && purchaseAmount > user.walletBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Please fund your wallet to complete this purchase.",
        variant: "destructive",
      })
      return
    }

    // Admin minimum airtime restriction
    if (user?.type === "admin" && purchaseType === "airtime" && purchaseAmount < 500) {
      toast({
        title: "Minimum Amount Required",
        description: "Admin users must purchase at least ₦500 airtime.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // Simulate purchase processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add transaction
      if (user) {
        addTransaction({
          uid: user.uid,
          type: purchaseType,
          dataType: purchaseType === "data" ? dataType : undefined,
          network,
          phone: phoneNumber,
          amount: purchaseAmount,
          status: "completed",
        })

        // Deduct from wallet
        updateWallet(-purchaseAmount)

        toast({
          title: "Purchase Successful",
          description: `${purchaseType === "airtime" ? "Airtime" : `Data (${dataType})`} purchase completed successfully.`,
        })

        // Reset form
        setNetwork("")
        setPhoneNumber("")
        setAmount("")
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Unable to complete purchase. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wallet & Purchases</h1>
        <p className="text-gray-600 dark:text-gray-400">Fund your wallet and make purchases</p>
      </div>

      {/* Wallet Balance */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₦{user?.walletBalance.toLocaleString()}</div>
          <p className="text-sm opacity-90 mt-2">Available for purchases</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="fund" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fund">Fund Wallet</TabsTrigger>
          <TabsTrigger value="purchase">Make Purchase</TabsTrigger>
        </TabsList>

        <TabsContent value="fund">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-5 w-5" />
                Fund Your Wallet
              </CardTitle>
              <CardDescription>Add money to your wallet to make purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFundWallet} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fund-amount">Amount (₦)</Label>
                  <Input
                    id="fund-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    min="100"
                    step="50"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Fund Wallet"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase">
          <Card>
            <CardHeader>
              <CardTitle>Make a Purchase</CardTitle>
              <CardDescription>Buy airtime or data bundles</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePurchase} className="space-y-4">
                {/* Purchase Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={purchaseType === "airtime" ? "default" : "outline"}
                    onClick={() => setPurchaseType("airtime")}
                    className="h-20 flex-col"
                  >
                    <Phone className="h-6 w-6 mb-2" />
                    Airtime
                  </Button>
                  <Button
                    type="button"
                    variant={purchaseType === "data" ? "default" : "outline"}
                    onClick={() => setPurchaseType("data")}
                    className="h-20 flex-col"
                  >
                    <Wifi className="h-6 w-6 mb-2" />
                    Data Bundle
                  </Button>
                </div>

                {/* Data Type Selection (only for data purchases) */}
                {purchaseType === "data" && (
                  <div className="space-y-2">
                    <Label>Data Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["SME", "Gifting", "Corporate Gifting"] as const).map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant={dataType === type ? "default" : "outline"}
                          onClick={() => setDataType(type)}
                          className="text-xs"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="network">Network</Label>
                    <Select value={network} onValueChange={setNetwork} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        {networks.map((net) => (
                          <SelectItem key={net} value={net}>
                            {net}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234-800-000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {purchaseType === "data" ? (
                  <div className="space-y-2">
                    <Label>Data Plan</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(dataPricing[dataType]).map(([plan, price]) => (
                        <Button
                          key={plan}
                          type="button"
                          variant={amount === price.toString() ? "default" : "outline"}
                          onClick={() => setAmount(price.toString())}
                          className="flex justify-between"
                        >
                          <span>{plan}</span>
                          <span>₦{price}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={user?.type === "admin" ? "500" : "50"}
                      step="50"
                      required
                    />
                    {user?.type === "admin" && (
                      <div className="flex items-center space-x-2 text-sm text-amber-600 dark:text-amber-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>Minimum ₦500 for admin users</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Purchase Summary */}
                {amount && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium mb-2">Purchase Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span>{purchaseType === "airtime" ? "Airtime" : `Data (${dataType})`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network:</span>
                        <span>{network}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>₦{Number.parseFloat(amount || "0").toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Wallet Balance After:</span>
                        <span>₦{((user?.walletBalance || 0) - Number.parseFloat(amount || "0")).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !amount || (user && Number.parseFloat(amount || "0") > user.walletBalance)}
                >
                  {isLoading ? "Processing..." : `Purchase ${purchaseType === "airtime" ? "Airtime" : "Data"}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Data Type Information */}
      {purchaseType === "data" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-lg">SME Data</CardTitle>
              <Badge variant="secondary">Most Popular</Badge>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Affordable pricing</li>
                <li>• Reliable connection</li>
                <li>• Works on all devices</li>
                <li>• 30-day validity</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-lg">Gifting Data</CardTitle>
              <Badge variant="outline">Premium</Badge>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Direct gifting</li>
                <li>• Instant delivery</li>
                <li>• No restrictions</li>
                <li>• 30-day validity</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-lg">Corporate Gifting</CardTitle>
              <Badge variant="destructive">Enterprise</Badge>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                <li>• Bulk purchases</li>
                <li>• Priority support</li>
                <li>• Custom packages</li>
                <li>• Extended validity</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
