"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Transaction {
  id: string
  uid: string
  type: "airtime" | "data" | "sell-airtime" | "sell-data"
  dataType?: "SME" | "Gifting" | "Corporate Gifting"
  network: string
  phone: string
  amount: number
  status: "pending" | "completed" | "failed"
  timestamp: Date
  reference: string
  recipientPhone?: string
  sellerUid?: string
  buyerUid?: string
}

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id" | "timestamp" | "reference">) => void
  updateTransactionStatus: (id: string, status: Transaction["status"]) => void
  getTransactionsByUid: (uid: string) => Transaction[]
  getAllTransactions: () => Transaction[]
}

export const useTransactions = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [
        {
          id: "1",
          uid: "UID001234",
          type: "airtime",
          network: "MTN",
          phone: "+234-800-123-4567",
          amount: 1000,
          status: "completed",
          timestamp: new Date(Date.now() - 86400000),
          reference: "REF001",
        },
        {
          id: "2",
          uid: "UID005678",
          type: "data",
          dataType: "SME",
          network: "Airtel",
          phone: "+234-800-987-6543",
          amount: 500,
          status: "completed",
          timestamp: new Date(Date.now() - 43200000),
          reference: "REF002",
        },
        {
          id: "3",
          uid: "UID005678",
          type: "sell-data",
          dataType: "Gifting",
          network: "MTN",
          phone: "+234-800-111-2222",
          recipientPhone: "+234-800-333-4444",
          amount: 320,
          status: "completed",
          timestamp: new Date(Date.now() - 21600000),
          reference: "REF003",
        },
      ],
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
          timestamp: new Date(),
          reference: `REF${Math.random().toString().slice(2, 8)}`,
        }
        set((state) => ({ transactions: [newTransaction, ...state.transactions] }))
      },
      updateTransactionStatus: (id, status) => {
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === id ? { ...t, status } : t)),
        }))
      },
      getTransactionsByUid: (uid) => {
        return get().transactions.filter((t) => t.uid === uid)
      },
      getAllTransactions: () => {
        return get().transactions
      },
    }),
    {
      name: "transactions-storage",
    },
  ),
)
