import { createFileRoute } from "@tanstack/react-router";
import { getOrder } from "../../services/apiRestaurant";

export const Route = createFileRoute("/order/$orderId")({
  loader: async ({ params }) => await getOrder(params.orderId),
  // component:
});
