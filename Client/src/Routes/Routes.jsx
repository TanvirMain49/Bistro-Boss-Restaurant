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
import UpdateItems from "../Pages/Dashboard/UpdateItems";
import Payment from "../Pages/Dashboard/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome";


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
          path: '/dashboard/userHome',
          element:<PrivateRoutes>
           <UserHome></UserHome>
          </PrivateRoutes>
        },
        {
          path: '/dashboard/myCart',
          element:<PrivateRoutes>
            <MyCart></MyCart>
          </PrivateRoutes>
        },
        {
          path: '/dashboard/payment',
          element: <PrivateRoutes>
            <Payment></Payment>
          </PrivateRoutes>
        },
        {
          path: '/dashboard/paymentHistory',
          element: <PrivateRoutes>
            <PaymentHistory></PaymentHistory>
          </PrivateRoutes>
        },

        // Admin routes
        {
          path: '/dashboard/adminHome',
          element: <PrivateAdminRoutes>
            <AdminHome></AdminHome>
          </PrivateAdminRoutes>
        },
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
          path: '/dashboard/manageItem/updateItem/:id',
          element: <PrivateAdminRoutes>
            <UpdateItems></UpdateItems>
          </PrivateAdminRoutes>,
          loader: ({params})=> fetch(`https://server-psi-sandy.vercel.app/menu/${params.id}`)
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