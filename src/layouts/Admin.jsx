import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import SearchBar from '../utilities/search/SearchBar';
import { Button } from '@nextui-org/react';
import TableComponent from '../utilities/table/TableComponent';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const serviceColumns = [
        { uid: "service", name: "Service Name" },
        { uid: "description", name: "Description" },
        { uid: "price", name: "Price" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" }
    ];
    return (
        <div className="min-h-screen">
            <Navbar />
            <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            <main className="flex flex-col p-4 pt-16"> {/* Use flexbox for layout */}
                <div className="flex items-center justify-between mb-4"> {/* Align search bar and button */}
                    <SearchBar /* Implement your SearchBar component functionality here */ />
                    <Button radius="full" className="text-white shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500">
                        Button
                    </Button>
                </div>
                <TableComponent columns={serviceColumns} />
            </main>
        </div>
    );
};

export default AdminLayout;