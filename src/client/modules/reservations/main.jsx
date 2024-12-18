import React, { useState } from "react";
import TableComponent from "../../../utilities/table/TableComponent";
export default function ReservationsManagement() {
    const reservationColumns = [
        { uid: "id", name: "ID" },
        { uid: "client", name: "Client" },
        { uid: "plan", name: "Plan" },
        { uid: "room", name: "Room" },
        { uid: "checkIn", name: "Check In" },
        { uid: "checkOut", name: "Check Out" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" },
    ];
    const initialVisibleColumns = ["id", "client", "room", "checkIn", "checkOut", "status", "actions"];
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    const reservations = [
        {
            id: 1,
            client: "John Doe",
            plan: "All Inclusive",
            room: "101",
            checkIn: "2022-01-01",
            checkOut: "2022-01-07",
            status: "active",
        },
        {
            id: 2,
            client: "Jane Doe",
            plan: "Bed & Breakfast",
            room: "102",
            checkIn: "2022-01-01",
            checkOut: "2022-01-07",
            status: "active",
        },
    ];

    return (
        <div>
            <TableComponent columns={reservationColumns} data={reservations} INITIAL_VISIBLE_COLUMNS={initialVisibleColumns} statusOptions={statusOptions} />
        </div>
    );
}
