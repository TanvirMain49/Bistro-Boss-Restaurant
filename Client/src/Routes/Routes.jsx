import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/OurOrder/Order";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart";
import AllUsers from "../Pages/Dashboard/AllUsers";
import PrivateAdminRoutes from "./PrivateAdminRoutes";
import AddItems from "../Pages/Dashboard/AddItems";
import ManageItems from "../Pages/Dashboard/ManageItems";


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
            element: <PrivateRoutes>
              <Order></Order>
            </PrivateRoutes>
        }
      ]
    },

    // dashboard path
    {
      path: "/dashboard",
      element:<PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>,
      children:[
        {
          path: '/dashboard/myCart',
          element:<MyCart></MyCart>
        },

        // Admin routes
        {
          path: '/dashboard/addItem',
          element: <PrivateAdminRoutes>
            <AddItems></AddItems>
          </PrivateAdminRoutes>
        },
        {
          path: '/dashboard/manageItem',
          element: <PrivateAdminRoutes>
            <ManageItems></ManageItems>
          </PrivateAdminRoutes>
        },
        {
          path: '/dashboard/allUsers',
          element:<PrivateAdminRoutes>
            <AllUsers></AllUsers>
          </PrivateAdminRoutes>
        }
      ]
    },


    // auth related path
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