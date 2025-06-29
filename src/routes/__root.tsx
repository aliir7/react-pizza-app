import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Header from "../components/ui/Header";
import CartOverview from "../components/features/cart/CartOverview";
import Loader from "../components/ui/Loader";

export const Route = createRootRouteWithContext<{
  isLoading: boolean;
}>()({
  component: function RootComponent() {
    const { isLoading } = Route.useRouteContext();
    return (
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
        {isLoading && <Loader />}
        <Header />
        <div className="overflow-scroll">
          <main className="mx-auto max-w-3xl">
            <Outlet />
          </main>
        </div>
        <CartOverview />
      </div>
    );
  },
});
