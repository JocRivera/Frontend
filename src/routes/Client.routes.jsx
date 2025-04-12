import { Routes, Route } from 'react-router-dom';
import ReservationsManagement from '../modules/reservations/main';
const ClientRoutes = () => {
    return (
        <Routes>
            <Route path="MyBookings" element={<ReservationsManagement />} />
        </Routes>
    );
};

export default ClientRoutes;