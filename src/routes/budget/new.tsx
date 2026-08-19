import { useMemo, useState } from 'react'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { formatCurrency } from '#/lib/utils/formatCurrency'

import { Button } from '#/components/ui/button'
import { BudgetTransactions } from '#/components/BudgetTransactions'
import type { DraftTransaction } from '#/components/BudgetTransactions'

export const Route = createFileRoute('/budget/new')({
  component: RouteComponent,
})

function createEmptyTransaction(): DraftTransaction {
  return {
    tempId: crypto.randomUUID(),
    type: 'expense',
    name: '',
    amount: '',
    recurrence: 'monthly',
  }
}

function RouteComponent() {
  const navigate = useNavigate({ from: '/budget/new' })

  const [budgetName, setBudgetName] = useState('')
  const [transactions, setTransactions] = useState<DraftTransaction[]>([
    createEmptyTransaction(),
  ])

  const { totalIncome, totalExpenses, difference } = useMemo(() => {
    let income = 0
    let expenses = 0

    for (const t of transactions) {
      const amount = Number(t.amount)
      if (!amount || amount <= 0) continue

      t.type === 'income' ? (income += amount) : (expenses += amount)
    }

    return {
      totalIncome: income,
      totalExpenses: expenses,
      difference: income - expenses,
    }
  }, [transactions])

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

    console.log({
      name: budgetName,
      totalIncome,
      totalExpenses,
      difference,
      transactions: validTransactions,
    })

    navigate({ to: '/' })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-6">
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
          placeholder="e.g. August 2026, Monthly Budget, etc."
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg text-center">
        <div>
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-lg font-semibold text-green-600">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-lg font-semibold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Difference</p>
          <p
            className={`text-lg font-semibold ${
              difference >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {formatCurrency(difference)}
          </p>
        </div>
      </div>

      <BudgetTransactions
        transactions={transactions}
        onAdd={addTransaction}
        onRemove={removeTransaction}
        onUpdate={updateTransaction}
      />

      <Button type="submit" variant="primary" fullWidth>
        Save Budget
      </Button>
    </form>
  )
}
