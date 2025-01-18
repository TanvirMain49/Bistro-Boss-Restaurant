import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MdHome, MdMail, MdMenu, MdReviews } from "react-icons/md";
import {
  FaBookmark,
  FaCalendar,
  FaHome,
  FaShoppingBasket,
  FaShoppingCart,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { IoAdd, IoMenu } from "react-icons/io5";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const { isAdmin } = useAdmin();

  return (
    <div className="flex gap-12">
      <div className="w-72 min-h-screen bg-[#D1A054] px-9 py-10">
        <Link to="/" className="titleFont">
          <span className="text-xl font-bold">BISTRO BOSS</span>
          <br />
          <span className="text-base">Restaurant</span>
        </Link>
        <ul className="mt-12 space-y-6 flex flex-col justify-start titleFont font-semibold">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaHome className="text-2xl font-bold" /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addItem"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <IoAdd className="text-xl font-bold" /> Add item
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageItem"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <IoMenu className="text-xl font-bold" /> Manage Item
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/booking"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaBookmark className="text-xl font-bold" /> Manage Booking
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allUsers"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaUsers className="text-xl font-bold" /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaHome className="text-2xl font-bold" /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reservation"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaCalendar className="text-xl font-bold" /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaWallet className="text-xl font-bold" /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myCart"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaShoppingCart className="text-xl font-bold" /> My Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addReview"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <MdReviews className="text-xl font-bold" /> Add Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/booking"
                  className={({ isActive }) =>
                    `flex items-center gap-2 uppercase ${
                      isActive ? "text-white" : "text-gray-700"
                    } hover:text-yellow-500`
                  }
                >
                  <FaBookmark className="text-xl font-bold" /> Booking
                </NavLink>
              </li>
            </>
          )}

          {/* Common Nav Links */}
          <div className="border border-gray-300"></div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : "text-gray-700"
                } hover:text-yellow-500`
              }
            >
              <FaHome className="text-xl font-bold" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : "text-gray-700"
                } hover:text-yellow-500`
              }
            >
              <MdMenu className="text-xl font-bold" /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/order/salad"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : "text-gray-700"
                } hover:text-yellow-500`
              }
            >
              <FaShoppingBasket className="text-xl font-bold" /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center gap-2 uppercase ${
                  isActive ? "text-white" : "text-gray-700"
                } hover:text-yellow-500`
              }
            >
              <MdMail className="text-xl font-bold" /> Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 px-8 py-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
