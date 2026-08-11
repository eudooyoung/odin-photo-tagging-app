import { MainLayout } from "@/layouts/main-layout/MainLayout";
import RootLayout from "@/layouts/RootLayout.tsx";
import { GamePage } from "@/pages/game-page/GamePage.tsx";
import { LandingPage } from "@/pages/landing-page/LandingPage.tsx";
import { LeaderboardPage } from "@/pages/leaderboard-page/LeaderboardPage";
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
        element: <MainLayout />,
        children: [
          { path: "games/:gameId", element: <GamePage /> },
          { path: "leaderboard", element: <LeaderboardPage /> },
        ],
      },
    ],
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes);
