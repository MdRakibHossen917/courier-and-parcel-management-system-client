import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const User = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users from MongoDB
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error fetching users</p>;

  return (
    <div className="overflow-x-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">All Users</h2>
      <table className="table table-zebra w-full border rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td className="capitalize text-blue-600 font-medium">
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
