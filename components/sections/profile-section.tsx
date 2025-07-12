"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, CreditCard, Shield, Edit, Save, X, History, Settings } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useTransactions } from "@/lib/transactions"
import { useToast } from "@/hooks/use-toast"

export function ProfileSection() {
  const { user, updateProfile } = useAuth()
  const { getTransactionsByUid } = useTransactions()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user?.name || "")
  const [editedPhone, setEditedPhone] = useState(user?.phone || "")

  const userTransactions = user ? getTransactionsByUid(user.uid) : []

  const handleSaveProfile = () => {
    if (user) {
      updateProfile({
        name: editedName,
        phone: editedPhone,
      })
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditedName(user?.name || "")
    setEditedPhone(user?.phone || "")
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account information and view your activity</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        <X className="w-4 h-4" />
                      </Button>
                      <Button size="sm" onClick={handleSaveProfile}>
                        <Save className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    ) : (
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">{user.name}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      {user.email}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input id="phone" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
                    ) : (
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {user.phone}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>User ID</Label>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-gray-500" />
                      {user.uid}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.type === "admin" ? "destructive" : "default"}>
                      {user.type === "admin" ? "Administrator" : "Customer"}
                    </Badge>
                    {user.type === "admin" && <span className="text-sm text-gray-500">Full platform access</span>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg">
                  <p className="text-sm opacity-90">Wallet Balance</p>
                  <p className="text-2xl font-bold">₦{user.walletBalance.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-2xl font-bold text-blue-600">{userTransactions.length}</p>
                    <p className="text-xs text-gray-500">Total Transactions</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="text-2xl font-bold text-green-600">
                      {userTransactions.filter((t) => t.status === "completed").length}
                    </p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <p className="text-lg font-bold text-purple-600">
                    ₦
                    {userTransactions
                      .filter((t) => t.status === "completed")
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Total Spent</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="mr-2 h-5 w-5" />
                Transaction History
              </CardTitle>
              <CardDescription>View all your past transactions and their status</CardDescription>
            </CardHeader>
            <CardContent>
              {userTransactions.length > 0 ? (
                <div className="space-y-4">
                  {userTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          {transaction.type.includes("airtime") ? (
                            <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type.includes("sell")
                              ? `Sold ${transaction.type.includes("airtime") ? "Airtime" : "Data"}`
                              : transaction.type === "airtime"
                                ? "Airtime Purchase"
                                : `Data Purchase`}
                            {transaction.dataType && ` (${transaction.dataType})`}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.network} • {transaction.phone}
                            {transaction.recipientPhone && ` → ${transaction.recipientPhone}`}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(transaction.timestamp).toLocaleDateString()} • Ref: {transaction.reference}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${transaction.type.includes("sell") ? "text-green-600" : "text-blue-600"}`}
                        >
                          {transaction.type.includes("sell") ? "+" : "-"}₦{transaction.amount.toLocaleString()}
                        </p>
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
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
                  <p className="text-sm text-gray-400">Your transaction history will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
                <h4 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">Account Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Account Created:</strong> {user.createdAt.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>User ID:</strong> {user.uid}
                  </p>
                  <p>
                    <strong>Account Type:</strong> {user.type === "admin" ? "Administrator" : "Customer"}
                  </p>
                  <p>
                    <strong>Status:</strong> <Badge variant="default">Active</Badge>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Security Settings</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password (Coming Soon)
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                    <Mail className="w-4 h-4 mr-2" />
                    Enable Two-Factor Authentication (Coming Soon)
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                    <Phone className="w-4 h-4 mr-2" />
                    Verify Phone Number (Coming Soon)
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Preferences</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                    <Mail className="w-4 h-4 mr-2" />
                    Email Notifications (Coming Soon)
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
                    <Phone className="w-4 h-4 mr-2" />
                    SMS Notifications (Coming Soon)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
