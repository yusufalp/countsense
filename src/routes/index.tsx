import { createFileRoute, Link } from '@tanstack/react-router'

import { BudgetSummary } from '#/components/BudgetSummary'
import { budgets } from '#/data/budgets'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold my-4">Welcome to CountSense</h1>

      {budgets.length === 0 ? (
        <p>No budgets yet.</p>
      ) : (
        <BudgetSummary budgets={budgets} />
      )}

      <Link to={'/budget/new'}>
        <Button className="mt-4">Create a new budget</Button>
      </Link>
    </div>
  )
}
