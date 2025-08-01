import React from "react";
import logo from "../../../assets/Image/logo.png";
import { Link } from "react-router";

const ExpressLogo = () => {
  return (
    <div>
      <Link to='/'>
        <img src={logo} alt="Express Courier Logo" style={{ width: "150px" }} />
      </Link>
    </div>
  );
};

export default ExpressLogo;
