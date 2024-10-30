import React from "react";
import {
    Home,
    Users,
    Settings,
    HelpCircle,
    BarChart,
    Menu,
    X
} from "lucide-react";
import { Button } from "@nextui-org/react";

const Sidebar = ({ isOpen, onToggle }) => {
    const menuItems = [
        { icon: <Home size={20} />, text: "Inicio", href: "#" },
        { icon: <Users size={20} />, text: "Clientes", href: "#" },
        { icon: <BarChart size={20} />, text: "Analytics", href: "#" },
        { icon: <Settings size={20} />, text: "Configuración", href: "#" },
        { icon: <HelpCircle size={20} />, text: "Ayuda", href: "#" },
    ];

    return (
        <>
            {/* Botón de menú - visible solo cuando el sidebar está cerrado */}
            {!isOpen && (
                <Button
                    onClick={onToggle}
                    variant="light"
                    isIconOnly
                    className="fixed top-3 left-4 z-50"
                >
                    <Menu size={20} />
                </Button>
            )}

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50"
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
                <div className="flex justify-between items-center mb-8 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary" />
                        <span className="text-xl font-bold">ACME</span>
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