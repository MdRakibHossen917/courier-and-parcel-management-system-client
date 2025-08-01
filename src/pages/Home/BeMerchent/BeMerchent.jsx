import React from "react";
import customerTop from "../../../assets/Image/merchant.png";

const BeMerchent = () => {
  return (
    <div
      data-aos="zoom-in-up"
      className="bg-no-repeat  bg-[url('assets/be-a-merchant-bg.png')]  mb-5 rounded-4xl p-20 bg-[#2e4d51]"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={customerTop} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex items-center gap-4 ">
            <button className="btn btn-outline shadow-none  font-bold   hover:text-black    rounded-full">
              Become a Merchant
            </button>
            <button className="btn font-bold btn-outline shadow-none  text-[#84d0fe] hover:text-black  hover:bg-[#84d0fe] rounded-full">
              Earn with Express Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchent;
