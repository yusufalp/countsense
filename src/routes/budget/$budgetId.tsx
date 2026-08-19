import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/budget/$budgetId')({
  component: RouteComponent,
})

function RouteComponent() {
  const budgetId = useParams({
    from: '/budget/$budgetId',
    select: (params) => params.budgetId,
  })

  console.log(budgetId)

  return <div>Hello "/budget/$budgetId"!</div>
}
