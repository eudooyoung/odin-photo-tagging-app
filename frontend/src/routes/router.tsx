import FindGeeksApp from "@/FindGeeksApp.tsx";
import { Home } from "@/pages/home/Home.tsx";
import { createBrowserRouter, type RouteObject } from "react-router";

const routes = [
  {
    path: "/",
    element: <FindGeeksApp />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);
