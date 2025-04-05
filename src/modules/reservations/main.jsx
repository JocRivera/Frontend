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
        { uid: "cliente", name: "Cliente" },
        { uid: "plan", name: "Plan" },
        { uid: "idAccommodation", name: "Alojamiento" },
        { uid: "startDate", name: "Check In" },
        { uid: "endDate", name: "Check Out" },
        { uid: "status", name: "Estado" },
        { uid: "actions", name: "Acciones" },
    ];
    const initialVisibleColumns = ["_id", "plan", "cliente", "idAccommodation", "startDate", "endDate", "status", "actions"];
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    useEffect(() => {
        loadReservations();
    }, []);
    const loadReservations = async () => {
        setLoading(true);
        try {
            const data = await reservationService.fetchReservations();
            const formattedData = data.map(reservation => {
                // Extraer nombre del cliente
                const clientName = reservation.client && typeof reservation.client === "object"
                    ? reservation.client.nombre
                    : reservation.client;

                // Extraer nombre del alojamiento (habitación)
                const roomName = reservation.idAccommodation && typeof reservation.idAccommodation === "object"
                    ? reservation.idAccommodation.idAlojamiento
                    : reservation.idAccommodation;

                // Extraer nombre del plan
                const planName = reservation.idPlan && typeof reservation.idPlan === "object"
                    ? reservation.idPlan.name
                    : reservation.idPlan;

                return {
                    ...reservation,
                    // Campos transformados para mostrar en la tabla
                    cliente: clientName || "N/A",
                    idAccommodation: roomName || "N/A", // Renombrar este campo a "room" sería más claro
                    plan: planName || "N/A",
                    startDate: reservation.startDate ? new Date(reservation.startDate).toISOString().split("T")[0] : "N/A",
                    endDate: reservation.endDate ? new Date(reservation.endDate).toISOString().split("T")[0] : "N/A",
                    // Guardar datos originales para edición
                    _originalClientData: reservation.client,
                    _originalAccommodationData: reservation.idAccommodation,
                    _originalPlanData: reservation.idPlan,
                };
            });
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
