import React from "react";
import creator from "../../assets/Image/creator.jpg";

const About = () => {
  return (
    <section className="px-4 py-16 bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">About Us</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={creator}
              alt="Team working"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
            <p className="mb-4">
              We are a passionate team dedicated to delivering reliable and
              efficient courier and parcel solutions across the country. Our
              goal is to provide the fastest and safest delivery experience for
              individuals and businesses.
            </p>
            <p className="mb-4">
              Whether you’re sending a package across town or managing eCommerce
              shipments, we make it simple, secure, and seamless. Customer
              satisfaction is our top priority.
            </p>
            <p>Trust us to move your world—one delivery at a time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
