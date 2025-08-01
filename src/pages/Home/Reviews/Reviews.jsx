import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import reviewQuote from "../../../assets/Image/reviewQuote.png";

const reviews = [
  {
    id: 1,
    name: "Rakib Hossen",
    designation: "Product Manager",
    image: "https://i.pravatar.cc/150?img=1",
    review: "Excellent service! Fast delivery and friendly support team.",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    designation: "E-commerce Seller",
    image: "https://i.pravatar.cc/150?img=2",
    review:
      "I’ve been using this service for months. Very reliable and affordable!",
  },
  {
    id: 3,
    name: "John Doe",
    designation: "Business Owner",
    image: "https://i.pravatar.cc/150?img=3",
    review: "Top-notch packaging and accurate tracking. Highly recommended!",
  },
  {
    id: 4,
    name: "Mehedi Hasan",
    designation: "Freelancer",
    image: "https://i.pravatar.cc/150?img=4",
    review: "Smooth experience from start to finish. Great work!",
  },
  {
    id: 5,
    name: "Anika Rahman",
    designation: "Fashion Retailer",
    image: "https://i.pravatar.cc/150?img=5",
    review: "My products always arrive on time. Excellent courier service!",
  },
  {
    id: 6,
    name: "Abir Hossain",
    designation: "Online Marketer",
    image: "https://i.pravatar.cc/150?img=8",
    review: "Reliable delivery and amazing customer service.",
  },
  {
    id: 7,
    name: "Sumaiya Sultana",
    designation: "Home Business Owner",
    image: "https://i.pravatar.cc/150?img=7",
    review: "Highly organized team and transparent delivery process.",
  },
  {
    id: 8,
    name: "Nazmul Karim",
    designation: "Startup Founder",
    image: "https://i.pravatar.cc/150?img=8",
    review: "Fast delivery even in remote areas. Impressed!",
  },
  {
    id: 9,
    name: "Shamima Akter",
    designation: "Service Holder",
    image: "https://i.pravatar.cc/150?img=9",
    review: "Good pricing and friendly riders. Love the service!",
  },
  {
    id: 10,
    name: "Asif Ali",
    designation: "Shop Owner",
    image: "https://i.pravatar.cc/150?img=10",
    review: "On-time delivery and no damage. Fully satisfied!",
  },
];

const Reviews = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#03373D] mb-12">
          What Our Clients Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white shadow-md rounded-xl p-6 text-center transition-all duration-300 hover:bg-[#84d0fe]/20">
                <img
                  src={reviewQuote}
                  alt="Quote"
                  className="w-8 mx-auto mb-4"
                />
                <p className="text-gray-700 italic mb-4">“{review.review}”</p>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex items-center gap-4 justify-center">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-[#03373D]">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {review.designation}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
