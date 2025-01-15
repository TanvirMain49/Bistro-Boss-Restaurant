import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MdHome, MdMail, MdMenu, MdReviews } from "react-icons/md";
import {
  FaBookmark,
  FaCalendar,
  FaHome,
  FaMoneyBill,
  FaPhone,
  FaPhoneAlt,
  FaRegMoneyBillAlt,
  FaShoppingBasket,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="flex gap-12">
      <div className="w-72 min-h-screen bg-[#D1A054] px-9 py-10">
        <Link to="/" className="titleFont">
          <span className="text-xl font-bold">BISTRO BOSS</span>
          <br />
          <span className="text-base">Restaurant</span>
        </Link>
        <ul className="mt-12 space-y-6 flex flex-col justify-start titleFont font-semibold">
          <li>
            <NavLink className="flex items-center gap-2 uppercase">
              {" "}
              <FaHome className="text-2xl font-bold" /> User Home
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2 uppercase">
              {" "}
              <FaCalendar className="text-xl font-bold" /> Reservation
            </NavLink>
          </li>

          <li>
            <NavLink className="flex items-center gap-2 uppercase">
              {" "}
              <FaWallet className="text-xl font-bold" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/myCart"
              className="flex items-center gap-2 uppercase"
            >
              {" "}
              <FaShoppingCart className="text-xl font-bold" /> My Cart
            </NavLink>
          </li>
          <li>
            <NavLink className="flex items-center gap-2 uppercase">
              {" "}
              <MdReviews className="text-xl font-bold" /> Add review
            </NavLink>
          </li>
          <li>
            <NavLink className="flex items-center gap-2 uppercase">
              {" "}
              <FaBookmark className="text-xl font-bold" /> booking
            </NavLink>
          </li>
          <div className="border border-gray-300"></div>


          <li>
            <NavLink to="/" className="flex items-center gap-2 uppercase">
              {" "}
              <FaHome className="text-xl font-bold" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className="flex items-center gap-2 uppercase">
              {" "}
              <MdMenu className="text-xl font-bold" /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className="flex items-center gap-2 uppercase">
              {" "}
              <FaShoppingBasket  className="text-xl font-bold" /> shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="flex items-center gap-2 uppercase">
              {" "}
              <MdMail  className="text-xl font-bold" /> Contact
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
