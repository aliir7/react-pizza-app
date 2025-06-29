import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { getMenu } from "../services/apiRestaurant";

export const Route = createFileRoute("/menu")({
  loader: async () => await getMenu(),
  component: lazyRouteComponent(() =>
    import("../components/features/menu/Menu").then((mod) => <mod.default />)
  ),
});
