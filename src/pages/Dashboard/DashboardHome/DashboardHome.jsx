import React from "react";
import ForB from "../../ForB/ForB";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";
import useUserRole from "../../../hooks/useUserRole";




const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <p>Loading......</p>;
  }

  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else if (role === "admin") {
    return  <AdminDashboard></AdminDashboard>
  } else {
    return <ForB></ForB>;
  }
};

export default DashboardHome;
