import { CircleX } from 'lucide-react'

import { Button } from '#/components/ui/button'

import { FREQUENCY_OPTIONS } from '#/lib/constants/frequency'
import type { Frequency } from '#/lib/types/frequency'

export type DraftTransaction = {
  tempId: string
  type: 'income' | 'expense'
  name: string
  amount: string
  recurrence: Frequency
}

type BudgetTransactionsProps = {
  transactions: DraftTransaction[]
  onAdd: () => void
  onRemove: (tempId: string) => void
  onUpdate: (
    tempId: string,
    field: keyof DraftTransaction,
    value: string,
  ) => void
}

export function BudgetTransactions({
  transactions,
  onAdd,
  onRemove,
  onUpdate,
}: BudgetTransactionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Transactions</h2>

      {transactions.map((transaction) => (
        <div
          key={transaction.tempId}
          className="flex flex-col sm:flex-row gap-3 items-center relative"
        >
          <select
            value={transaction.type}
            onChange={(e) =>
              onUpdate(transaction.tempId, 'type', e.target.value)
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            value={transaction.name}
            onChange={(e) =>
              onUpdate(transaction.tempId, 'name', e.target.value)
            }
            placeholder="Name"
            className="flex-1 border rounded-lg px-3 py-2"
            required
          />

          <input
            type="number"
            value={transaction.amount}
            onChange={(e) =>
              onUpdate(transaction.tempId, 'amount', e.target.value)
            }
            placeholder="Amount"
            className="w-32 border rounded-lg px-3 py-2"
            required
          />

          <select
            value={transaction.recurrence}
            onChange={(e) =>
              onUpdate(transaction.tempId, 'recurrence', e.target.value)
            }
            className="border rounded-lg px-3 py-2"
          >
            {FREQUENCY_OPTIONS.map((frequency) => (
              <option key={frequency.value} value={frequency.value}>
                {frequency.label}
              </option>
            ))}
          </select>

          {transactions.length > 1 && (
            <CircleX onClick={() => onRemove(transaction.tempId)} />
          )}
        </div>
      ))}

      <Button type="button" variant="outline" onClick={onAdd}>
        + Add another transaction
      </Button>
    </div>
  )
}
