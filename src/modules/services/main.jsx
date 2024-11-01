import TableComponent from '../../utilities/table/TableComponent';
export default function ServicesManagement() {
    const serviceColumns = [
        { uid: "service", name: "Service Name" },
        { uid: "description", name: "Description" },
        { uid: "price", name: "Price" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" }
    ];
    // const [services, setServices] = useState([]);
    // const [query, setQuery] = React.useState("");
    // const [currentPage, setCurrentPage] = useState(0);
    // const itemsPerPage = 5;

    // const filteredServices = services.filter(service =>
    //     (service.service || '').toLowerCase().includes(query.toLowerCase()) ||
    //     (service.description || '').toLowerCase().includes(query.toLowerCase())
    // );
    // const displayedServices = filteredServices.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    return (
        <div>
            <TableComponent columns={serviceColumns} />
        </div>
    );
}