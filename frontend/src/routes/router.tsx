import { Layout } from "@/layouts/MainLayout";
import RootLayout from "@/layouts/RootLayout.tsx";
import { GamePage } from "@/pages/game-page/GamePage.tsx";
import { LandingPage } from "@/pages/landing-page/LandingPage.tsx";
import { createBrowserRouter, type RouteObject } from "react-router";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        element: <Layout />,
        children: [{ path: "games/:gameId", element: <GamePage /> }],
      },
    ],
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);
