"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, HelpCircle, AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
    priority: "medium",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.subject || !formData.category || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message Sent",
      description: "We've received your message and will respond within 24 hours.",
    })

    // Reset form
    setFormData({
      subject: "",
      category: "",
      message: "",
      priority: "medium",
    })

    setIsSubmitting(false)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      value: "+234-800-DRARAB-1",
      availability: "Mon-Fri, 8AM-6PM WAT",
      color: "blue",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email for detailed inquiries",
      value: "support@drarab.com",
      availability: "24/7 - Response within 24hrs",
      color: "green",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      value: "Available on website",
      availability: "Mon-Fri, 9AM-5PM WAT",
      color: "purple",
    },
  ]

  const faqItems = [
    {
      question: "How do I fund my wallet?",
      answer:
        "You can fund your wallet using bank transfer, card payment, or mobile money. Go to the Wallet section and click 'Fund Wallet'.",
    },
    {
      question: "What's the difference between data types?",
      answer:
        "SME data is most affordable, Gifting data allows sharing with others, and Corporate Gifting offers bulk discounts and priority support.",
    },
    {
      question: "How do I sell data to other users?",
      answer:
        "Go to the 'Sell Services' section, choose your data type and price, enter the recipient's phone number, and complete the transaction.",
    },
    {
      question: "What is the minimum airtime purchase for admins?",
      answer:
        "Admin users have a minimum airtime purchase requirement of ₦500 to ensure efficient platform operations.",
    },
    {
      question: "How long does data last after purchase?",
      answer:
        "All data plans have a 30-day validity period from the date of purchase. Unused data expires after this period.",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact & Support</h1>
        <p className="text-gray-600 dark:text-gray-400">Get help with your account or reach out to our support team</p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactMethods.map((method, index) => {
          const Icon = method.icon
          return (
            <Card key={index} className={`border-${method.color}-200 dark:border-${method.color}-800`}>
              <CardHeader>
                <div
                  className={`w-12 h-12 bg-${method.color}-100 dark:bg-${method.color}-900 rounded-full flex items-center justify-center mb-2`}
                >
                  <Icon className={`w-6 h-6 text-${method.color}-600 dark:text-${method.color}-400`} />
                </div>
                <CardTitle className="text-lg">{method.title}</CardTitle>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-gray-900 dark:text-white mb-1">{method.value}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {method.availability}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Send className="mr-2 h-5 w-5" />
              Send us a Message
            </CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="data">Data & Airtime</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General question</SelectItem>
                    <SelectItem value="medium">Medium - Standard issue</SelectItem>
                    <SelectItem value="high">High - Urgent matter</SelectItem>
                    <SelectItem value="critical">Critical - Service disruption</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide detailed information about your issue or question..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Office Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">Dr Arab Data Center</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Powered by BOIJELUX
                <br />
                Lagos, Nigeria
              </p>
              <p className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                Business Hours: Mon-Fri, 8AM-6PM WAT
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Emergency Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400">
                  <strong>Critical Issues:</strong> For urgent matters affecting your service, please call our emergency
                  line or mark your message as "Critical" priority.
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Response Times:</strong>
                  <br />• Critical: Within 2 hours
                  <br />• High: Within 4 hours
                  <br />• Medium: Within 24 hours
                  <br />• Low: Within 48 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
