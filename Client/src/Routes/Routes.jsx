import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Mainlayout";
import Footer from "../Shared/Footer";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/OurOrder/Order";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";


const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/menu',
            element: <Menu></Menu>
        },
        {
            path:'/order/:category',
            element: <Order></Order>
        }
      ]
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/signup',
      element:<SignUp></SignUp>
    }
  ]);

  export default router;