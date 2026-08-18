import { createFileRoute } from '@tanstack/react-router'

import { BudgetSummary } from '#/components/BudgetSummary'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold my-4">Welcome to CountSense</h1>

      <BudgetSummary />
    </div>
  )
}
