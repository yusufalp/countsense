import type { Budget } from '#/lib/types'
import { formatCurrency } from '#/lib/utils/formatCurrency'

import { Button } from './ui/button'

interface BudgetCardProps {
  budget: Budget
  onSelect?: (budgetId: string) => void
  className?: string
}

export function BudgetCard({
  budget,
  onSelect,
  className = '',
}: BudgetCardProps) {
  const difference = budget.totalIncome - budget.totalExpenses
  const isPositive = difference >= 0

  return (
    <div
      className={`rounded-xl border p-5 shadow-sm hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{budget.name}</p>
        <Button size="sm" onClick={() => onSelect?.(budget.id)}>
          Edit
        </Button>
      </div>

      <div className="mb-4">
        <span
          className={`text-sm font-medium py-0.5 rounded-sm 
            ${
              isPositive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }
            `}
        >
          {isPositive ? '+' : ''}
          {formatCurrency(difference)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Income</p>
          <p className="font-medium text-green-600">
            +{formatCurrency(budget.totalIncome)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Expenses</p>
          <p className="font-medium text-red-600">
            -{formatCurrency(budget.totalExpenses)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Savings</p>
          <p className="font-medium">
            {budget.savings
              ? formatCurrency(budget.savings)
              : 'You have not set savings.'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Investments</p>
          <p className="font-medium">
            {budget.investments
              ? formatCurrency(budget.investments)
              : 'You have not set investments.'}
          </p>
        </div>
      </div>
    </div>
  )
}
