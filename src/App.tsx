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
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
