import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/Image/banner1.png";
import bannerImg2 from "../../../assets/Image/banner2.png";
import bannerImg3 from "../../../assets/Image/banner3.png";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="rounded-xl overflow-hidden">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        <div>
          <img className="rounded-3xl" src={bannerImg1} alt="Courier Banner 1" />
          <p className="legend">Fast & Reliable Courier</p>
        </div>
        <div>
          <img className="rounded-3xl" src={bannerImg2} alt="Courier Banner 2" />
          <p className="legend">Track Your Parcel Real-Time</p>
        </div>
        <div>
          <img className="rounded-3xl" src={bannerImg3} alt="Courier Banner 3" />
          <p className="legend">Trusted by Thousands</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
