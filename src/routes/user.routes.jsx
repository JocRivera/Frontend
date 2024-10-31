import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../modules/home/main.jsx';


const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
};

export default UserRoutes;