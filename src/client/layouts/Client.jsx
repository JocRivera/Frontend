import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../../layouts/Navbar.jsx";

const ClientLayout = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="flex flex-col p-4 pt-16"> {/* Use flexbox for layout */}
                <Outlet />
            </main>
        </div>
    );
};

export default ClientLayout;