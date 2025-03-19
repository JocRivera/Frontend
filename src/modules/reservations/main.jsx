import React, { useState, useEffect } from "react";
import TableComponent from "../../utilities/table/TableComponent";
import BookForm from "../../utilities/forms/reservation/admin/ReservationForm";
import ReservationService from "../../services/reservations/Fetch";

const reservationService = new ReservationService();

export default function ReservationsManagement() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
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
    useEffect(() => {
        loadReservations();
    }, []);
    const loadReservations = async () => {
        setLoading(true);
        try {
            const data = await reservationService.fetchReservations();
            const formattedData = data.map(reservation => ({
                ...reservation,
                plan: reservation.idPlan ? (typeof reservation.idPlan === "object" ? reservation.idPlan.nombre || reservation.idPlan.name : reservation.idPlan) : "N/A",
                cliente: reservation.client ? (typeof reservation.client === "object" ? reservation.client.nombre || reservation.client.name : reservation.client) : "N/A",
                telefono: reservation.client ? (typeof reservation.client === "object" ? reservation.client.telefono || reservation.client.telefono : reservation.client) : "N/A",
                eps: reservation.client ? (typeof reservation.client === "object" ? reservation.client.eps || reservation.client.eps : reservation.client) : "N/A",
                email: reservation.client ? (typeof reservation.client === "object" ? reservation.client.email || reservation.client.email : reservation.client) : "N/A",
                documento: reservation.client ? (typeof reservation.client === "object" ? reservation.client.documento || reservation.client.documento : reservation.client) : "N/A",
                tipoDocumento: reservation.client ? (typeof reservation.client === "object" ? reservation.client.tipoDocumento || reservation.client.tipoDocumento : reservation.client) : "N/A",
                idAccommodation: reservation.idAccommodation ? reservation.idAccommodation.idAlojamiento : "N/A",
                startDate: reservation.startDate ? new Date(reservation.startDate).toISOString().split("T")[0] : "N/A",
                endDate: reservation.endDate ? new Date(reservation.endDate).toISOString().split("T")[0] : "N/A",
                _originalClientData: reservation.client,
                _originalAccommodationData: reservation.idAccommodation,
            }))
            console.log(formattedData);
            setReservations(formattedData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleAddReservation = async (formData) => {
        try {
            const client = {
                nombre: formData.name,
                documento: formData.number,
                tipoDocumento: formData.documentType,
                email: formData.email,
                telefono: formData.phone,
                eps: formData.eps,
                status: "activo"
            };
            const companions = formData.accompanists ?
                JSON.parse(formData.accompanists).map(acc => ({
                    nombre: acc.name,
                    documento: acc.documentNumber,
                    tipoDocumento: acc.documentType,
                    email: acc.email,
                    telefono: acc.phone,
                    eps: acc.eps,
                    status: "activo"
                })) : [];
            const reservationData = {
                client: client,
                idPlan: formData.plan, // Asumiendo que formData.plan contiene el ID del plan
                idAccommodation: formData.accommodation || null, // Asumiendo que formData.accommodation contiene el ID del alojamiento
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                companion: companions,
                status: "pendiente" // Estado por defecto para nuevas reservas
            };
            console.log(reservationData);
            await reservationService.addReservation(reservationData);
            loadReservations();

        } catch (err) {
            console.error(err);
        }
    };
    const handleEditReservation = (updateData) => {
        console.log(updateData)
    }
    const handleDeleteReservation = (id) => {
        console.log(id);
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
