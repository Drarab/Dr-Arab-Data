"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, Smartphone, Building, Check, X, Star, TrendingUp, Users, Shield } from "lucide-react"

interface DataTypesInfoProps {
  onSectionChange: (section: string) => void
}

export function DataTypesInfo({ onSectionChange }: DataTypesInfoProps) {
  const dataTypes = [
    {
      name: "SME Data",
      icon: Smartphone,
      price: "₦280/GB",
      description: "Small and Medium Enterprise data - Most affordable option",
      features: [
        "Affordable pricing",
        "Reliable connection",
        "Works on all devices",
        "30-day validity",
        "No sharing restrictions",
      ],
      limitations: ["Basic features only", "Standard speed", "Limited support"],
      bestFor: "Personal use, students, budget-conscious users",
      popularity: 95,
      color: "blue",
    },
    {
      name: "Gifting Data",
      icon: Users,
      price: "₦320/GB",
      description: "Premium data with gifting capabilities",
      features: [
        "Direct gifting to others",
        "Instant delivery",
        "No restrictions",
        "30-day validity",
        "Priority network access",
      ],
      limitations: ["Higher cost", "Limited to gifting networks"],
      bestFor: "Sharing with family/friends, gifts, social users",
      popularity: 75,
      color: "green",
    },
    {
      name: "Corporate Gifting",
      icon: Building,
      price: "₦350/GB",
      description: "Enterprise-grade data for business use",
      features: [
        "Bulk purchase discounts",
        "Priority customer support",
        "Custom packages available",
        "Extended validity options",
        "Business-grade reliability",
      ],
      limitations: ["Highest cost", "Minimum purchase requirements"],
      bestFor: "Businesses, bulk buyers, corporate gifts",
      popularity: 60,
      color: "purple",
    },
  ]

  const pricingComparison = [
    { plan: "1GB", sme: 280, gifting: 320, corporate: 350 },
    { plan: "2GB", sme: 560, gifting: 640, corporate: 700 },
    { plan: "5GB", sme: 1400, gifting: 1600, corporate: 1750 },
    { plan: "10GB", sme: 2800, gifting: 3200, corporate: 3500 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Types Information</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare different data types and choose the best option for your needs
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Price Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {dataTypes.map((dataType, index) => {
              const Icon = dataType.icon
              return (
                <Card
                  key={dataType.name}
                  className={`border-${dataType.color}-200 dark:border-${dataType.color}-800 relative`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 bg-${dataType.color}-100 dark:bg-${dataType.color}-900 rounded-full flex items-center justify-center`}
                      >
                        <Icon className={`w-6 h-6 text-${dataType.color}-600 dark:text-${dataType.color}-400`} />
                      </div>
                      {index === 0 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{dataType.name}</CardTitle>
                    <CardDescription>{dataType.description}</CardDescription>
                    <div className="text-2xl font-bold text-green-600">{dataType.price}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">Features</h4>
                      <ul className="space-y-1">
                        {dataType.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-red-600 mb-2">Limitations</h4>
                      <ul className="space-y-1">
                        {dataType.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-3 bg-${dataType.color}-50 dark:bg-${dataType.color}-950/30 rounded-lg`}>
                      <h4 className={`font-medium text-${dataType.color}-700 dark:text-${dataType.color}-400 mb-1`}>
                        Best For:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{dataType.bestFor}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Popularity</span>
                        <span>{dataType.popularity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-${dataType.color}-500 h-2 rounded-full`}
                          style={{ width: `${dataType.popularity}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Price Comparison Table</CardTitle>
              <CardDescription>Compare prices across all data types and plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data Plan</TableHead>
                    <TableHead>SME Data</TableHead>
                    <TableHead>Gifting Data</TableHead>
                    <TableHead>Corporate Gifting</TableHead>
                    <TableHead>Best Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingComparison.map((row) => {
                    const minPrice = Math.min(row.sme, row.gifting, row.corporate)
                    return (
                      <TableRow key={row.plan}>
                        <TableCell className="font-medium">{row.plan}</TableCell>
                        <TableCell className={row.sme === minPrice ? "font-bold text-green-600" : ""}>
                          ₦{row.sme.toLocaleString()}
                          {row.sme === minPrice && (
                            <Badge variant="secondary" className="ml-2">
                              Best
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className={row.gifting === minPrice ? "font-bold text-green-600" : ""}>
                          ₦{row.gifting.toLocaleString()}
                        </TableCell>
                        <TableCell className={row.corporate === minPrice ? "font-bold text-green-600" : ""}>
                          ₦{row.corporate.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {row.sme === minPrice ? "SME" : row.gifting === minPrice ? "Gifting" : "Corporate"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Cost Savings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    SME data offers up to 20% savings compared to other types
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Premium Features</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Gifting data includes sharing capabilities worth the extra cost
                  </p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Business Value</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Corporate plans offer bulk discounts and priority support
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Smart Recommendations
                </CardTitle>
                <CardDescription>Choose the best data type based on your usage pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
                      <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-medium mb-2">Personal Use</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      For individual browsing, social media, and entertainment
                    </p>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      Recommended: SME Data
                    </Badge>
                  </div>

                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-medium mb-2">Family Sharing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      For sharing data with family members and friends
                    </p>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Recommended: Gifting Data
                    </Badge>
                  </div>

                  <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3">
                      <Building className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-medium mb-2">Business Use</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      For corporate needs, bulk purchases, and team usage
                    </p>
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      Recommended: Corporate Gifting
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Usage Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
                    <h4 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">Important Notes</h4>
                    <ul className="text-sm space-y-1">
                      <li>• All data plans have a 30-day validity period</li>
                      <li>• Unused data expires after the validity period</li>
                      <li>• Data sharing is only available with Gifting and Corporate plans</li>
                      <li>• Network coverage may vary by location</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Money-Saving Tips</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Buy larger plans for better value per GB</li>
                        <li>• Consider SME for personal use to save money</li>
                        <li>• Use Corporate plans for bulk purchases</li>
                        <li>• Monitor your usage to avoid waste</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Performance Tips</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Choose the right network for your area</li>
                        <li>• Gifting data offers better speeds</li>
                        <li>• Corporate plans have priority network access</li>
                        <li>• Check network coverage before purchase</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => onSectionChange("wallet")} className="bg-blue-600 hover:bg-blue-700">
                <Wifi className="w-4 h-4 mr-2" />
                Buy Data Now
              </Button>
              <Button onClick={() => onSectionChange("sell-services")} variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Start Selling
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
