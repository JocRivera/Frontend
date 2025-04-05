import React from "react";
import {
    Home,
    Users,
    Settings,
    HelpCircle,
    BarChart,
    Menu,
    X,
    BookCheck,
    HotelIcon
} from "lucide-react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle }) => {
    const menuItems = [
        { icon: <BarChart size={20} />, text: "Dashboard", to: "/admin/dashboard" },
        { icon: <Home size={20} />, text: "Cabins", to: "/admin/cabins" },
        { icon: <Home size={20} />, text: "Rooms", to: "/admin/rooms" },
        { icon: <HotelIcon size={20} />, text: "Services", to: "/admin/services" },
        { icon: <HelpCircle size={20} />, text: "Plains", to: "/admin/plains" },
        { icon: <Users size={20} />, text: "Clients", to: "/admin/clients" },
        { icon: <BookCheck size={20} />, text: "Reservations", to: "/admin/reservations" },
        { icon: <Users size={20} />, text: "Users", to: "/admin/users" },
        { icon: <Settings size={20} />, text: "Config", to: "/admin/settings" },

    ];

    return (
        <>
            {/* Botón de menú - visible solo cuando el sidebar está cerrado */}
            {!isOpen && (
                <Button
                    onClick={onToggle}
                    variant="light"
                    isIconOnly
                    className="fixed z-50 top-3 left-4"
                >
                    <Menu size={20} />
                </Button>
            )}

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50
                    h-full w-64 
                    bg-background
                    shadow-lg
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    p-4
                `}
            >
                {/* Header con botón de cierre */}
                <div className="flex items-center justify-between mt-4 mb-8">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">ADMIN</span>
                    </div>
                    <Button
                        onClick={onToggle}
                        variant="light"
                        isIconOnly
                        className="min-w-unit-8"
                    >
                        <X size={20} />
                    </Button>
                </div>

                {/* Menú */}
                <nav className="space-y-2">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.to} className="flex items-center p-2">
                                    {item.icon}
                                    <span className="ml-2">{item.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;