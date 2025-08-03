import React from "react";
import { NavLink, Outlet } from "react-router";
import ExpressLogo from "../pages/shared/ExpressLogo/ExpressLogo";

// Import icons
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaTruck,
  FaUserEdit,
  FaMotorcycle,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaTasks,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
 

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
  console.log(role)
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
            <NavLink to="/dashboard/home">
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/myParcels">
              <FaBoxOpen className="mr-2" /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaMoneyCheckAlt className="mr-2" /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/track">
              <FaTasks className="mr-2" /> Track a Package
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <FaUserEdit className="mr-2" /> Update Profile
            </NavLink>
          </li>
          {/*rider links */}

          {!roleLoading && role === "rider" && (
            <>
              <li>
                <NavLink to="/dashboard/pending-deliveries">
                  <FaTasks className="inline-block mr-2" />
                  Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-earning"> 
                  <FaWallet className="inline-block mr-2" />
                  My Earnings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/completed-deliveries">
                  <FaCheckCircle className="inline-block mr-2" />
                  Completed-Deliveries
                </NavLink>
              </li>
            </>
          )}

          {/*admin links */}

          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/users">
                  <FaHome className="mr-2" /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/assign-rider">
                  <FaMotorcycle className="inline-block mr-2" />
                  Assign Rider
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/pending-riders">
                  <FaUserClock className="  mr-2" />
                  Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/active-riders">
                  <FaUserCheck className="  mr-2" />
                  Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makeAdmin">
                  <FaUserShield className="  mr-2" />
                  Make Admin
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
