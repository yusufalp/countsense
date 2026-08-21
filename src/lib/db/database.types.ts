import type { Frequency } from '../types/frequency'
import type { InvestmentType } from '../types/investment'

export interface Database {
  budgets: {
    id: string
    user_id: string
    name: string
    total_income: string
    total_expenses: string
    difference: string
    currency: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }
  transactions: {
    id: string
    budget_id: string
    type: 'income' | 'expense'
    name: string
    amount: string
    recurrence: Frequency
    date: Date | null
    source: string | null
    is_recurring: boolean | null
    category_id: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }
  savings: {
    id: string
    budget_id: string
    name: string
    amount: string
    goal_amount: string | null
    current_total: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }
  investments: {
    id: string
    budget_id: string
    name: string
    amount: string
    type: InvestmentType | null
    expected_return: string | null
    notes: string | null
    created_at: Date | null
    updated_at: Date | null
  }
}
