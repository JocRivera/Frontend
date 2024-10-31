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
            <main className="flex flex-col p-4 pt-16"> {/* Use flexbox for layout */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;