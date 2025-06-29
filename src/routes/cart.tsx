import { createFileRoute } from "@tanstack/react-router";
import Cart from "../components/features/cart/Cart";

export const Route = createFileRoute("/cart")({
  component: Cart,
});
