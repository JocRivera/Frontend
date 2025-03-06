import React, { useState } from "react";
import TableComponent from "../../utilities/table/TableComponent";
import BookForm from "../../utilities/forms/reservation/admin/ReservationForm";
export default function ReservationsManagement() {
    const [reservations, setReservations] = useState([
        {
            id: 1,
            client: "John Doe",
            email: "JaneDo@soy.sena.co",
            documentType: "cc",
            plan: "ar",
            room: "101",
            startDate: "2025-02-26",
            endDate: "2025-02-27",
            status: "active",
        },
        {
            id: 2,
            client: "Jane Doe",
            email: "JaneDo@soy.sena.co",
            documentType: "cc",
            plan: "us",
            room: "102",
            startDate: "2025-02-26",
            endDate: "2025-02-26",
            status: "active",
        },
    ]);
    const reservationColumns = [
        { uid: "id", name: "ID" },
        { uid: "client", name: "Client" },
        { uid: "plan", name: "Plan" },
        { uid: "room", name: "Room" },
        { uid: "startDate", name: "Check In" },
        { uid: "endDate", name: "Check Out" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" },
    ];
    const initialVisibleColumns = ["id", "client", "room", "startDate", "endDate", "status", "actions"];
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    const handleAddReservation = (formData) => {
        const newReservation = {
            id: reservations.length + 1,
            client: formData.name,
            plan: formData.plan,
            email: formData.email,
            room: "Pending", // You might want to add room selection to your form
            startDate: formData.startDate,
            endDate: formData.endDate,
            status: "active",
        };
        setReservations([...reservations, newReservation]);

    };
    const handleEditReservation = (updateData) => {
        setReservations(reservations.map(reservation => reservation.id === updateData.id ? updateData : reservation))
        console.log(updateData)
    }
    const handleDeleteReservation = (id) => {
        setReservations(reservations.filter((reservation) => reservation.id !==
            id));
    }


    return (
        <div>
            <TableComponent
                deleteData={handleDeleteReservation}
                editData={handleEditReservation}
                data={reservations}
                formId="reservation-form"
                size="5xl"
                columns={reservationColumns} initialVisibleColumns={initialVisibleColumns} statusOptions={statusOptions}
                Dynamic={(onClose, data, onEdit) => (
                    <BookForm
                        onSubmit={(data) => {
                            handleAddReservation(data);
                        }}
                        onClose={onClose}
                        initialData={data}
                        onEdit={onEdit}
                    />
                )}


            />
        </div>
    );
}
