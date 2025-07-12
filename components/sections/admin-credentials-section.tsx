"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Shield, Key, Database, Server, Lock, Eye, EyeOff, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function AdminCredentialsSection() {
  const { toast } = useToast()
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})

  const togglePasswordVisibility = (key: string) => {
    setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: `${label} has been copied to your clipboard.`,
    })
  }

  const credentials = [
    {
      category: "Platform Access",
      icon: Shield,
      color: "blue",
      items: [
        {
          label: "Admin Email",
          value: "admin@drarab.com",
          type: "text",
          description: "Primary administrator email",
        },
        {
          label: "Admin Password",
          value: "admin123",
          type: "password",
          description: "Administrator login password",
        },
        {
          label: "Super Admin Key",
          value: "DRARAB_SUPER_2024_KEY",
          type: "password",
          description: "Master access key for critical operations",
        },
      ],
    },
    {
      category: "Database Credentials",
      icon: Database,
      color: "green",
      items: [
        {
          label: "Database Host",
          value: "db.drarab.com",
          type: "text",
          description: "Primary database server",
        },
        {
          label: "Database Username",
          value: "drarab_admin",
          type: "text",
          description: "Database administrator username",
        },
        {
          label: "Database Password",
          value: "DrArab_DB_2024!",
          type: "password",
          description: "Database access password",
        },
        {
          label: "Database Name",
          value: "drarab_production",
          type: "text",
          description: "Production database name",
        },
      ],
    },
    {
      category: "API & Services",
      icon: Server,
      color: "purple",
      items: [
        {
          label: "API Base URL",
          value: "https://api.drarab.com/v1",
          type: "text",
          description: "Main API endpoint",
        },
        {
          label: "API Secret Key",
          value: "sk_live_drarab_2024_api_secret",
          type: "password",
          description: "API authentication secret",
        },
        {
          label: "Webhook Secret",
          value: "whsec_drarab_webhook_2024",
          type: "password",
          description: "Webhook verification secret",
        },
        {
          label: "JWT Secret",
          value: "jwt_drarab_secret_key_2024",
          type: "password",
          description: "JSON Web Token signing secret",
        },
      ],
    },
    {
      category: "Third-Party Services",
      icon: Key,
      color: "orange",
      items: [
        {
          label: "Payment Gateway Key",
          value: "pk_live_drarab_payment_2024",
          type: "password",
          description: "Payment processing API key",
        },
        {
          label: "SMS Service Key",
          value: "sms_drarab_key_2024",
          type: "password",
          description: "SMS notification service key",
        },
        {
          label: "Email Service Key",
          value: "email_drarab_key_2024",
          type: "password",
          description: "Email service API key",
        },
        {
          label: "Cloud Storage Key",
          value: "cloud_drarab_storage_2024",
          type: "password",
          description: "Cloud storage access key",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Credentials</h1>
        <p className="text-gray-600 dark:text-gray-400">Secure access credentials for platform administration</p>
      </div>

      {/* Security Warning */}
      <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700 dark:text-red-400">
            <Lock className="mr-2 h-5 w-5" />
            Security Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-red-600 dark:text-red-400">
            <p>• These credentials provide full administrative access to the platform</p>
            <p>• Never share these credentials with unauthorized personnel</p>
            <p>• Regularly rotate passwords and API keys for security</p>
            <p>• Monitor access logs for any suspicious activity</p>
            <p>• Use secure connections (HTTPS/SSL) when accessing these services</p>
          </div>
        </CardContent>
      </Card>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {credentials.map((section, sectionIndex) => {
          const Icon = section.icon
          return (
            <Card key={sectionIndex} className={`border-${section.color}-200 dark:border-${section.color}-800`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div
                    className={`w-10 h-10 bg-${section.color}-100 dark:bg-${section.color}-900 rounded-full flex items-center justify-center mr-3`}
                  >
                    <Icon className={`w-5 h-5 text-${section.color}-600 dark:text-${section.color}-400`} />
                  </div>
                  {section.category}
                </CardTitle>
                <CardDescription>
                  {section.category === "Platform Access" && "Core platform authentication credentials"}
                  {section.category === "Database Credentials" && "Database server access information"}
                  {section.category === "API & Services" && "API endpoints and authentication keys"}
                  {section.category === "Third-Party Services" && "External service integration keys"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{item.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.type === "password" ? "Secret" : "Public"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          {item.type === "password" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => togglePasswordVisibility(`${sectionIndex}-${itemIndex}`)}
                              className="h-6 w-6 p-0"
                            >
                              {showPasswords[`${sectionIndex}-${itemIndex}`] ? (
                                <EyeOff className="h-3 w-3" />
                              ) : (
                                <Eye className="h-3 w-3" />
                              )}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(item.value, item.label)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="font-mono text-sm bg-white dark:bg-gray-900 p-2 rounded border">
                        {item.type === "password" && !showPasswords[`${sectionIndex}-${itemIndex}`]
                          ? "•".repeat(item.value.length)
                          : item.value}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            System Status
          </CardTitle>
          <CardDescription>Current status of all platform services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <Badge variant="default" className="bg-green-500">
                  Online
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Response time: 12ms</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Services</span>
                <Badge variant="default" className="bg-green-500">
                  Online
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Uptime: 99.9%</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Payment Gateway</span>
                <Badge variant="default" className="bg-green-500">
                  Online
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Last check: 2 min ago</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SMS Service</span>
                <Badge variant="default" className="bg-green-500">
                  Online
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Queue: 0 pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" disabled>
              <Database className="h-6 w-6" />
              <span className="text-xs">Backup Database</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" disabled>
              <Key className="h-6 w-6" />
              <span className="text-xs">Rotate API Keys</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" disabled>
              <Server className="h-6 w-6" />
              <span className="text-xs">System Health</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" disabled>
              <Lock className="h-6 w-6" />
              <span className="text-xs">Security Audit</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
