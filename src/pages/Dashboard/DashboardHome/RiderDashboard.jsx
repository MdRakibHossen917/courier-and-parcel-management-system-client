import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const RiderDashboard = () => {
  const { user, token } = useAuth();
  const [assignedParcels, setAssignedParcels] = useState([]);
  const [completedParcels, setCompletedParcels] = useState([]);
  const [loadingAssigned, setLoadingAssigned] = useState(false);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [errorAssigned, setErrorAssigned] = useState(null);
  const [errorCompleted, setErrorCompleted] = useState(null);

  useEffect(() => {
    if (!user?.email || !token) return;

    // Assigned parcels (pending delivery tasks)
    setLoadingAssigned(true);
    setErrorAssigned(null);
    axios
      .get(
        `https://courier-server-six.vercel.app/rider/parcels?email=${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setAssignedParcels(res.data))
      .catch((err) => {
        console.error(
          "Error fetching assigned parcels:",
          err.response || err.message
        );
        setErrorAssigned("Failed to fetch assigned parcels");
      })
      .finally(() => setLoadingAssigned(false));

    // Completed parcels
    setLoadingCompleted(true);
    setErrorCompleted(null);
    axios
      .get(
        `https://courier-server-six.vercel.app/rider/completed-parcels?email=${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setCompletedParcels(res.data))
      .catch((err) => {
        console.error(
          "Error fetching completed parcels:",
          err.response || err.message
        );
        setErrorCompleted("Failed to fetch completed parcels");
      })
      .finally(() => setLoadingCompleted(false));
  }, [user, token]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Welcome Rider, {user?.displayName || "Rider"}!
      </h2>

      {/* Assigned Parcels Section */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">
          Assigned Parcels (Pending Delivery)
        </h3>
        {loadingAssigned && <p>Loading assigned parcels...</p>}
        {errorAssigned && <p className="text-red-600">{errorAssigned}</p>}
        {!loadingAssigned && !errorAssigned && assignedParcels.length === 0 && (
          <p className="text-gray-600">No assigned parcels found.</p>
        )}
        {!loadingAssigned && !errorAssigned && assignedParcels.length > 0 && (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Parcel ID</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {assignedParcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="border border-gray-300 p-2">
                    {parcel.tracking_id || parcel._id}
                  </td>
                  <td className="border border-gray-300 p-2 text-yellow-600">
                    {parcel.delivery_status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {parcel.createdAt
                      ? new Date(parcel.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Completed Parcels Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Completed Parcels</h3>
        {loadingCompleted && <p>Loading completed parcels...</p>}
        {errorCompleted && <p className="text-red-600">{errorCompleted}</p>}
        {!loadingCompleted &&
          !errorCompleted &&
          completedParcels.length === 0 && (
            <p className="text-gray-600">No completed parcels found.</p>
          )}
        {!loadingCompleted &&
          !errorCompleted &&
          completedParcels.length > 0 && (
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
                {completedParcels.map((parcel) => (
                  <tr key={parcel._id}>
                    <td className="border border-gray-300 p-2">
                      {parcel.tracking_id || parcel._id}
                    </td>
                    <td className="border border-gray-300 p-2 text-green-600">
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
                ))}
              </tbody>
            </table>
          )}
      </section>
    </div>
  );
};

export default RiderDashboard;
