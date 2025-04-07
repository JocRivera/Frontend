import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../../layouts/Navbar.jsx";

const ClientLayout = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="flex flex-col p-4 pt-24 mt-4"> {/* Aumentado el padding-top y añadido margin-top */}
                <Outlet />
            </main>
        </div>
    );
};

export default ClientLayout;