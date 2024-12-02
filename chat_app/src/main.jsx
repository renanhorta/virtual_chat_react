import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import Home from "./views/Home/Home"
import ErrorPage from './views/error-page';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    errorElement:<ErrorPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
