import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
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
            <main className="p-4 pt-16">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;