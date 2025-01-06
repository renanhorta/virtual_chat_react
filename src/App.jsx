import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home/Home";
import ErrorPage from "./views/ErrorPage";
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

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <RouterProvider router={router} />
    </div>
  );
}
