import { useState } from 'react'
import { CircleX } from 'lucide-react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/budget/new')({
  component: RouteComponent,
})

type DraftTransaction = {
  tempId: string
  type: 'income' | 'expense'
  name: string
  amount: string
}

function createEmptyTransaction(): DraftTransaction {
  return {
    tempId: crypto.randomUUID(),
    type: 'expense',
    name: '',
    amount: '',
  }
}

function RouteComponent() {
  const navigate = useNavigate({ from: '/budget/new' })

  const [budgetName, setBudgetName] = useState('')
  const [transactions, setTransactions] = useState<DraftTransaction[]>([
    createEmptyTransaction(),
  ])

  const addTransaction = () => {
    setTransactions((prev) => [...prev, createEmptyTransaction()])
  }

  const removeTransaction = (tempId: string) => {
    setTransactions((prev) =>
      prev.length === 1 ? prev : prev.filter((t) => t.tempId !== tempId),
    )
  }

  const updateTransaction = (
    tempId: string,
    field: keyof DraftTransaction,
    value: string,
  ) => {
    setTransactions((prev) =>
      prev.map((t) => (t.tempId === tempId ? { ...t, [field]: value } : t)),
    )
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!budgetName.trim()) {
      alert('Please enter a budget name')
      return
    }

    const validTransactions = transactions.filter(
      (t) => t.name.trim() && Number(t.amount) > 0,
    )

    if (validTransactions.length === 0) {
      alert('Please add at least one transaction')
      return
    }

    const totalIncome = validTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalExpenses = validTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    console.log({
      name: budgetName,
      totalIncome,
      totalExpenses,
      transactions: validTransactions,
    })

    navigate({ to: '/' })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold">Create New Budget</h1>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="budgetName">
          Budget Name
        </label>
        <input
          type="text"
          id="budgetName"
          name="budgetName"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="e.g. August 2026"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">Transactions</h2>

        {transactions.map((transaction, index) => (
          <div
            key={transaction.tempId}
            className="flex flex-col sm:flex-row gap-3 items-center border p-4 rounded-lg relative"
          >
            <select
              value={transaction.type}
              onChange={(e) =>
                updateTransaction(transaction.tempId, 'type', e.target.value)
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
                updateTransaction(transaction.tempId, 'name', e.target.value)
              }
              placeholder="Name"
              className="flex-1 border rounded-lg px-3 py-2"
              required
            />

            <input
              type="number"
              value={transaction.amount}
              onChange={(e) =>
                updateTransaction(transaction.tempId, 'amount', e.target.value)
              }
              placeholder="Amount"
              className="w-32 border rounded-lg px-3 py-2"
              required
            />

            {transactions.length > 1 && (
              <CircleX onClick={() => removeTransaction(transaction.tempId)} />
            )}
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addTransaction}>
          + Add another transaction
        </Button>
      </div>

      <Button type="submit" variant="primary">
        Save
      </Button>
    </form>
  )
}
