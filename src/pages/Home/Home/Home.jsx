import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <Services></Services>
          <ClientLogosMarquee></ClientLogosMarquee>
        </div>
    );
};

export default Home;