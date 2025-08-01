import React from 'react';
import ExpressLogo from '../pages/shared/ExpressLogo/ExpressLogo';
import authImage from '../assets/Image/AuthPf.jpg'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
      <div className="m-20 p-12 bg-base-200">
        <div>
          <ExpressLogo></ExpressLogo>
        </div>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
          <div className="flex-1">
            <img src={authImage} className="max-w-sm rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    );
};

export default AuthLayout;