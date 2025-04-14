import { Badge, Button } from "@nextui-org/react";
import { NotificationIcon } from "./NotificationIcon";
import React, { useEffect, useState } from "react";
import { initSocket } from "../../services/socket/socket";
import Cookies from "js-cookie";

export default function Notification() {
    const [notifications, setNotifications] = useState(0);
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
            setNotifications((prev) => prev + 1);
        });

        return () => {
            newSocket.off("connect");
            newSocket.off("disconnect");
            newSocket.off("notification");
            newSocket.disconnect();
        };
    }, []);

    const badgeContent = notifications > 99 ? "99+" : notifications;

    return (
        <Badge content={badgeContent} shape="circle" color="danger" isInvisible={notifications === 0}>
            <Button
                radius="full"
                isIconOnly
                aria-label="notifications"
                variant="light"
            >
                <NotificationIcon size={24} />
            </Button>
        </Badge>
    );
}
