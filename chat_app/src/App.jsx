import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home/Home";
import ErrorPage from "./views/error-page";
import UserForm from "./views/UserForm/UserForm";
import UsersList from "./views/UsersList/UsersList";
import Chat from "./views/Chat/Chat";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "cadastro/",
      element: <UserForm />,
    },
    {
      path: "usuarios/",
      element: <UsersList />,
    },
    {
      path: "chat/:userId",
      element: <Chat />,
    },
  ]);

  return <RouterProvider router={router} />;
}
