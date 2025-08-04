import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const UserDashboard = () => {
  const { user, token } = useAuth();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email || !token) return;

    setLoading(true);
    setError(null);

    axios
      .get(
        `https://courier-server-six.vercel.app/parcels?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Firebase Token
          },
        }
      )
      .then((res) => {
        setParcels(res.data);
      })
      .catch((err) => {
        console.error("Error fetching parcels:", err.response || err.message);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Unauthorized access. Please login again.");
        } else {
          setError("Failed to fetch parcels.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, token]);

  const totalParcels = parcels.length;
  const pendingParcels = parcels.filter(
    (p) => p.delivery_status === "pending"
  ).length;
  const completedParcels = parcels.filter(
    (p) => p.delivery_status === "delivered"
  ).length;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Welcome to , {user?.displayName || "User"}!
      </h2>

      {loading && <p>Loading parcels...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card   p-4 rounded shadow">
              <h3 className="text-xl font-semibold">Total Parcels</h3>
              <p className="text-3xl">{totalParcels}</p>
            </div>
            <div className="card   p-4 rounded shadow">
              <h3 className="text-xl font-semibold">Pending Parcels</h3>
              <p className="text-3xl">{pendingParcels}</p>
            </div>
            <div className="card  p-4 rounded shadow">
              <h3 className="text-xl font-semibold">Completed Parcels</h3>
              <p className="text-3xl">{completedParcels}</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Recent Parcels</h3>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Parcel ID</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Booking Date</th>
                  <th className="border border-gray-300 p-2">Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {parcels.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="border border-gray-300 p-2 text-center text-gray-500"
                    >
                      No parcels found.
                    </td>
                  </tr>
                ) : (
                  parcels.map((parcel) => (
                    <tr key={parcel._id}>
                      <td className="border border-gray-300 p-2">
                        {parcel.tracking_id || parcel._id}
                      </td>
                      <td
                        className={`border border-gray-300 p-2 ${
                          parcel.delivery_status === "pending"
                            ? "text-yellow-600"
                            : parcel.delivery_status === "delivered"
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {parcel.delivery_status}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {parcel.createdAt
                          ? new Date(parcel.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {parcel.delivered_at
                          ? new Date(parcel.delivered_at).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
