import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
 

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const TrackParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [trackingID, setTrackingID] = useState("");
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingID) return;
    axiosSecure
      .get(`/parcels/track/${trackingID}`)
      .then((res) => {
        if (res.data) {
          setParcel(res.data);
          setError("");
        } else {
          setError("Parcel not found");
          setParcel(null);
        }
      })
      .catch(() => {
        setError("Error fetching parcel");
        setParcel(null);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleTrack} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingID}
          onChange={(e) => setTrackingID(e.target.value)}
          className="input input-bordered flex-1"
        />
        <button type="submit" className="btn btn-primary">
          Track
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {parcel && parcel.current_location && (
        <MapContainer
          center={[
            parcel.current_location.latitude,
            parcel.current_location.longitude,
          ]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[
              parcel.current_location.latitude,
              parcel.current_location.longitude,
            ]}
            icon={customIcon}
          >
            <Popup>
              <strong>{parcel.title}</strong>
              <br />
              Status: {parcel.delivery_status}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default TrackParcel;
