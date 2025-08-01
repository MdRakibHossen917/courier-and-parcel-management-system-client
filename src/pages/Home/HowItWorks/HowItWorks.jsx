import React from "react";
import {
  FaBox,
  FaMapMarkerAlt,
  FaTruckMoving,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaBox className="text-4xl text-primary mb-4" />,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 2,
    icon: <FaMapMarkerAlt className="text-4xl text-primary mb-4" />,
    title: "Cash On Delivery",
    description: "Track your shipment in real-time with live updates and ETA.",
  },
  {
    id: 3,
    icon: <FaTruckMoving className="text-4xl text-primary mb-4" />,
    title: "Delivery Hub",
    description:
      "We ensure quick and safe delivery using our reliable logistics network.",
  },
  {
    id: 4,
    icon: <FaCheckCircle className="text-4xl text-primary mb-4" />,
    title: "Booking SME & Corporate",
    description:
      "Receive delivery confirmation instantly once the package is delivered.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-12">How It Works</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="card bg-white shadow-md p-6 hover:bg-[#84d0fe] transition rounded-lg"
            >
              <div className="flex flex-col items-center">
                {step.icon}
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
