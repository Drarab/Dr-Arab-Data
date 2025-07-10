"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Users, Building, CheckCircle, Clock, Shield } from "lucide-react"

export function DataTypesInfo() {
  const dataTypes = [
    {
      id: "sme",
      name: "SME Data",
      icon: Wifi,
      description: "Small and Medium Enterprise data plans with reliable connectivity",
      features: [
        "Cost-effective for businesses",
        "Reliable network performance",
        "Bulk data options available",
        "24/7 customer support",
      ],
      pricing: "Starting from ₦250/GB",
      color: "emerald",
      badge: "Most Popular",
    },
    {
      id: "gifting",
      name: "Gifting Data",
      icon: Users,
      description: "Perfect for sharing data with friends and family members",
      features: [
        "Easy to share with others",
        "Instant delivery",
        "No expiry restrictions",
        "Multiple recipient support",
      ],
      pricing: "Starting from ₦270/GB",
      color: "sky",
      badge: "Best for Sharing",
    },
    {
      id: "corporate-gifting",
      name: "Corporate Gifting",
      icon: Building,
      description: "Enterprise-grade data solutions for corporate gifting programs",
      features: [
        "Bulk corporate packages",
        "Custom branding options",
        "Advanced reporting",
        "Dedicated account manager",
      ],
      pricing: "Starting from ₦290/GB",
      color: "purple",
      badge: "Enterprise",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Data Types Available</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Choose the perfect data type for your needs - from personal use to enterprise solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataTypes.map((dataType) => {
          const Icon = dataType.icon
          return (
            <Card
              key={dataType.id}
              className={`bg-gradient-to-br ${
                dataType.color === "emerald"
                  ? "from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 border-emerald-200 dark:border-emerald-800/30"
                  : dataType.color === "sky"
                    ? "from-sky-50 to-blue-50 dark:from-sky-900/10 dark:to-blue-900/10 border-sky-200 dark:border-sky-800/30"
                    : "from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200 dark:border-purple-800/30"
              } shadow-md hover:shadow-lg transition-shadow duration-300`}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div
                    className={`w-16 h-16 ${
                      dataType.color === "emerald"
                        ? "bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-600"
                        : dataType.color === "sky"
                          ? "bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600"
                          : "bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-600"
                    } rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge
                    className={`absolute -top-2 -right-2 ${
                      dataType.color === "emerald"
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : dataType.color === "sky"
                          ? "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                    } text-xs`}
                  >
                    {dataType.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">{dataType.name}</CardTitle>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{dataType.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {dataType.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle
                        className={`w-4 h-4 ${
                          dataType.color === "emerald"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : dataType.color === "sky"
                              ? "text-sky-600 dark:text-sky-400"
                              : "text-purple-600 dark:text-purple-400"
                        }`}
                      />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div
                  className={`${
                    dataType.color === "emerald"
                      ? "bg-emerald-100 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50"
                      : dataType.color === "sky"
                        ? "bg-sky-100 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800/50"
                        : "bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50"
                  } border rounded-lg p-3 text-center`}
                >
                  <p
                    className={`font-semibold ${
                      dataType.color === "emerald"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : dataType.color === "sky"
                          ? "text-sky-700 dark:text-sky-400"
                          : "text-purple-700 dark:text-purple-400"
                    }`}
                  >
                    {dataType.pricing}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">Competitive rates available</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Why Choose Our Data Services?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Instant Delivery</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                All data purchases are delivered instantly to your device or recipient
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Secure Transactions</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                All transactions are secured with advanced encryption and fraud protection
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">24/7 Support</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Our dedicated support team is available round the clock to assist you
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
