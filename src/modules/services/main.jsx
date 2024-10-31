import React, { useEffect, useState } from 'react';
import SearchBar from "../../utilities/search/SearchBar";
import TableComponent from '../../utilities/table/TableComponent';
export default function ServicesManagement() {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        service: '',
        description: '',
        price: '',
        status: true
    });
    const [query, setQuery] = React.useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const filteredServices = services.filter(service =>
        (service.service || '').toLowerCase().includes(query.toLowerCase()) ||
        (service.description || '').toLowerCase().includes(query.toLowerCase())
    );
    const displayedServices = filteredServices.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    return (
        <div>
            <SearchBar
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <TableComponent />
        </div>

    );
}