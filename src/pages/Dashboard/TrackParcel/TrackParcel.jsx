import React, { useState } from "react";
import axios from "axios";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    setError("");
    setTrackingData(null);
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/tracking/${trackingId}`
      );
      setTrackingData(res.data); // API থেকে array আকারে ট্র্যাকিং লগ আসবে
    } catch (err) {
      setError("❌ Tracking ID is invalid or not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl text-black mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📦 Track Your Parcel
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID"
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleTrack}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Track
        </button>
      </div>

      {loading && <p className="text-blue-600">🔄 Tracking...</p>}

      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {trackingData && trackingData.length > 0 && (
        <div className="mt-6 border rounded p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            📦 Parcel Tracking History
          </h3>
          {trackingData.map((item, index) => (
            <div
              key={index}
              className="mb-4 p-3 border rounded bg-white shadow"
            >
              <p>
                <strong>Tracking ID:</strong> {item.tracking_id}
              </p>
              <p>
                <strong>Status:</strong> {item.status}
              </p>
              <p>
                <strong>Message:</strong> {item.message}
              </p>
              <p>
                <strong>Updated By:</strong> {item.updated_by || "N/A"}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(item.time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {trackingData && trackingData.length === 0 && (
        <p>No tracking information found for this ID.</p>
      )}
    </div>
  );
};

export default TrackParcel;
