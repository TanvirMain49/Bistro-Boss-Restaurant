import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import img1 from "../assets/others/profile.png";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../Hooks/useCart";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [cart] = useCart();
  return (
    <div className="navbar fixed z-10 bg-opacity-50 px-9 bg-[#151515] text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLink to="/">HOME</NavLink>
            <NavLink>CONTACT US</NavLink>
            <NavLink>DASHBOARD</NavLink>
            <NavLink to="menu">OUR MENU</NavLink>
            <NavLink to="order">OUR SHOP</NavLink>
          </ul>
        </div>
        <Link to='/' className="titleFont">
          <span className="text-xl font-bold">BISTRO BOSS</span>
          <br />
          <span className="text-base">Restaurant</span>
        </Link>
      </div>
      <div className="navbar-end">
        {/* menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 pt-3 pr-5 font-bold">
            <Link to="/">HOME</Link>
            <Link>CONTACT US</Link>
            <Link>DASHBOARD</Link>
            <Link to="menu">OUR MENU</Link>
            <NavLink to="order/salad">OUR SHOP</NavLink>
            <NavLink to='/dashboard/myCart'  className="text-xl flex relative pr-5">
              <FaShoppingCart/>
              <div className="badge badge-secondary rounded-full absolute -top-2 left-3">{cart.length}</div>
            </NavLink>
          </ul>
          {user ? (
            <></>
          ) : (
            <>
              <Link
                to="/login"
                className="btn  bg-[#D1A054] hover:bg-[#8a6020] text-white font-semibold py-1 rounded-md "
              >
                Log in
              </Link>
            </>
          )}
        </div>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-16 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral-500 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => signOutUser()}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
