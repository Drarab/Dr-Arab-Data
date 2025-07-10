"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Clock, Send, MessageCircle, HelpCircle, CheckCircle, ExternalLink } from "lucide-react"

interface ContactSectionProps {
  user: any
  userRole: "admin" | "customer"
}

export function ContactSection({ user, userRole }: ContactSectionProps) {
  const [contactForm, setContactForm] = useState({
    subject: "",
    category: "",
    message: "",
    priority: "medium",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitTicket = async () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log("Support ticket submitted:", contactForm)
      setContactForm({ subject: "", category: "", message: "", priority: "medium" })
      setIsSubmitting(false)
    }, 2000)
  }

  const supportCategories = [
    "Account Issues",
    "Transaction Problems",
    "Payment Issues",
    "Technical Support",
    "Feature Request",
    "General Inquiry",
  ]

  const faqItems = [
    {
      question: "How do I deposit funds to my account?",
      answer:
        "You can deposit funds by transferring to our bank accounts and submitting the transaction reference for verification.",
    },
    {
      question: "What is the airtime selling rate?",
      answer: "We offer 95% rate for selling airtime, which is the best rate in the market.",
    },
    {
      question: "How does the referral program work?",
      answer:
        "Share your referral code with friends. When they sign up and make their first transaction, you earn ₦100.",
    },
    {
      question: "How long does deposit verification take?",
      answer: "Deposits are manually verified by our admin team, usually within 1-2 hours during business hours.",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Contact Header */}
      <Card className="bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800/50 shadow-md">
        <CardContent className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Contact & Support</h1>
            <p className="text-slate-600 dark:text-slate-300">
              We're here to help! Get in touch with our support team or find answers to common questions.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-slate-100">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-sky-50 dark:bg-sky-950/30 rounded-lg">
                <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-medium">Phone Support</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">+234 801 234 5678</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-medium">Email Support</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">support@drarabdata.com</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-medium">WhatsApp</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">+234 801 234 5678</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">Instant messaging</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-slate-800 dark:text-slate-100 font-medium">Business Hours</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Monday - Sunday</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">24/7 Support Available</p>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-200/50 dark:border-slate-700/50 pt-4">
              <h3 className="text-slate-800 dark:text-slate-100 font-medium mb-3">Follow Us</h3>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-950/30 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950/30 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Ticket Form */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-slate-100">Submit Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-slate-700 dark:text-slate-300">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-700 dark:text-slate-300">
                  Category
                </Label>
                <Select
                  value={contactForm.category}
                  onValueChange={(value) => setContactForm({ ...contactForm, category: value })}
                >
                  <SelectTrigger className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    {supportCategories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category.toLowerCase().replace(/\s+/g, "-")}
                        className="dark:text-slate-100 dark:focus:bg-slate-700"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-slate-700 dark:text-slate-300">
                  Priority
                </Label>
                <Select
                  value={contactForm.priority}
                  onValueChange={(value) => setContactForm({ ...contactForm, priority: value })}
                >
                  <SelectTrigger className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem value="low" className="dark:text-slate-100 dark:focus:bg-slate-700">
                      Low
                    </SelectItem>
                    <SelectItem value="medium" className="dark:text-slate-100 dark:focus:bg-slate-700">
                      Medium
                    </SelectItem>
                    <SelectItem value="high" className="dark:text-slate-100 dark:focus:bg-slate-700">
                      High
                    </SelectItem>
                    <SelectItem value="urgent" className="dark:text-slate-100 dark:focus:bg-slate-700">
                      Urgent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-700 dark:text-slate-300">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue in detail..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={6}
                className="bg-white/80 dark:bg-slate-700/50 border-blue-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 resize-none"
              />
            </div>

            <Button
              onClick={handleSubmitTicket}
              disabled={isSubmitting || !contactForm.subject || !contactForm.message}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 dark:from-sky-600 dark:to-blue-700 dark:hover:from-sky-700 dark:hover:to-blue-800 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Frequently Asked Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="border border-blue-200/50 dark:border-slate-700/50 rounded-lg p-4">
                <h3 className="text-slate-800 dark:text-slate-100 font-medium mb-2 flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status & Updates */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-blue-200/50 dark:border-slate-700/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-slate-100">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-800 dark:text-slate-100 font-medium">Platform Status</span>
              </div>
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                Operational
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-800 dark:text-slate-100 font-medium">Payment Processing</span>
              </div>
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                Operational
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-800 dark:text-slate-100 font-medium">Data Services</span>
              </div>
              <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                Operational
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
