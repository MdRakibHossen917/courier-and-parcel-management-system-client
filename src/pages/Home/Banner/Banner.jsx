import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/Image/banner1.png";
import bannerImg2 from "../../../assets/Image/banner2.png";
import bannerImg3 from "../../../assets/Image/banner3.png";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4">
      <div className="rounded-2xl overflow-hidden">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={4000}
        >
          <div>
            <img
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]  rounded-2xl"
              src={bannerImg1}
              alt="Courier Banner 1"
            />
          </div>
          <div>
            <img
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]   rounded-2xl"
              src={bannerImg2}
              alt="Courier Banner 2"
            />
          </div>
          <div>
            <img
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]   rounded-2xl"
              src={bannerImg3}
              alt="Courier Banner 3"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
