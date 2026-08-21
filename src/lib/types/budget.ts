export interface Budget {
  id: string
  userId: string
  name: string
  totalIncome: number
  totalExpenses: number
  difference: number
  currency?: string
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}
