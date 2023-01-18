import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewGame from "./pages/NewGame";
import MyGames from "./pages/MyGames";
import GameBoard from "./pages/GameBoard";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <MyGames />,
          },
          {
            path: "new-game",
            element: <NewGame />,
          },
          {
            path: "/:id",
            element: <GameBoard />,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
