type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly'

interface RecurrenceRule {
  frequency: Frequency
}

interface TransactionBase {
  id: string
  budgetId: string
  name: string
  amount: number // always positive
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
