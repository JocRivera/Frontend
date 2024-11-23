import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './HomeNavbar.jsx';

const HomeLayout = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="flex flex-col p-4 pt-16"> {/* Use flexbox for layout */}
                <Outlet />
            </main>
        </div>
    );
}

export default HomeLayout;