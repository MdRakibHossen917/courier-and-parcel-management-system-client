import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // States for controlled dropdown changes
  const [senderRegion, setSenderRegion] = useState("");
  const [senderCenter, setSenderCenter] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [receiverCenter, setReceiverCenter] = useState("");

  const parcelType = watch("type");
  const weight = watch("weight");

  // Unique regions for dropdown
  const uniqueRegions = [...new Set(serviceCenters.map((c) => c.region))];

  // Get districts(service centers) by region
  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((c) => c.region === region).map((c) => c.district);

  // Get covered areas by district
  const getCoveredAreasByDistrict = (district) =>
    serviceCenters.find((c) => c.district === district)?.covered_area || [];

  // Calculate delivery cost
  const calculateCost = () => {
    const w = parseFloat(weight) || 0;
    const sameDistrict = senderCenter === receiverCenter;

    let baseCost = 0,
      extraCost = 0,
      breakdown = "";

    if (parcelType === "document") {
      baseCost = sameDistrict ? 60 : 80;
      breakdown = `Document delivery ${
        sameDistrict ? "within" : "outside"
      } the district.`;
    } else {
      if (w <= 3) {
        baseCost = sameDistrict ? 110 : 150;
        breakdown = `Non-document up to 3kg ${
          sameDistrict ? "within" : "outside"
        } the district.`;
      } else {
        const extraKg = w - 3;
        const perKgCharge = extraKg * 40;
        const districtExtra = sameDistrict ? 0 : 40;
        baseCost = sameDistrict ? 110 : 150;
        extraCost = perKgCharge + districtExtra;

        breakdown = `
        Non-document over 3kg ${
          sameDistrict ? "within" : "outside"
        } the district.<br/>
        Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
        ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
        `;
      }
    }

    return {
      baseCost,
      extraCost,
      totalCost: baseCost + extraCost,
      breakdown,
    };
  };

  const onSubmit = (data) => {
    const { baseCost, extraCost, totalCost, breakdown } = calculateCost();

    Swal.fire({
      title: "Delivery Cost Breakdown",
      icon: "info",
      html: `
        <div class="text-left text-base space-y-2">
          <p><strong>Parcel Type:</strong> ${data.type}</p>
          <p><strong>Weight:</strong> ${data.weight || 0} kg</p>
          <p><strong>Delivery Zone:</strong> ${
            data.sender_center === data.receiver_center
              ? "Within Same District"
              : "Outside District"
          }</p>
          <hr class="my-2"/>
          <p><strong>Base Cost:</strong> ৳${baseCost}</p>
          ${
            extraCost > 0
              ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>`
              : ""
          }
          <div class="text-gray-500 text-sm">${breakdown}</div>
          <hr class="my-2"/>
          <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
        </div>
      `,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      denyButtonText: "✏️ Continue Editing",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#d3d3d3",
      background: "#1e293b",
      color: "#f8fafc",
      customClass: {
        popup: "rounded-xl shadow-md px-6 py-6",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: totalCost,
          created_by: user.email,
          payment_status: "unpaid",
          delivery_status: "not_collected",
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID(),
        };
        // Log the data before sending
        console.log("Parcel Data Sending to Server:", parcelData);

        axiosSecure.post("/parcels", parcelData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Parcel Created!",
              text: "Redirecting to payment gateway...",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: "#1e293b",
              color: "#f8fafc",
            });
            //  TODO: payment page  redirect  korbo eikhane 
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to create parcel. Try again.",
              icon: "error",
              background: "#1e293b",
              color: "#f8fafc",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-1">Send a Parcel</h2>
          <p className="text-gray-400">Fill in the details below</p>
        </div>

        {/* Parcel Info */}
        <div className="border border-gray-700 p-6 rounded-xl shadow-inner space-y-6 bg-gray-800">
          <h3 className="font-semibold text-xl mb-4">Parcel Info</h3>
          <div className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Parcel Name</label>
              <input
                {...register("title", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your parcel"
              />
              {errors.title && (
                <p className="text-red-500 mt-1 text-sm">
                  Parcel name is required
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Type</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="document"
                    {...register("type", { required: true })}
                    className="accent-blue-500"
                  />
                  Document
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="non-document"
                    {...register("type", { required: true })}
                    className="accent-blue-500"
                  />
                  Non-Document
                </label>
              </div>
              {errors.type && (
                <p className="text-red-500 mt-1 text-sm">Type is required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                disabled={parcelType !== "non-document"}
                className={`w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  parcelType !== "non-document"
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                placeholder="Enter weight"
              />
            </div>
          </div>
        </div>

        {/* Payment Type */}
        <div>
          <label className="block mb-2 font-medium">Payment Type</label>
          <select
            {...register("payment_type", { required: true })}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Payment Type</option>
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="Prepaid">Prepaid</option>
          </select>
          {errors.payment_type && (
            <p className="text-red-500 mt-1 text-sm">
              Payment type is required
            </p>
          )}
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender */}
          <div className="border border-gray-700 p-6 rounded-xl shadow-inner bg-gray-800 space-y-6">
            <h3 className="font-semibold text-xl">Sender Info</h3>
            <div className="space-y-4">
              <input
                {...register("sender_name", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              {errors.sender_name && (
                <p className="text-red-500 text-sm">Sender name is required</p>
              )}

              <input
                {...register("sender_contact", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contact"
              />
              {errors.sender_contact && (
                <p className="text-red-500 text-sm">
                  Sender contact is required
                </p>
              )}

              <select
                {...register("sender_region", { required: true })}
                onChange={(e) => {
                  setSenderRegion(e.target.value);
                  setSenderCenter("");
                }}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.sender_region && (
                <p className="text-red-500 text-sm">
                  Sender region is required
                </p>
              )}

              <select
                {...register("sender_center", { required: true })}
                onChange={(e) => setSenderCenter(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!senderRegion}
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(senderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.sender_center && (
                <p className="text-red-500 text-sm">
                  Sender center is required
                </p>
              )}

              <select
                {...register("sender_covered_area", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!senderCenter}
              >
                <option value="">Select Covered Area</option>
                {getCoveredAreasByDistrict(senderCenter).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.sender_covered_area && (
                <p className="text-red-500 text-sm">
                  Sender covered area is required
                </p>
              )}

              <input
                {...register("sender_address", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address"
              />
              {errors.sender_address && (
                <p className="text-red-500 text-sm">
                  Sender address is required
                </p>
              )}

              <textarea
                {...register("pickup_instruction", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Pickup Instruction"
              />
              {errors.pickup_instruction && (
                <p className="text-red-500 text-sm">
                  Pickup instruction is required
                </p>
              )}
            </div>
          </div>

          {/* Receiver */}
          <div className="border border-gray-700 p-6 rounded-xl shadow-inner bg-gray-800 space-y-6">
            <h3 className="font-semibold text-xl">Receiver Info</h3>
            <div className="space-y-4">
              <input
                {...register("receiver_name", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              {errors.receiver_name && (
                <p className="text-red-500 text-sm">
                  Receiver name is required
                </p>
              )}

              <input
                {...register("receiver_contact", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contact"
              />
              {errors.receiver_contact && (
                <p className="text-red-500 text-sm">
                  Receiver contact is required
                </p>
              )}

              <select
                {...register("receiver_region", { required: true })}
                onChange={(e) => {
                  setReceiverRegion(e.target.value);
                  setReceiverCenter("");
                }}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {errors.receiver_region && (
                <p className="text-red-500 text-sm">
                  Receiver region is required
                </p>
              )}

              <select
                {...register("receiver_center", { required: true })}
                onChange={(e) => setReceiverCenter(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!receiverRegion}
              >
                <option value="">Select Service Center</option>
                {getDistrictsByRegion(receiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.receiver_center && (
                <p className="text-red-500 text-sm">
                  Receiver center is required
                </p>
              )}

              <select
                {...register("receiver_covered_area", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!receiverCenter}
              >
                <option value="">Select Covered Area</option>
                {getCoveredAreasByDistrict(receiverCenter).map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.receiver_covered_area && (
                <p className="text-red-500 text-sm">
                  Receiver covered area is required
                </p>
              )}

              <input
                {...register("receiver_address", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address"
              />
              {errors.receiver_address && (
                <p className="text-red-500 text-sm">
                  Receiver address is required
                </p>
              )}

              <textarea
                {...register("delivery_instruction", { required: true })}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Delivery Instruction"
              />
              {errors.delivery_instruction && (
                <p className="text-red-500 text-sm">
                  Delivery instruction is required
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
