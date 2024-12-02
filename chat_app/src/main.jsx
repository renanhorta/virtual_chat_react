import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Home from "./views/Home/Home"
import ErrorPage from './views/error-page';
import UserForm from './views/UserForm/UserForm';
import UsersList from './views/UsersList/UsersList';
import Chat from './views/Chat/Chat';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    errorElement:<ErrorPage/>
  }
  ,{
    path:"cadastro/",
    element:<UserForm/>
  }
  ,{
    path:"usuarios/",
    element:<UsersList/>
  },
  {
    //path:"/chat/:userId",
    path:"/chat",
    element:<Chat/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
