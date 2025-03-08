import React, { useState, useEffect } from "react";
import TableComponent from "../../utilities/table/TableComponent";
import BookForm from "../../utilities/forms/reservation/admin/ReservationForm";
import { fetchReservations } from "../../services/reservations/Fetch";
export default function ReservationsManagement() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadReservations = async () => {
            setLoading(true);
            try {
                const data = await fetchReservations();
                const formattedData = data.map(reservation => ({
                    ...reservation,
                    plan: reservation.idPlan ? (typeof reservation.idPlan === "object" ? reservation.idPlan.nombre || reservation.idPlan.name : reservation.idPlan) : "N/A",
                    cliente: reservation.client ? (typeof reservation.client === "object" ? reservation.client.nombre || reservation.client.name : reservation.client) : "N/A",
                    email: reservation.client ? (typeof reservation.client === "object" ? reservation.client.email || reservation.client.email : reservation.client) : "N/A",
                    documento: reservation.client ? (typeof reservation.client === "object" ? reservation.client.documento || reservation.client.documento : reservation.client) : "N/A",
                    tipoDocumento: reservation.client ? (typeof reservation.client === "object" ? reservation.client.tipoDocumento || reservation.client.tipoDocumento : reservation.client) : "N/A",
                    idAccommodation: reservation.idAccommodation ? reservation.idAccommodation.idAlojamiento : "N/A",
                    startDate: reservation.startDate ? new Date(reservation.startDate).toISOString().split("T")[0] : "N/A",
                    endDate: reservation.endDate ? new Date(reservation.endDate).toISOString().split("T")[0] : "N/A",
                    _originalClientData: reservation.client,
                    _originalAccommodationData: reservation.idAccommodation,
                }))
                setReservations(formattedData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadReservations();
    }, []);
    const reservationColumns = [
        { uid: "_id", name: "ID" },
        { uid: "cliente", name: "Client" },
        { uid: "plan", name: "Plan" },
        { uid: "idAccommodation", name: "Room" },
        { uid: "startDate", name: "Check In" },
        { uid: "endDate", name: "Check Out" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" },
    ];
    const initialVisibleColumns = ["_id", "cliente", "idAccommodation", "startDate", "endDate", "status", "actions"];
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
                        size="5xl"
                    />
                )}


            />
        </div>
    );
}
