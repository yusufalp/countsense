import { BudgetCard } from './BudgetCard'

import type { Budget } from '#/lib/types/budget'

interface BudgetSummaryProps {
  budgets: Budget[]
}

export function BudgetSummary({ budgets }: BudgetSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  )
}
