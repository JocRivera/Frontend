import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="min-h-screen">
            <Navbar />
            <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            <main className="flex flex-col p-4 pt-24 mt-4"> {/* Aumentado el padding-top y añadido margin-top */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;