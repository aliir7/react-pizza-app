import Cart from "./components/features/cart/Cart";
import Menu, { loader as menuLoader } from "./components/features/menu/Menu";
import { loader as orderLoader } from "./components/features/order/Order";

import CreateOrder, {
  action as createOrderAction,
} from "./components/features/order/CreateOrder";

import { action as updateOrderAction } from "./components/features/order/UpdateOrder";
import Order from "./components/features/order/Order";
import AppLayout from "./components/ui/AppLayout";
import Error from "./components/ui/Error";
import Home from "./components/ui/Home";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
