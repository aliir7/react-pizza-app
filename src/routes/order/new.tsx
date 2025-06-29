import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order/new"!</div>
}
