import React, { useState } from "react";
import axios from "axios";

function BookParcel() {
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [parcelSize, setParcelSize] = useState("small");
  const [paymentType, setPaymentType] = useState("COD");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "/api/parcels",
        { pickupAddress, deliveryAddress, parcelSize, paymentType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Parcel booked successfully!");
    } catch (err) {
        console.log(err);
      setMessage("Failed to book parcel");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Pickup Address"
        onChange={(e) => setPickupAddress(e.target.value)}
        required
      />
      <input
        placeholder="Delivery Address"
        onChange={(e) => setDeliveryAddress(e.target.value)}
        required
      />
      <select
        onChange={(e) => setParcelSize(e.target.value)}
        value={parcelSize}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <select
        onChange={(e) => setPaymentType(e.target.value)}
        value={paymentType}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="Prepaid">Prepaid</option>
      </select>
      <button type="submit">Book Parcel</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default BookParcel;
