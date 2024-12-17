import TableComponent from "../../../utilities/table/TableComponent";

export default function ReservationsManagement() {
    const reservationColumns = [
        { uid: "id", name: "ID" },
        { uid: "client", name: "Client" },
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
            room: "Room 1",
            checkIn: "2022-01-01",
            checkOut: "2022-01-03",
            status: "active",
        },
        {
            id: 2,
            client: "Jane Doe",
            room: "Room 2",
            checkIn: "2022-01-01",
            checkOut: "2022-01-03",
            status: "active",
        },
        {
            id: 3,
            client: "John Doe",
            room: "Room 3",
            checkIn: "2022-01-01",
            checkOut: "2022-01-03",
            status: "active",
        },
        {
            id: 4,
            client: "Jane Doe",
            room: "Room 4",
            checkIn: "2022-01-01",
            checkOut: "2022-01-03",
            status: "active",
        },
        {
            id: 5,
            client: "John Doe",
            room: "Room 5",
            checkIn: "2022-01-01",
            checkOut: "2022-01-03",
            status: "inactive",
        },
    ];
    return (
        <div>
            <TableComponent columns={reservationColumns} users={reservations} INITIAL_VISIBLE_COLUMNS={initialVisibleColumns} statusOptions={statusOptions} />
        </div>
    );
}
