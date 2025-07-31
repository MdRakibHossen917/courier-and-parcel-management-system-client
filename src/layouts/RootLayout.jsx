import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;