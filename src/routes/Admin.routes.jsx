import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardManagement from '../../src/modules/admin/main.jsx';
import SettingsManagement from '../modules/settings/main.jsx';
import ServicesManagement from '../modules/services/main.jsx';
import CabinsManagement from '../modules/cabins/main.jsx';
import RoomsManagement from '../modules/rooms/main.jsx';
import ReservationsManagement from '../modules/reservations/main.jsx';
import PlainsManagement from '../modules/plains/main.jsx';
import ClientsManagement from '../modules/clients/main.jsx';
import UsersManagement from '../modules/users/main.jsx';
const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<DashboardManagement />} />
            <Route path="settings" element={<SettingsManagement />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="cabins" element={<CabinsManagement />} />
            <Route path="rooms" element={<RoomsManagement />} />
            <Route path="reservations" element={<ReservationsManagement />} />
            <Route path="plains" element={<PlainsManagement />} />
            <Route path="clients" element={<ClientsManagement />} />
            <Route path="users" element={<UsersManagement />} />
        </Routes>
    );
};

export default AdminRoutes;