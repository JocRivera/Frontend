import TableComponent from '../../utilities/table/TableComponent';
export default function ServicesManagement() {
    const serviceColumns = [
        { uid: "service", name: "Service Name" },
        { uid: "description", name: "Description" },
        { uid: "price", name: "Price" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" }
    ];
    const initialVisibleColumns = ["service", "status", "actions"];
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    const services = [
        {
            id: 1,
            service: "Cena",
            description: "Alimentacion completa",
            price: 20,
            status: "active",
        },
        {
            id: 2,
            service: "Almuezo",
            description: "Aliemntacion completa",
            price: 20,
            status: "active",
        },
        {
            id: 3,
            service: "Desayuno",
            description: "Aliemntacion completa",
            price: 20,
            status: "active",
        },
        {
            id: 4,
            service: "Spa",
            description: "Masaje completo",
            price: 20,
            status: "active",
        },
        {
            id: 5,
            service: "Refrigerio",
            description: "Helado de chocolate",
            price: 20,
            status: "inactive",
        },
    ]
    return (
        <div>
            <TableComponent columns={serviceColumns} data={services} INITIAL_VISIBLE_COLUMNS={initialVisibleColumns} statusOptions={statusOptions} />
        </div>
    );
}