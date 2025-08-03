import React from "react";
import { Link, Outlet } from "react-router";  
import ExpressLogo from "../pages/shared/ExpressLogo/ExpressLogo";

// Import icons
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaTruck,
  FaUserEdit,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for small screens */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Main page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay"
          aria-label="close sidebar"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          <ExpressLogo />
          <li>
            <Link to="/dashboard/home">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/myParcels">
              <FaBoxOpen className="mr-2" /> My Parcels
            </Link>
          </li>
          <li>
            <Link to="/dashboard/paymentHistory">
              <FaMoneyCheckAlt className="mr-2" /> Payment History
            </Link>
          </li>
          <li>
            <Link to="/dashboard/track">
              <FaTruck className="mr-2" /> Track a Package
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile">
              <FaUserEdit className="mr-2" /> Update Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
