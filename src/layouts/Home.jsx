import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './HomeNavbar.jsx';

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-col p-4 pt-20"> {/* Aumentado el padding-top y añadido margin-top */}
                <Outlet />
            </main>
        </div>
    );
}

export default HomeLayout;