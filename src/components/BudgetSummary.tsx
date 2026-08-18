import type { Budget } from '#/lib/types'
import { BudgetCard } from './BudgetCard'

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

export function BudgetSummary() {
  const budgets: Budget[] = [julyBudget, augustBudget]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          onSelect={(id) => console.log('Selected budget:', id)}
        />
      ))}
    </div>
  )
}
