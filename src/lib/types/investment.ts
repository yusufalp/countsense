export type InvestmentType =
  'stocks' | 'etf' | 'crypto' | 'retirement' | 'real_estate' | 'other'

export interface Investment {
  id: string
  budgetId: string
  name: string
  amount: number
  type?: InvestmentType
  expectedReturn?: number
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}
