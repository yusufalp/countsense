import type { Budget } from '#/lib/types/budget'

const julyBudget: Budget = {
  id: 'bud_001',
  userId: 'user_123',
  name: 'July 2026',
  totalIncome: 5200,
  totalExpenses: 3850,
  savings: 800,
  investments: 400,
  currency: 'USD',
}

const augustBudget: Budget = {
  id: 'bud_002',
  userId: 'user_123',
  name: 'August 2026',
  totalIncome: 5200,
  totalExpenses: 5850,
  savings: 0,
  investments: 400,
  currency: 'USD',
}

export const budgets = [julyBudget, augustBudget]
