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
import { Send, Phone, Wifi, Users, TrendingUp, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useTransactions } from "@/lib/transactions"
import { useToast } from "@/hooks/use-toast"

export function SellServicesSection() {
  const { user, updateWallet } = useAuth()
  const { addTransaction, getTransactionsByUid } = useTransactions()
  const { toast } = useToast()

  // Sell state
  const [sellType, setSellType] = useState<"airtime" | "data">("airtime")
  const [dataType, setDataType] = useState<"SME" | "Gifting" | "Corporate Gifting">("SME")
  const [network, setNetwork] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const networks = ["MTN", "Airtel", "Glo", "9mobile"]

  // Data pricing for selling (slightly higher than purchase price)
  const sellPricing = {
    SME: {
      "1GB": 300,
      "2GB": 600,
      "5GB": 1500,
      "10GB": 3000,
    },
    Gifting: {
      "1GB": 340,
      "2GB": 680,
      "5GB": 1700,
      "10GB": 3400,
    },
    "Corporate Gifting": {
      "1GB": 370,
      "2GB": 740,
      "5GB": 1850,
      "10GB": 3700,
    },
  }

  const userTransactions = user ? getTransactionsByUid(user.uid) : []
  const sellTransactions = userTransactions.filter((t) => t.type.includes("sell"))
  const totalEarnings = sellTransactions.reduce((sum, t) => sum + t.amount, 0)

  const handleSellService = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!network || !recipientPhone || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const sellAmount = Number.parseFloat(amount)

    setIsLoading(true)
    try {
      // Simulate service delivery
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add transaction
      if (user) {
        addTransaction({
          uid: user.uid,
          type: sellType === "airtime" ? "sell-airtime" : "sell-data",
          dataType: sellType === "data" ? dataType : undefined,
          network,
          phone: user.phone,
          recipientPhone,
          amount: sellAmount,
          status: "completed",
        })

        // Add earnings to wallet
        updateWallet(sellAmount)

        toast({
          title: "Service Sold Successfully",
          description: `${sellType === "airtime" ? "Airtime" : `Data (${dataType})`} sent to ${recipientPhone}. ₦${sellAmount.toLocaleString()} added to your wallet.`,
        })

        // Reset form
        setNetwork("")
        setRecipientPhone("")
        setAmount("")
      }
    } catch (error) {
      toast({
        title: "Sale Failed",
        description: "Unable to complete the sale. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sell Services</h1>
        <p className="text-gray-600 dark:text-gray-400">Sell airtime and data to other users and earn money</p>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalEarnings.toLocaleString()}</div>
            <p className="text-xs opacity-90">From selling services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Sold</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sellTransactions.length}</div>
            <p className="text-xs text-muted-foreground">Total transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sellTransactions.length > 0
                ? Math.round(
                    (sellTransactions.filter((t) => t.status === "completed").length / sellTransactions.length) * 100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Completed sales</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sell" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sell">Sell Services</TabsTrigger>
          <TabsTrigger value="history">Sales History</TabsTrigger>
        </TabsList>

        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                Sell Airtime or Data
              </CardTitle>
              <CardDescription>Send services to other users and earn money instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg p-4 mb-6">
                <h3 className="text-blue-700 dark:text-blue-400 font-semibold mb-2">How it works:</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Set your selling price and send services to customers</li>
                  <li>• Earn money for each successful transaction</li>
                  <li>• Instant payment to your wallet upon completion</li>
                  <li>• Choose from multiple data types and networks</li>
                </ul>
              </div>

              <form onSubmit={handleSellService} className="space-y-4">
                {/* Service Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={sellType === "airtime" ? "default" : "outline"}
                    onClick={() => setSellType("airtime")}
                    className="h-20 flex-col"
                  >
                    <Phone className="h-6 w-6 mb-2" />
                    Sell Airtime
                  </Button>
                  <Button
                    type="button"
                    variant={sellType === "data" ? "default" : "outline"}
                    onClick={() => setSellType("data")}
                    className="h-20 flex-col"
                  >
                    <Wifi className="h-6 w-6 mb-2" />
                    Sell Data
                  </Button>
                </div>

                {/* Data Type Selection (only for data sales) */}
                {sellType === "data" && (
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
                    <Label htmlFor="recipient-phone">Recipient Phone Number</Label>
                    <Input
                      id="recipient-phone"
                      type="tel"
                      placeholder="+234-800-000-0000"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {sellType === "data" ? (
                  <div className="space-y-2">
                    <Label>Data Plan & Price</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(sellPricing[dataType]).map(([plan, price]) => (
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
                    <Label htmlFor="amount">Selling Price (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter your selling price"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="100"
                      step="50"
                      required
                    />
                    <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>Set competitive prices to attract more customers</span>
                    </div>
                  </div>
                )}

                {/* Sale Summary */}
                {amount && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium mb-2">Sale Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span>{sellType === "airtime" ? "Airtime" : `Data (${dataType})`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Network:</span>
                        <span>{network}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recipient:</span>
                        <span>{recipientPhone}</span>
                      </div>
                      <div className="flex justify-between font-medium text-green-600">
                        <span>You will earn:</span>
                        <span>₦{Number.parseFloat(amount || "0").toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  disabled={isLoading || !amount}
                >
                  {isLoading ? "Processing Sale..." : `Sell ${sellType === "airtime" ? "Airtime" : "Data"}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Sales History</CardTitle>
              <CardDescription>Track your selling performance and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              {sellTransactions.length > 0 ? (
                <div className="space-y-4">
                  {sellTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          {transaction.type.includes("airtime") ? (
                            <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          ) : (
                            <Wifi className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            Sold {transaction.type.includes("airtime") ? "Airtime" : `Data (${transaction.dataType})`}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.network} • To: {transaction.recipientPhone}
                          </p>
                          <p className="text-xs text-gray-400">
                            {transaction.timestamp.toLocaleDateString()} • Ref: {transaction.reference}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">+₦{transaction.amount.toLocaleString()}</p>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No sales yet</p>
                  <p className="text-sm text-gray-400">Start selling services to earn money</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selling Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Selling Tips</CardTitle>
          <CardDescription>Maximize your earnings with these tips</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Best Practices</h4>
              <ul className="text-sm space-y-1">
                <li>• Set competitive prices to attract customers</li>
                <li>• Respond quickly to customer requests</li>
                <li>• Offer multiple data types for variety</li>
                <li>• Build a reputation for reliable service</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">Popular Services</h4>
              <ul className="text-sm space-y-1">
                <li>• SME Data (Most demanded)</li>
                <li>• ₦500-₦1000 Airtime (Common amounts)</li>
                <li>• MTN & Airtel (Popular networks)</li>
                <li>• Weekend promotions work well</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
