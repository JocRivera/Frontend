import { Badge, Button, Popover, PopoverTrigger, PopoverContent, } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import React, { useEffect, useState } from "react";
import { initSocket } from "../../services/socket/socket";
import Cookies from "js-cookie";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [connected, setConnected] = useState(false);
    const token = Cookies.get("token");
    useEffect(() => {
        const token = Cookies.get("token");
        const newSocket = initSocket(token);

        newSocket.connect();

        newSocket.on("connect", () => {
            setConnected(true);
            // Join admin room if user is admin
            newSocket.emit('join_admin_room', token);
        });

        newSocket.on("disconnect", () => setConnected(false));

        newSocket.on("notification", (data) => {
            console.log("Notification received:", data);
            setNotifications(prev => [...prev, data]);
        });

        return () => {
            newSocket.off("connect");
            newSocket.off("disconnect");
            newSocket.off("notification");
            newSocket.disconnect();
        };
    }, []);

    const badgeContent = notifications.length > 99 ? "99+" : notifications.length;

    return (
        <Popover placement="bottom-end" showArrow={true}>
            <Badge content={badgeContent} shape="circle" color="danger" isInvisible={notifications === 0}>
                <PopoverTrigger>
                    <Button
                        radius="full"
                        isIconOnly
                        aria-label="notifications"
                        variant="light"
                    >
                        <NotificationIcon size={24} />
                    </Button>
                </PopoverTrigger>
            </Badge>
            <PopoverContent>
                <div className="px-2 py-2 overflow-y-auto max-h-64 w-72">
                    {notifications.length === 0 ? (
                        <p className="text-sm text-center text-gray-500">No hay notificaciones</p>
                    ) : (
                        notifications.map((notif, index) => (
                            <div key={index} className="p-2 border-b border-gray-200">
                                <p className="text-sm font-semibold">{notif.title || JSON.stringify(notif.reservaId)}</p>
                                <p className="text-xs text-gray-600">{notif.message || JSON.stringify(notif)}</p>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>

        </Popover >
    );
}
