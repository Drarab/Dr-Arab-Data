"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  uid: string
  name: string
  email: string
  phone: string
  type: "admin" | "customer"
  walletBalance: number
  createdAt: Date
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, type: "admin" | "customer") => Promise<boolean>
  register: (userData: Omit<User, "id" | "uid" | "createdAt" | "walletBalance">) => Promise<boolean>
  logout: () => void
  updateWallet: (amount: number) => void
  updateProfile: (updates: Partial<User>) => void
}

// Demo users
const demoUsers: User[] = [
  {
    id: "1",
    uid: "UID001234",
    name: "John Doe",
    email: "admin@drarab.com",
    phone: "+234-800-123-4567",
    type: "admin",
    walletBalance: 50000,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    uid: "UID005678",
    name: "Jane Smith",
    email: "user@example.com",
    phone: "+234-800-987-6543",
    type: "customer",
    walletBalance: 2500,
    createdAt: new Date("2024-01-15"),
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password, type) => {
        // Demo login logic
        const user = demoUsers.find((u) => u.email === email && u.type === type)
        if (user && (password === "admin123" || password === "user123")) {
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      register: async (userData) => {
        // Demo registration logic
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          uid: `UID${Math.random().toString().slice(2, 8)}`,
          walletBalance: 0,
          createdAt: new Date(),
        }
        set({ user: newUser, isAuthenticated: true })
        return true
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      updateWallet: (amount) => {
        const { user } = get()
        if (user) {
          set({
            user: {
              ...user,
              walletBalance: user.walletBalance + amount,
            },
          })
        }
      },
      updateProfile: (updates) => {
        const { user } = get()
        if (user) {
          set({
            user: {
              ...user,
              ...updates,
            },
          })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
