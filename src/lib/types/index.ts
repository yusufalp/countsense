type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'

interface RecurrenceRule {
  frequency: Frequency
  endDate?: Date
  dayOfMonth?: number
  dayOfWeek?: number
}

interface TransactionBase {
  id: string
  amount: number // always positive
  name: string
  date?: Date
  source?: string
  isRecurring?: boolean
  recurrence?: RecurrenceRule
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

export interface Budget {
  id: string
  userId: string
  name: string
  totalIncome: number
  totalExpenses: number
  savings?: number
  investments?: number
  currency?: string
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}
