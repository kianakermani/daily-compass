import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";

import TodayCheckin from "./pages/TodayCheckin";
import History from "./pages/History";
import Goals from "./pages/Goals";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: TodayCheckin },
      { path: "history", Component: History },
      { path: "goals", Component: Goals },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
