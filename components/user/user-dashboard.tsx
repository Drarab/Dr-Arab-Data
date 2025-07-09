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
import { User, Wallet, Send, History, Gift, Building, Phone, Wifi, Copy, Users } from "lucide-react"

interface UserDashboardProps {
  user: any
  onLogout: () => void
}

export function UserDashboard({ user, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [depositAmount, setDepositAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [sellNetwork, setSellNetwork] = useState("")
  const [sellType, setSellType] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [referralCode] = useState(user?.username || "")

  const userBalance = 2500
  const referralCount = 3
  const referralEarnings = 300

  const bankAccounts = [
    {
      bank: "GTBank",
      accountName: "Dr Arab Data Center",
      accountNumber: "0123456789",
    },
    {
      bank: "Access Bank",
      accountName: "Dr Arab Data Center",
      accountNumber: "9876543210",
    },
  ]

  const dataRates = {
    mtn: { "1GB": 280, "2GB": 560, "5GB": 1400, "10GB": 2800 },
    airtel: { "1GB": 270, "2GB": 540, "5GB": 1350, "10GB": 2700 },
    glo: { "1GB": 260, "2GB": 520, "5GB": 1300, "10GB": 2600 },
    "9mobile": { "1GB": 250, "2GB": 500, "5GB": 1250, "10GB": 2500 },
  }

  const transactions = [
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleDeposit = () => {
    // Logic to submit deposit request
    console.log("Deposit request submitted")
  }

  const handleSellService = () => {
    // Logic to sell data/airtime
    console.log("Service sold")
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
                <h1 className="text-2xl font-bold text-slate-800">User Dashboard</h1>
                <p className="text-sm text-slate-600">Dr Arab Data Center - Powered by BOIJELUX</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-sky-100 text-sky-700 border-sky-200">
                <User className="w-3 h-3 mr-1" />@{user?.username}
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
        {/* Welcome & Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Account Balance</CardTitle>
              <Wallet className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">₦{userBalance.toLocaleString()}</div>
              <p className="text-xs text-emerald-600">Available for trading</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Referrals</CardTitle>
              <Users className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">{referralCount}</div>
              <p className="text-xs text-purple-600">Total referrals</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-700">Referral Earnings</CardTitle>
              <Gift className="w-4 h-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">₦{referralEarnings}</div>
              <p className="text-xs text-amber-600">From referrals</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 border border-blue-200/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-slate-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="deposit"
              className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-slate-700"
            >
              Deposit
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-slate-700"
            >
              Sell Services
            </TabsTrigger>
            <TabsTrigger
              value="referral"
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white text-slate-700"
            >
              Referrals
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-slate-500 data-[state=active]:text-white text-slate-700"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setActiveTab("deposit")}
                    className="w-full justify-start bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Deposit Funds
                  </Button>
                  <Button
                    onClick={() => setActiveTab("sell")}
                    className="w-full justify-start bg-sky-100 text-sky-700 hover:bg-sky-200 border border-sky-200"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Sell Data/Airtime
                  </Button>
                  <Button
                    onClick={() => setActiveTab("referral")}
                    className="w-full justify-start bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Invite Friends
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Current Rates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-sky-700 font-semibold">MTN Data Rates</h3>
                    {Object.entries(dataRates.mtn).map(([bundle, price]) => (
                      <div key={bundle} className="flex justify-between">
                        <span className="text-slate-600">{bundle}</span>
                        <span className="text-slate-800">₦{price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deposit" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>Bank Account Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bankAccounts.map((account, index) => (
                    <div key={index} className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                      <h3 className="text-sky-700 font-semibold mb-2">{account.bank}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Account Name:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-800 text-sm">{account.accountName}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(account.accountName)}
                              className="text-sky-600 hover:bg-sky-100 p-1"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Account Number:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-800 font-mono">{account.accountNumber}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(account.accountNumber)}
                              className="text-sky-600 hover:bg-sky-100 p-1"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Submit Deposit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount" className="text-slate-700">
                      Deposit Amount
                    </Label>
                    <Input
                      id="deposit-amount"
                      placeholder="Enter amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selected-bank" className="text-slate-700">
                      Bank Used
                    </Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger className="bg-white/80 border-blue-200 text-slate-800 focus:border-emerald-400 focus:ring-emerald-400">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankAccounts.map((account, index) => (
                          <SelectItem key={index} value={account.bank}>
                            {account.bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference" className="text-slate-700">
                      Transaction Reference
                    </Label>
                    <Input
                      id="reference"
                      placeholder="Enter transaction reference"
                      className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400"
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-yellow-700 text-sm">
                      ⚠️ Deposits are manually verified by admin. Please ensure you use the correct reference.
                    </p>
                  </div>

                  <Button
                    onClick={handleDeposit}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md hover:shadow-lg"
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Submit Deposit Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="mt-6">
            <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Sell Data/Airtime from Your Account</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
                  <h3 className="text-sky-700 font-semibold mb-2">How it works:</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Use your account balance to purchase data/airtime</li>
                    <li>• Send directly to any phone number</li>
                    <li>• Instant delivery after purchase</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="sell-type" className="text-slate-700">
                      Service Type
                    </Label>
                    <Select value={sellType} onValueChange={setSellType}>
                      <SelectTrigger className="bg-white/80 border-blue-200 text-slate-800 focus:border-purple-400 focus:ring-purple-400">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="data">Data Bundle</SelectItem>
                        <SelectItem value="airtime">Airtime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-network" className="text-slate-700">
                      Network
                    </Label>
                    <Select value={sellNetwork} onValueChange={setSellNetwork}>
                      <SelectTrigger className="bg-white/80 border-blue-200 text-slate-800 focus:border-purple-400 focus:ring-purple-400">
                        <SelectValue placeholder="Select network" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn">MTN</SelectItem>
                        <SelectItem value="airtel">Airtel</SelectItem>
                        <SelectItem value="glo">Glo</SelectItem>
                        <SelectItem value="9mobile">9mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipient-phone" className="text-slate-700">
                      Recipient Phone Number
                    </Label>
                    <Input
                      id="recipient-phone"
                      placeholder="08012345678"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-amount" className="text-slate-700">
                      {sellType === "data" ? "Data Bundle" : "Amount"}
                    </Label>
                    {sellType === "data" ? (
                      <Select value={sellAmount} onValueChange={setSellAmount}>
                        <SelectTrigger className="bg-white/80 border-blue-200 text-slate-800 focus:border-purple-400 focus:ring-purple-400">
                          <SelectValue placeholder="Select bundle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1GB">1GB - ₦280</SelectItem>
                          <SelectItem value="2GB">2GB - ₦560</SelectItem>
                          <SelectItem value="5GB">5GB - ₦1,400</SelectItem>
                          <SelectItem value="10GB">10GB - ₦2,800</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="sell-amount"
                        placeholder="Enter amount"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="bg-white/80 border-blue-200 text-slate-800 placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400"
                      />
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSellService}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
                >
                  {sellType === "data" ? <Wifi className="w-4 h-4 mr-2" /> : <Phone className="w-4 h-4 mr-2" />}
                  Send {sellType === "data" ? "Data" : "Airtime"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referral" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800 flex items-center space-x-2">
                    <Gift className="w-5 h-5" />
                    <span>Your Referral Code</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-6 text-center">
                    <h3 className="text-slate-800 text-2xl font-bold mb-2">{referralCode}</h3>
                    <p className="text-slate-600 text-sm mb-4">Share this code with friends</p>
                    <Button
                      onClick={() => copyToClipboard(referralCode)}
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h3 className="text-emerald-700 font-semibold mb-2">Referral Benefits:</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Earn ₦100 for each successful referral</li>
                      <li>• Instant credit to your account</li>
                      <li>• No limit on referrals</li>
                      <li>• Track all your referrals</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-800">Referral Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-sky-700">{referralCount}</div>
                      <p className="text-xs text-slate-600">Total Referrals</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-700">₦{referralEarnings}</div>
                      <p className="text-xs text-slate-600">Total Earned</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-slate-800 font-semibold">Recent Referrals</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3">
                        <span className="text-slate-800">@newuser1</span>
                        <Badge className="bg-emerald-100 text-emerald-700">+₦100</Badge>
                      </div>
                      <div className="flex justify-between items-center bg-blue-50 rounded-lg p-3">
                        <span className="text-slate-800">@newuser2</span>
                        <Badge className="bg-emerald-100 text-emerald-700">+₦100</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="bg-white/80 backdrop-blur-md border-blue-200/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Transaction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-blue-200/50">
                      <TableHead className="text-slate-600">ID</TableHead>
                      <TableHead className="text-slate-600">Type</TableHead>
                      <TableHead className="text-slate-600">Description</TableHead>
                      <TableHead className="text-slate-600">Amount</TableHead>
                      <TableHead className="text-slate-600">Status</TableHead>
                      <TableHead className="text-slate-600">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id} className="border-blue-200/50">
                        <TableCell className="text-slate-800 font-medium">{transaction.id}</TableCell>
                        <TableCell className="text-slate-800">{transaction.type}</TableCell>
                        <TableCell className="text-slate-600">{transaction.description}</TableCell>
                        <TableCell
                          className={transaction.amount.startsWith("+") ? "text-emerald-600" : "text-rose-600"}
                        >
                          {transaction.amount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={transaction.status === "Completed" ? "default" : "secondary"}
                            className={
                              transaction.status === "Completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : transaction.status === "Approved"
                                  ? "bg-sky-100 text-sky-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500">{transaction.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
