import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCoveredArea, setSelectedCoveredArea] = useState("");

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData() || [];

  // Unique regions from service centers data
  const regions = [...new Set(serviceCenters.map((s) => s.region))];

  // Filter districts by selected region
  const districts = selectedRegion
    ? serviceCenters
        .filter((s) => s.region === selectedRegion)
        .map((s) => s.district)
    : [];

  // Filter covered areas by selected district
  const coveredAreas = selectedDistrict
    ? serviceCenters.find((c) => c.district === selectedDistrict)
        ?.covered_area || []
    : [];

  // When district changes, reset covered area and set form values
  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedCoveredArea("");
    setValue("district", district);
    setValue("covered_area", "");
  };

  // When covered area changes, set form value
  const handleCoveredAreaChange = (area) => {
    setSelectedCoveredArea(area);
    setValue("covered_area", area);
  };

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application is pending approval.",
        });
        reset();
        setSelectedRegion("");
        setSelectedDistrict("");
        setSelectedCoveredArea("");
      } else {
        throw new Error("Failed to insert rider application");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-2">Become a Rider</h2>
      <p className="text-gray-500 mb-6">
        Fill out the form to apply as a delivery rider.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Name (read-only) */}
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered text-black w-full bg-gray-100"
          />

          {/* Email (read-only) */}
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered text-black w-full bg-gray-100"
          />

          {/* Age */}
          <input
            type="number"
            placeholder="Your Age"
            className="input input-bordered w-full"
            {...register("age", { required: true, min: 18 })}
          />
          {errors.age && (
            <span className="text-red-500 text-sm">
              You must be 18 or older
            </span>
          )}

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">
              Phone number is required
            </span>
          )}

          {/* National ID */}
          <input
            type="text"
            placeholder="National ID Card Number"
            className="input input-bordered w-full"
            {...register("nid", { required: true })}
          />
          {errors.nid && (
            <span className="text-red-500 text-sm">NID is required</span>
          )}

          {/* Region */}
          <select
            className="select select-bordered w-full"
            {...register("region", { required: true })}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setSelectedDistrict("");
              setSelectedCoveredArea("");
            }}
            value={selectedRegion}
          >
            <option value="">Select Region</option>
            {regions.map((region, idx) => (
              <option key={idx} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <span className="text-red-500 text-sm">Region is required</span>
          )}

          {/* District */}
          <select
            className="select select-bordered w-full"
            {...register("district", { required: true })}
            disabled={!selectedRegion}
            onChange={(e) => handleDistrictChange(e.target.value)}
            value={selectedDistrict}
          >
            <option value="">Select District</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <span className="text-red-500 text-sm">District is required</span>
          )}

          {/* Covered Area */}
          <select
            className="select select-bordered w-full"
            {...register("covered_area", { required: true })}
            disabled={!selectedDistrict || coveredAreas.length === 0}
            onChange={(e) => handleCoveredAreaChange(e.target.value)}
            value={selectedCoveredArea}
          >
            <option value="">Select Covered Area</option>
            {coveredAreas.map((area, idx) => (
              <option key={idx} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.covered_area && (
            <span className="text-red-500 text-sm">
              Covered area is required
            </span>
          )}

          {/* Bike Brand */}
          <input
            type="text"
            placeholder="Bike Brand (e.g., Yamaha FZ)"
            className="input input-bordered w-full"
            {...register("bike_brand", { required: true })}
          />
          {errors.bike_brand && (
            <span className="text-red-500 text-sm">Bike brand is required</span>
          )}

          {/* Bike Registration */}
          <input
            type="text"
            placeholder="Bike Registration Number"
            className="input input-bordered w-full"
            {...register("bike_registration", { required: true })}
          />
          {errors.bike_registration && (
            <span className="text-red-500 text-sm">
              Registration number is required
            </span>
          )}

          {/* Additional Info (optional) */}
          <textarea
            placeholder="Additional information (optional)"
            className="textarea textarea-bordered w-full"
            {...register("note")}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-black w-full mt-4"
        >
          Submit Rider Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
