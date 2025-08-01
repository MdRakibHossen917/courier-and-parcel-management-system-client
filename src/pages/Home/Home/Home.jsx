import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import HowItWorks from '../HowItWorks/HowItWorks';
import Benefits from '../benefits/benefits';
import BeMerchent from '../BeMerchent/BeMerchent';
import Reviews from '../Reviews/Reviews';
import FAQs from '../FAQs/FAQs';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <HowItWorks></HowItWorks>
          <Services></Services>
          <ClientLogosMarquee></ClientLogosMarquee>
          <Benefits></Benefits>
          <BeMerchent></BeMerchent>
          <Reviews></Reviews>
          <FAQs></FAQs>
        </div>
    );
};

export default Home;