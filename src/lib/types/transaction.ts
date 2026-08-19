import type { Frequency } from './frequency'

interface TransactionBase {
  id: string
  budgetId: string
  name: string
  amount: number // always positive
  recurrence: Frequency
  date?: Date
  source?: string
  isRecurring?: boolean
  categoryId?: string
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}

interface Income extends TransactionBase {
  type: 'income'
}

interface Expense extends TransactionBase {
  type: 'expense'
}

export type Transaction = Income | Expense
