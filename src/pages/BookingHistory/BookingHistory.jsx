import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export default function BookingHistory() {
  const { user } = useContext(AuthContext);
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    async function fetchParcels() {
      try {
        const res = await axios.get("http://localhost:5000/api/parcels", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setParcels(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (user) fetchParcels();
  }, [user]);

  return (
    <div className="max-w-4xl text-black mx-auto p-4">
      <h2 className="text-2xl mb-6">Your Bookings</h2>
      {parcels.length === 0 && <p>No bookings yet</p>}

      {parcels.map((parcel) => (
        <div key={parcel._id} className="mb-8 border p-4 rounded shadow">
          <p>
            <strong>Pickup:</strong> {parcel.pickupAddress}
          </p>
          <p>
            <strong>Delivery:</strong> {parcel.deliveryAddress}
          </p>
          <p>
            <strong>Status:</strong> {parcel.status}
          </p>

          {parcel.locationHistory && parcel.locationHistory.length > 0 ? (
            <MapContainer
              center={[
                parcel.locationHistory[0].lat,
                parcel.locationHistory[0].lng,
              ]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {parcel.locationHistory.map((loc, i) => (
                <Marker key={i} position={[loc.lat, loc.lng]}>
                  <Popup>
                    Time: {new Date(loc.timestamp).toLocaleString()}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <p className="mt-2 text-gray-500">
              Tracking data not available yet.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
