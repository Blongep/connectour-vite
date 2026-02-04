/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import React from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { BaseLayout, MainLayout, RootError } from "../components"

/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */
export const router = createBrowserRouter([
  {
    path: "",
    element: <BaseLayout />,
    errorElement: <RootError />,
    children: [
      { path: "login", lazy: () => import("./login") },
      { path: "privacy", lazy: () => import("./privacy") },
      { path: "terms", lazy: () => import("./terms") },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", lazy: () => import("./dashboard") },
      { path: "dashboard/agent", lazy: () => import("./dashboard-agent") },
      { path: "dashboard/prod", lazy: () => import("./dashboard-prod") },
      { path: "tasks", lazy: () => import("./tasks") },
      { path: "messages", lazy: () => import("./messages") },
      {
        path: "artist/management/:artistShortName",
        lazy: () => import("./artist-agent-page"),
      },
      { path: "artist/:artistShortName", lazy: () => import("./artist-page") },
    ],
  },
])
