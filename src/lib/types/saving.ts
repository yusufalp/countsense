export interface Saving {
  id: string
  budgetId: string
  name: string
  amount: number
  goalAmount?: number
  currentTotal?: number
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}
