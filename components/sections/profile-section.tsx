"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Bell,
  Eye,
  EyeOff,
  Save,
  Camera,
  Gift,
  Copy,
} from "lucide-react"

interface ProfileSectionProps {
  user: any
  userRole: "admin" | "customer"
}

export function ProfileSection({ user, userRole }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    username: user?.username || "johndoe",
    email: user?.email || "john@example.com",
    phone: user?.phone || "08012345678",
    dateOfBirth: user?.dateOfBirth || "1990-01-01",
    state: user?.state || "lagos",
    referralCode: user?.username || "johndoe",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    transactionAlerts: true,
    referralUpdates: true,
  })

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSaveProfile = () => {
    console.log("Profile saved:", profileData)
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    console.log("Password changed")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800/50 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-sky-200 dark:border-sky-700 shadow-md"
              >
                <Camera className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">@{profileData.username}</p>
              <div className="flex items-center space-x-4 mt-2">
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
                <Badge
                  variant="outline"
                  className="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                >
                  Active Account
                </Badge>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 hover:bg-sky-200 dark:hover:bg-sky-900/50 border border-sky-200 dark:border-sky-800/50"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-slate-800/80 border border-blue-200/50 dark:border-slate-700/50">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-sky-600"
          >
            <User className="w-4 h-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-emerald-600"
          >
            <Key className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-purple-600"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="referral"
            className="data-[state=active]:bg-amber-500 data-[state=active]:text-white text-slate-700 dark:text-slate-300 dark:data-[state=active]:bg-amber-600"
          >
            <Gift className="w-4 h-4 mr-2" />
            Referral
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-100">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 disabled:opacity-60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700 dark:text-slate-300">
                  Username
                </Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  disabled={!isEditing}
                  className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 disabled:opacity-60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 pl-10 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 pl-10 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-slate-700 dark:text-slate-300">
                    Date of Birth
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                      className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 pl-10 disabled:opacity-60"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-slate-700 dark:text-slate-300">
                    State
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500 z-10" />
                    <Select
                      value={profileData.state}
                      onValueChange={(value) => setProfileData({ ...profileData, state: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 pl-10 disabled:opacity-60">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                        {nigerianStates.map((state) => (
                          <SelectItem
                            key={state}
                            value={state.toLowerCase()}
                            className="dark:text-slate-100 dark:focus:bg-slate-700"
                          >
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-700 dark:hover:to-blue-800 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-100">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-slate-800 dark:text-slate-100 font-semibold">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-slate-700 dark:text-slate-300">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-slate-700 dark:text-slate-300">
                      New Password
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 dark:from-emerald-600 dark:to-green-700 dark:hover:from-emerald-700 dark:hover:to-green-800 text-white"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>

              <div className="border-t border-blue-200/50 dark:border-slate-700/50 pt-6">
                <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-4">Two-Factor Authentication</h3>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-amber-700 dark:text-amber-400 font-medium">Enable 2FA</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-slate-800 dark:text-slate-100">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div>
                    <h4 className="text-slate-800 dark:text-slate-100 font-medium">Email Notifications</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Receive updates and alerts via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(value) => handleNotificationChange("emailNotifications", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div>
                    <h4 className="text-slate-800 dark:text-slate-100 font-medium">SMS Notifications</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Receive important alerts via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(value) => handleNotificationChange("smsNotifications", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div>
                    <h4 className="text-slate-800 dark:text-slate-100 font-medium">Push Notifications</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(value) => handleNotificationChange("pushNotifications", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div>
                    <h4 className="text-slate-800 dark:text-slate-100 font-medium">Transaction Alerts</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get notified about all transactions</p>
                  </div>
                  <Switch
                    checked={notifications.transactionAlerts}
                    onCheckedChange={(value) => handleNotificationChange("transactionAlerts", value)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div>
                    <h4 className="text-slate-800 dark:text-slate-100 font-medium">Referral Updates</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Updates about your referral program</p>
                  </div>
                  <Switch
                    checked={notifications.referralUpdates}
                    onCheckedChange={(value) => handleNotificationChange("referralUpdates", value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Your Referral Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/50 rounded-lg p-6 text-center">
                  <h3 className="text-slate-800 dark:text-slate-100 text-2xl font-bold mb-2">
                    {profileData.referralCode}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Share this code with friends</p>
                  <Button
                    onClick={() => copyToClipboard(profileData.referralCode)}
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800/50"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-4">
                  <h3 className="text-emerald-700 dark:text-emerald-400 font-semibold mb-2">Referral Benefits:</h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                    <li>• Earn ₦100 for each successful referral</li>
                    <li>• Instant credit to your account</li>
                    <li>• No limit on referrals</li>
                    <li>• Track all your referrals</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-slate-100">Referral Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-sky-700 dark:text-sky-400">3</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Total Referrals</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">₦300</div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Total Earned</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-slate-800 dark:text-slate-100 font-semibold">Recent Referrals</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                      <span className="text-slate-800 dark:text-slate-100">@newuser1</span>
                      <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        +₦100
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                      <span className="text-slate-800 dark:text-slate-100">@newuser2</span>
                      <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        +₦100
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                      <span className="text-slate-800 dark:text-slate-100">@newuser3</span>
                      <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        +₦100
                      </Badge>
                    </div>
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
