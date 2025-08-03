import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import ExpressLogo from "../ExpressLogo/ExpressLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Successfully logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={"text-black font-bold"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel" className={"text-black font-bold"}>
          Send A Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={"text-black font-bold"}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/beARider" className={"text-black font-bold"}>
          Request Be a Rider
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={"text-black font-bold"}>
          Delivery_Station
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={"text-black font-bold"}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-cyan-300 shadow-sm">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
       
        <span to="/">
          <ExpressLogo />
        </span>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <button
            onClick={handleLogOut}
            className="btn btn-outline btn-accent text-black"
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline btn-accent font-bold text-black"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
