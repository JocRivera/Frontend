import React from "react";
import {
    Home,
    Users,
    Settings,
    HelpCircle,
    BarChart,
} from "lucide-react";

const Sidebar = ({ isOpen }) => {
    const menuItems = [
        { icon: <Home size={20} />, text: "Inicio", href: "#" },
        { icon: <Users size={20} />, text: "Clientes", href: "#" },
        { icon: <BarChart size={20} />, text: "Analytics", href: "#" },
        { icon: <Settings size={20} />, text: "Configuración", href: "#" },
        { icon: <HelpCircle size={20} />, text: "Ayuda", href: "#" },
    ];

    return (
        <>
            {/* Overlay para móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                />
            )}
            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-40
                    h-full w-64 
                    bg-background
                    border-r
                    shadow-lg
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    p-4
                `}
            >
                {/* Menú */}
                <nav className="space-y-2">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item.icon}
                            <span>{item.text}</span>
                        </a>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;