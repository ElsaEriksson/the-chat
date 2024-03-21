import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,

    children: [
      { path: "/", element: <Chat />, index: true },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/home", element: <Home /> },
    ],
  },
]);
